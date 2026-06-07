import { parse } from 'svelte/compiler';
import type { LintRule, FileEntry, Violation } from '../types.js';

const BANNED_TAGS = new Set(['button', 'input', 'select', 'textarea', 'dialog', 'table']);
const BANNED_SCAN_RE = /<(button|input|select|textarea|dialog|table)\b/;
const EXCLUDED_PREFIX = 'src/lib/client/ui/';

const DISABLE_RE = /lint-disable\s+no-raw-ui/;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyNode = any;

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

function isExemptInput(el: AnyNode): boolean {
	if (el.name !== 'input') return false;
	for (const attr of el.attributes ?? []) {
		if (attr.type !== 'Attribute' || attr.name !== 'type') continue;
		if (
			Array.isArray(attr.value) &&
			attr.value.length === 1 &&
			attr.value[0].type === 'Text' &&
			attr.value[0].data === 'hidden'
		) {
			return true;
		}
	}
	return false;
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

		if (node.type === 'RegularElement' && BANNED_TAGS.has(node.name)) {
			if (!isExemptInput(node) && !hasDisableComment(nodes, i)) {
				const { line, column } = offsetToLineCol(offsets, node.start);
				violations.push({
					rule: 'no-raw-ui',
					file,
					message: `Raw <${node.name}> element. Use a component from $lib/client/ui/ instead.`,
					line,
					column
				});
			}
		}

		// Recurse into children
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
	name: 'no-raw-ui',
	description: 'No raw HTML UI elements in routes or client code. Use components from $lib/client/ui/.',
	category: 'ui',
	severity: 'error',
	files: 'src/**/*.svelte',
	check(files: FileEntry[]): Violation[] {
		const violations: Violation[] = [];

		for (const file of files) {
			// Skip the UI component library itself
			if (file.path.startsWith(EXCLUDED_PREFIX)) continue;

			// Fast pre-filter
			if (!BANNED_SCAN_RE.test(file.content)) continue;

			try {
				const ast = parse(file.content, { modern: true });
				if (ast?.fragment?.nodes) {
					const offsets = buildLineOffsets(file.content);
					walk(ast.fragment.nodes, offsets, file.path, violations);
				}
			} catch {
				violations.push({
					rule: 'no-raw-ui',
					file: file.path,
					message: 'Failed to parse Svelte file.',
					line: 1
				});
			}
		}

		return violations;
	}
};

export default rule;
