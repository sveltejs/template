<script>
	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<br>
	<p>And check out <a href="https://render.com">Render</a>'s Svelte <a href="https://render.com/docs/deploy-svelte">quickstart guide</a> to see how this site was deployed.</p>
	<p class="large">🧑‍💻</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.large {
		font-size: 3em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>