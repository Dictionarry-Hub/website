export function clickOutside(node: HTMLElement, callback: () => void) {
	let handler = callback;

	function handleClick(event: MouseEvent) {
		if (!node.contains(event.target as Node)) {
			handler();
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		update(newCallback: () => void) {
			handler = newCallback;
		},
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
