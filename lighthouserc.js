export default {
	ci: {
		collect: {
			staticDistDir: './build',
			numberOfRuns: 3,
			url: ['http://localhost/'],
			settings: {
				chromeFlags: '--no-sandbox'
			}
		},
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				'categories:performance': ['warn', { minScore: 0.9 }],
				'categories:accessibility': ['error', { minScore: 0.9 }],
				'categories:best-practices': ['error', { minScore: 0.9 }],
				'categories:seo': ['error', { minScore: 1.0 }],
				'network-dependency-tree-insight': 'off'
			}
		},
		upload: {
			target: 'filesystem',
			outputDir: '.lighthouseci'
		}
	}
};
