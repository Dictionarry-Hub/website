// Click event recording for the Elo store (docs/backend/search.md). The
// endpoint is null until the Worker ships (section 3 of the search design);
// until then this is a typed no-op so the palette exercises the event shape
// from day one. sendBeacon survives the navigation that immediately follows
// every click.

const CLICK_ENDPOINT: string | null = null;

export interface ClickEvent {
	/** Raw query text; empty string for clicks from the popular view. */
	query: string;
	/** Route of the clicked result. */
	clicked: string;
	/** Routes shown at click time, in rank order. */
	shown: string[];
}

export function recordClick(event: ClickEvent): void {
	if (!CLICK_ENDPOINT) return;

	const body = JSON.stringify(event);
	if (navigator.sendBeacon) {
		navigator.sendBeacon(CLICK_ENDPOINT, new Blob([body], { type: 'application/json' }));
	} else {
		void fetch(CLICK_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body,
			keepalive: true
		}).catch(() => {
			// fire-and-forget: a lost click event is not a user-facing error
		});
	}
}
