// Click event ingest for the search Elo system (docs/backend/search.md).
// Deliberately dumb: validate, append one row, 204. No Elo computation
// happens here; ratings are derived at build time by compile:elo. Reads
// happen via `wrangler d1 execute`, so this stays a single endpoint.

const MAX_QUERY_LENGTH = 200;
const MAX_ROUTE_LENGTH = 300;
const MAX_SHOWN = 20;

interface ClickPayload {
	query: string;
	clicked: string;
	shown: string[];
}

function corsHeaders(origin: string): Record<string, string> {
	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		Vary: 'Origin'
	};
}

function allowedOrigin(request: Request, env: Env): string | null {
	const origin = request.headers.get('Origin');
	if (origin === env.ALLOWED_ORIGIN) return origin;

	const hostname = new URL(request.url).hostname;
	const isLocalWorker = hostname === 'localhost' || hostname === '127.0.0.1';
	const isLocalSite = origin !== null && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
	return isLocalWorker && isLocalSite ? origin : null;
}

function isRoute(value: unknown, maxLength: number): value is string {
	return typeof value === 'string' && value.startsWith('/') && value.length <= maxLength;
}

function parsePayload(body: unknown): ClickPayload | null {
	if (typeof body !== 'object' || body === null) return null;
	const { query, clicked, shown } = body as Record<string, unknown>;

	if (typeof query !== 'string' || query.length > MAX_QUERY_LENGTH) return null;
	if (!isRoute(clicked, MAX_ROUTE_LENGTH)) return null;
	if (!Array.isArray(shown) || shown.length === 0 || shown.length > MAX_SHOWN) return null;
	if (!shown.every((route) => isRoute(route, MAX_ROUTE_LENGTH))) return null;
	if (!shown.includes(clicked)) return null;

	return { query, clicked, shown: shown as string[] };
}

async function hashIp(ip: string, salt: string): Promise<string> {
	const data = new TextEncoder().encode(`${salt}:${ip}`);
	const digest = await crypto.subtle.digest('SHA-256', data);
	return [...new Uint8Array(digest)]
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('')
		.slice(0, 16);
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const origin = allowedOrigin(request, env);
		if (!origin) {
			return new Response('Forbidden', { status: 403 });
		}
		const headers = corsHeaders(origin);

		if (!env.IP_SALT) {
			return new Response('Service unavailable', { status: 503, headers });
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers });
		}

		const url = new URL(request.url);
		if (request.method !== 'POST' || url.pathname !== '/api/click') {
			return new Response('Not found', { status: 404, headers });
		}

		let payload: ClickPayload | null = null;
		try {
			payload = parsePayload(await request.json());
		} catch {
			// fall through to 400
		}
		if (!payload) {
			return new Response('Invalid payload', { status: 400, headers });
		}

		const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
		const ipHash = await hashIp(ip, env.IP_SALT);

		await env.DB.prepare(
			'INSERT INTO clicks (query, clicked, shown, source, ip_hash, ts) VALUES (?, ?, ?, ?, ?, ?)'
		)
			.bind(
				payload.query,
				payload.clicked,
				JSON.stringify(payload.shown),
				'human',
				ipHash,
				Date.now()
			)
			.run();

		return new Response(null, { status: 204, headers });
	}
};
