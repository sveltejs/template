<script>
    //import { Link } from "svelte-routing";
    export let cmp;

    const setComponent = module => {
        cmp = module.default
	}
	const logError = err => {
		console.error(err && err.stack || err)
    }

    const loadAccueil = e => {
		e.preventDefault()
		import('./../routes/index.svelte').then(setComponent).catch(logError)
    }
    const loadListeAteliers = e => {
		e.preventDefault()
		import('./../routes/listeAteliers.svelte').then(setComponent).catch(logError)
    }
    const loadNouvelAtelier = e => {
		e.preventDefault()
		import('./../routes/nouvelAtelier.svelte').then(setComponent).catch(logError)
	}

</script>

<h4 class="text-orangeLBF text-center mb-2">L'atelier</h4>
<div on:click={loadAccueil} class="my-2 pl-2 cursor-pointer hover:bg-vertLBFT hover:text-gray-200 text-vertLBF">Retour à l'accueil</div>
<h5 class="ml-2">Les ateliers</h5>
<ul class="ml-2">
    <li class="pl-2 cursor-pointer hover:bg-orangeLBFT" on:click={loadNouvelAtelier}>Programmer un nouvel atelier</li>
    <li class="pl-2 cursor-pointer hover:bg-orangeLBFT" on:click={loadListeAteliers}>Les prochains ateliers</li>
    <li class="pl-2 cursor-pointer hover:bg-orangeLBFT">Archives</li>
</ul>
<hr class="ml-2 my-3 w-5/6 border-orangeLBFT"/>
<h5 class="ml-2 w-5/6 ">Les machines</h5>
<ul class="ml-2 mb-2 navi">
    <li class="hover:bg-orangeLBFT">Liste des machines</li>
    <li class="hover:bg-orangeLBFT">Nouvelle fiche machine</li>
    <li class="hover:bg-orangeLBFT">Abonnements</li>
    <li class="hover:bg-orangeLBFT">Horaires de réservation</li>
    <li class="hover:bg-orangeLBFT">Réservations en cours</li>
</ul>


