import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Wiretap Roulette',
	}
});

export default app;