import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		appName: 'Wiretap Roulette',
	}
});

export default app;