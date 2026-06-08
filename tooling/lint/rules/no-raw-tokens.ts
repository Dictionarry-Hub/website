import { parse } from 'svelte/compiler';
import type { LintRule, FileEntry, Violation } from '../types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyNode = any;

const TAILWIND_PALETTE =
	'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';

const COLOR_PREFIXES =
	'bg|text|border|outline|ring|divide|from|via|to|fill|stroke|decoration|caret|placeholder|shadow';

const RAW_PALETTE_RE = new RegExp(
	`^(${COLOR_PREFIXES})-(${TAILWIND_PALETTE})-\\d{2,3}(?:\\/\\d+)?$`
);
const RAW_BW_RE = new RegExp(`^(${COLOR_PREFIXES})-(white|black)$`);
const RAW_ARBITRARY_COLOR_RE = new RegExp(
	`^(${COLOR_PREFIXES})-\\[(?:#[0-9a-fA-F]|rgba?\\(|hsla?\\()`
);

const SEMANTIC_RADII = new Set(['control-sm', 'control', 'card', 'xl', 'pill']);
const RAW_RADIUS_VALUES = new Set(['sm', 'md', 'lg', '2xl', '3xl', 'full', 'none']);
const RADIUS_SIDES = ['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br', 's', 'e', 'ss', 'se', 'es', 'ee'];

const SEMANTIC_SHADOWS = new Set(['card', 'control', 'control-active', 'none']);
const RAW_SHADOW_VALUES = new Set(['sm', 'md', 'lg', 'xl', '2xl', 'inner']);

const DISABLE_RE = /lint-disable\s+no-raw-tokens/;

interface LineCol {
	line: number;
	column: number;
}

function buildLineOffsets(source: string): number[] {
	const offsets = [0];
	for (let i = 0; i < source.length; i++) {
		if (source[i] === '\n') offsets.push(i + 1);
	}
	return offsets;
}

function offsetToLineCol(offsets: number[], offset: number): LineCol {
	let lo = 0;
	let hi = offsets.length - 1;
	while (lo < hi) {
		const mid = (lo + hi + 1) >> 1;
		if (offsets[mid] <= offset) lo = mid;
		else hi = mid - 1;
	}
	return { line: lo + 1, column: offset - offsets[lo] + 1 };
}

function stripModifiers(cls: string): string {
	const lastColon = cls.lastIndexOf(':');
	let base = lastColon >= 0 ? cls.slice(lastColon + 1) : cls;
	if (base.startsWith('!')) base = base.slice(1);
	return base;
}

function isRawColor(base: string): boolean {
	return RAW_PALETTE_RE.test(base) || RAW_BW_RE.test(base) || RAW_ARBITRARY_COLOR_RE.test(base);
}

function isRawRadius(base: string): boolean {
	if (!base.startsWith('rounded')) return false;
	if (base === 'rounded') return true;

	const rest = base.slice('rounded-'.length);
	if (!rest) return false;

	if (SEMANTIC_RADII.has(rest)) return false;
	if (RAW_RADIUS_VALUES.has(rest)) return true;
	if (rest.startsWith('[')) return true;

	for (const side of RADIUS_SIDES) {
		if (rest === side) return true;
		if (rest.startsWith(side + '-')) {
			const value = rest.slice(side.length + 1);
			if (SEMANTIC_RADII.has(value)) return false;
			if (RAW_RADIUS_VALUES.has(value)) return true;
			if (value.startsWith('[')) return true;
		}
	}

	return false;
}

function isRawShadow(base: string): boolean {
	if (!base.startsWith('shadow')) return false;
	if (base === 'shadow') return true;

	const rest = base.slice('shadow-'.length);
	if (!rest) return false;

	if (SEMANTIC_SHADOWS.has(rest)) return false;
	if (RAW_SHADOW_VALUES.has(rest)) return true;
	if (rest.startsWith('[')) return true;

	return false;
}

function checkToken(token: string): string | null {
	const base = stripModifiers(token);
	if (!base) return null;

	if (isRawColor(base)) return `Raw color \`${base}\`. Use a semantic color token.`;
	if (isRawRadius(base))
		return `Raw radius \`${base}\`. Use a semantic radius (rounded-control, rounded-card, etc.).`;
	if (isRawShadow(base))
		return `Raw shadow \`${base}\`. Use a semantic shadow (shadow-card, shadow-control, etc.).`;

	return null;
}

function checkClassText(
	text: string,
	textStart: number,
	offsets: number[],
	file: string,
	violations: Violation[]
): void {
	let pos = 0;
	for (const token of text.split(/(\s+)/)) {
		if (token && !/^\s+$/.test(token)) {
			const message = checkToken(token);
			if (message) {
				const { line, column } = offsetToLineCol(offsets, textStart + pos);
				violations.push({ rule: 'no-raw-tokens', file, message, line, column });
			}
		}
		pos += token.length;
	}
}

function collectStringLiterals(
	node: AnyNode,
	results: { value: string; start: number }[]
): void {
	if (!node) return;

	if (node.type === 'Literal' && typeof node.value === 'string') {
		results.push({ value: node.value, start: node.start + 1 });
	}
	if (node.type === 'TemplateLiteral') {
		for (const quasi of node.quasis ?? []) {
			if (quasi.value?.raw) {
				results.push({ value: quasi.value.raw, start: quasi.start + 1 });
			}
		}
	}
	if (node.type === 'ConditionalExpression') {
		collectStringLiterals(node.consequent, results);
		collectStringLiterals(node.alternate, results);
	}
	if (node.type === 'LogicalExpression') {
		collectStringLiterals(node.left, results);
		collectStringLiterals(node.right, results);
	}
}

function hasDisableComment(siblings: AnyNode[], index: number): boolean {
	for (let i = index - 1; i >= 0; i--) {
		const prev = siblings[i];
		if (!prev) continue;
		if (prev.type === 'Comment') return DISABLE_RE.test(prev.data);
		if (prev.type === 'Text' && /^\s*$/.test(prev.data)) continue;
		return false;
	}
	return false;
}

function walk(
	nodes: AnyNode[],
	offsets: number[],
	file: string,
	violations: Violation[]
): void {
	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		if (!node || typeof node.type !== 'string') continue;

		if (node.attributes && !hasDisableComment(nodes, i)) {
			for (const attr of node.attributes) {
				if (attr.type !== 'Attribute' || attr.name !== 'class') continue;

				const values = Array.isArray(attr.value) ? attr.value : attr.value ? [attr.value] : [];
				for (const val of values) {
					if (val.type === 'Text') {
						checkClassText(val.data, val.start, offsets, file, violations);
					} else if (val.type === 'ExpressionTag') {
						const literals: { value: string; start: number }[] = [];
						collectStringLiterals(val.expression, literals);
						for (const lit of literals) {
							checkClassText(lit.value, lit.start, offsets, file, violations);
						}
					}
				}
			}
		}

		if (node.fragment?.nodes) walk(node.fragment.nodes, offsets, file, violations);
		if (node.consequent?.nodes) walk(node.consequent.nodes, offsets, file, violations);
		if (node.alternate?.nodes) walk(node.alternate.nodes, offsets, file, violations);
		if (node.body?.nodes) walk(node.body.nodes, offsets, file, violations);
		if (node.fallback?.nodes) walk(node.fallback.nodes, offsets, file, violations);
		if (node.pending?.nodes) walk(node.pending.nodes, offsets, file, violations);
		if (node.then?.nodes) walk(node.then.nodes, offsets, file, violations);
		if (node.catch?.nodes) walk(node.catch.nodes, offsets, file, violations);
	}
}

const rule: LintRule = {
	name: 'no-raw-tokens',
	description: 'No raw Tailwind colors, radii, or shadows. Use semantic design tokens.',
	category: 'ui',
	severity: 'error',
	files: 'src/**/*.svelte',
	check(files: FileEntry[]): Violation[] {
		const violations: Violation[] = [];

		for (const file of files) {
			try {
				const ast = parse(file.content, { modern: true });
				if (ast?.fragment?.nodes) {
					const offsets = buildLineOffsets(file.content);
					walk(ast.fragment.nodes, offsets, file.path, violations);
				}
			} catch {
				// Skip unparseable files
			}
		}

		return violations;
	}
};

export default rule;
