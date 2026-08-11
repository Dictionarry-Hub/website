export async function copyArtifact(url: string): Promise<boolean> {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`${response.status} fetching ${url}`);
		await navigator.clipboard.writeText(await response.text());
		return true;
	} catch {
		return false;
	}
}

export function downloadArtifact(url: string, filename: string): void {
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.remove();
}
