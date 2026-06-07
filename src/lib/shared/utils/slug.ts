/**
 * Convert an entity name to a URL-safe slug.
 *
 * Rules:
 * 1. Lowercase
 * 2. Replace `+` with "plus"
 * 3. Replace `[...]` with "literal-..."
 * 4. Strip parentheses (keep content inside them)
 * 5. Replace spaces and underscores with hyphens
 * 5. Strip remaining non-alphanumeric characters (except hyphens and dots)
 * 6. Collapse consecutive hyphens
 * 7. Trim leading/trailing hyphens
 */
export function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/\+/g, '-plus')
		.replace(/\[([^\]]*)\]/g, 'literal-$1')
		.replace(/[()]/g, '')
		.replace(/[\s_]+/g, '-')
		.replace(/[^a-z0-9.-]/g, '')
		.replace(/-{2,}/g, '-')
		.replace(/^-|-$/g, '');
}
