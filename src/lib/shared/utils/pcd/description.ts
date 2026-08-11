type MessagePool = readonly [string, ...string[]];

export function pickDescriptionFallback(name: string, messages: MessagePool): string {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = (hash * 31 + name.charCodeAt(i)) | 0;
	}
	return messages[Math.abs(hash) % messages.length];
}
