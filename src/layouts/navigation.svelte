<script>
    import { Link } from "svelte-routing";
    import About from "./../routes/about.svelte";
    import ListeAteliers from "./../routes/listeAteliers.svelte"

</script>

<h4 class="text-orangeLBF text-center mb-2">L'atelier</h4>
<h5 class="ml-2">Les ateliers</h5>
<ul class="ml-2">
    <li class="pl-2 cursor-pointer hover:bg-orangeLBFT"><Link to="NouvelAtelier">Programmer un nouvel atelier</Link></li>
    <li class="pl-2 cursor-pointer hover:bg-orangeLBFT"><Link to="ListeAteliers">Les prochains ateliers</Link></li>
    <li class="pl-2 cursor-pointer hover:bg-orangeLBFT">Archives</li>
</ul>
<hr class="ml-2 my-3 w-5/6 border-orangeLBFT"/>
<h5 class="ml-2 w-5/6 ">Les machines</h5>
<ul class="ml-2 mb-2 navi">
    <li class="hover:bg-orangeLBFT"><Link to="About">Liste des machines</Link></li>
    <li class="hover:bg-orangeLBFT">Nouvelle fiche machine</li>
    <li class="hover:bg-orangeLBFT">Abonnements</li>
    <li class="hover:bg-orangeLBFT">Horaires de réservation</li>
    <li class="hover:bg-orangeLBFT">Réservations en cours</li>
</ul>


