<script lang="ts">
	export let name: string;
	import Header from './components/nav/Header.svelte';
	import Main from './components/Main.svelte';
	import Footer from './components/Footer.svelte';
</script>

<Header />
<Main name={name} />
<Footer />

<style>

</style>