import App from './App.svelte';
import '../public/global.scss'

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;