/**
 * Fetch a markdown artifact and write it to the clipboard.
 * Returns false if the fetch or the clipboard write fails.
 */
export async function copyMarkdownArtifact(url: string): Promise<boolean> {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`${response.status} fetching ${url}`);
		await navigator.clipboard.writeText(await response.text());
		return true;
	} catch {
		return false;
	}
}
