<script lang="ts">
	import { onMount } from 'svelte';
	import { Pin } from '@lucide/svelte';

	interface Props {
		title?: string;
	}

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let { title }: Props = $props();

	let headings: Heading[] = $state([]);
	let activeId: string = $state('');
	let minLevel = $state(2);

	function sanitize(text: string): string {
		return text
			.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
			.trim();
	}

	onMount(() => {
		const container = document.querySelector('article');
		if (!container) return;

		const elements = container.querySelectorAll('h1, h2, h3');
		const parsed = Array.from(elements)
			.filter((el) => el.id)
			.map((el) => ({
				id: el.id,
				text: el.textContent?.trim() ?? '',
				level: parseInt(el.tagName[1])
			}));

		if (parsed.length === 0) return;

		minLevel = Math.min(...parsed.map((h) => h.level));
		headings = parsed;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			},
			{ rootMargin: '0px 0px -80% 0px', threshold: 0 }
		);

		for (const el of elements) {
			observer.observe(el);
		}

		return () => observer.disconnect();
	});
</script>

{#if headings.length > 0}
	<div class="toc">
		<!-- Header -->
		<div class="toc-header">
			<Pin size={16} class="shrink-0" />
			<span>On This Page</span>
		</div>

		<!-- Items with vertical connector -->
		<div class="toc-tree">
			<div class="toc-line-track">
				<div class="toc-line"></div>
			</div>

			<div class="toc-items">
				{#if title}
					<a href="#top" class="toc-link">{sanitize(title)}</a>
				{/if}
				{#each headings as heading}
					<a
						href="#{heading.id}"
						class="toc-link"
						class:active={activeId === heading.id}
						class:nested={heading.level > minLevel}>
						{sanitize(heading.text)}
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.toc {
		width: 14rem;
	}

	.toc-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.75rem;
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--theme-text-soft);
		border-radius: var(--theme-radius-control);
		border: 1px solid transparent;
		margin-bottom: 0.5rem;
	}

	.toc-tree {
		display: grid;
		grid-template-columns: auto 1fr;
	}

	.toc-line-track {
		display: flex;
		justify-content: center;
		padding: 0 1.25rem;
	}

	.toc-line {
		width: 2px;
		border-radius: 9999px;
		background: var(--theme-border-muted);
	}

	.toc-items {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		margin-left: -0.75rem;
	}

	.toc-link {
		display: flex;
		align-items: center;
		padding: 0.25rem 0.5rem 0.25rem 0.75rem;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--theme-text-muted);
		text-decoration: none;
		transition: color 0.15s;
	}

	.toc-link:hover {
		color: var(--theme-text);
	}

	.toc-link.active {
		color: var(--theme-accent-text);
		font-weight: 700;
	}

	.toc-link.nested {
		font-weight: 400;
		font-size: 0.75rem;
		padding-left: 1.25rem;
	}
</style>
