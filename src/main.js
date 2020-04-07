import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Bobby'
	}
});

export default app;