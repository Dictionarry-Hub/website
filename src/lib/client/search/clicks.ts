// Click event recording for the Elo store (docs/backend/search.md). In dev
// the endpoint is the local worker (`pnpm worker:dev`); in production it is
// null until the Worker is deployed, making this a typed no-op. sendBeacon
// survives the navigation that immediately follows every click.

const CLICK_ENDPOINT: string | null = import.meta.env.DEV
	? 'http://localhost:8787/api/click'
	: null;

export interface ClickEvent {
	/** Raw query text; empty string for clicks from the popular view. */
	query: string;
	/** Route of the clicked result. */
	clicked: string;
	/**
	 * The prominent prefix of results at click time, in rank order: a fixed
	 * length across devices so Elo battles are consistent. A deeper click
	 * appends the clicked route.
	 */
	shown: string[];
}

export function recordClick(event: ClickEvent): void {
	if (!CLICK_ENDPOINT) return;

	// Sent as a plain string (text/plain): a CORS "simple request" that
	// needs no preflight, which sendBeacon cannot perform. A JSON-typed
	// Blob here gets silently dropped by browsers. The Worker parses the
	// body as JSON regardless of content type.
	const body = JSON.stringify(event);
	if (navigator.sendBeacon) {
		navigator.sendBeacon(CLICK_ENDPOINT, body);
	} else {
		void fetch(CLICK_ENDPOINT, {
			method: 'POST',
			body,
			keepalive: true
		}).catch(() => {
			// fire-and-forget: a lost click event is not a user-facing error
		});
	}
}
