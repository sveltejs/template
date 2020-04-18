<script>
import { auth } from "./../stores/auth.js"
import { user } from "./../stores/user.js"
import { listeArchivesAteliers, effacerAtelier } from "./../graphQL/ateliers.js"
import * as dateFr from "./../utils/dateFr.js"
import Fa from 'svelte-fa'
import { faEuroSign, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faClock, faEdit, faTrashAlt, faCopy, faUser } from '@fortawesome/free-regular-svg-icons'
import FormAtelier from './../components/FormAtelier.svelte'
import Chargement from './../components/chargement.svelte'
import Dialog from './../components/Dialog.svelte';
import Bouton from './../components/Button/Button.svelte';

var lesAteliers;
let dataAtelier;
var dataAtelierEfface = {id: ""};
var flagConfirmationEffacerAtelier = false;
var busyEffacerAtelier = false;
let flagDialogAtelier = false;

async function getListesAteliers() {
    lesAteliers = await listeArchivesAteliers($auth, $user.estAdmin)
}
$:     if ($auth && $user) {getListesAteliers()}

function supprimerAtelier() {
    busyEffacerAtelier = true
    const variables = {
        id: dataAtelierEfface.id
    }
    effacerAtelier($auth, $user.estAdmin, variables).then(async ()=>{
        await getListesAteliers()
        flagConfirmationEffacerAtelier = false
        busyEffacerAtelier = false
    })
}

function editAtelier(idAtelier) {
    dataAtelier = lesAteliers.filter((atelier) => atelier.id === idAtelier)[0]
    flagDialogAtelier = true
}
</script>

<main class="flex flex-row items-stretch flex-wrap justify-around">
{#if lesAteliers !== undefined}
{#each lesAteliers as atelier (atelier.id)}
<div class="relative min-w-340px w-340px border border-lbforange-600 rounded mx-1 my-1 bg-gray-900 text-gray-200">
    <div class="h-14 ml-16 flex flex-row content-center">
        <h5 class="mx-auto my-auto pl-2">{atelier.titre}</h5>
    </div>
    <div class="relative h-180px" style="background-image: url(https://res.cloudinary.com/la-bonne-fabrique/image/upload/ar_16:9,c_fill/w_340,c_scale/{atelier.urlImage})">
    </div>
    <div class="absolute top-0 left-0 bg-orangeLBF min-h-16 h-16 w-16 rounded-br mb-4">
        <div class="text-gray-900 text-3xl font-bold my-0 p-0 text-center mx-auto">{dateFr.getJour(atelier.dateDebut)}</div>
        <div class="text-gray-900 text-base font-bold my-0 p-0 text-center -mt-2 mx-auto">{dateFr.getMoisShort(atelier.dateDebut)}</div>
    </div>
        {#if $user.estAdmin}
        <div class="absolute top-16 left-0 w-10 py-1 bg-orangeLBF text-gray-900 rounded-br flex flex-col">
            <div class="mx-auto my-1 cursor-pointer" on:click={() => {editAtelier(atelier.id)}}><Fa icon={faEdit} size="lg"/></div>
            {#if atelier.inscritsAteliers.length===0}
                <div class="mx-auto my-1 cursor-pointer" on:click={() => {dataAtelierEfface.id = atelier.id; flagConfirmationEffacerAtelier = true}}><Fa icon={faTrashAlt} size="lg"/></div>
            {/if}
        </div>
        {/if}
    <div class="mb-20">
        <div class="text-base text-justify mx-2 mt-2 mb-1 pb-2">
            {@html atelier.description}
        </div>
        <div class="absolute flex flex-row justify-around inset-x-0 mx-2 pt-1 bottom-0 border-t border-lbforange-600 h-20 text-gray-200" >
            <div class="mx-1">
                <div class="my-1">
                    <Fa icon={faUsers} size="lg" class="mx-auto"/>
                </div>
                <div class="mx-auto text-sm">{atelier.nbParticipants} places</div>
            </div>
            <div class="mx-1">
                <div class="my-1">
                    <Fa icon={faClock} size="lg" class="mx-auto"/>
                </div>
                <div class="mx-auto text-sm">{dateFr.getHoraire(atelier.dateDebut)} - {dateFr.getHoraire(atelier.dateFin)}</div>
            </div>
            <div class="mx-1">
                <div class="my-1 mx-auto">
                    <Fa icon={faEuroSign} size="lg" class="mx-auto"/>
                </div>
                <div class="mx-auto text-sm text-center">
                {#each atelier.tarifs as tarif, i}
                    {#if i === atelier.tarifs.length-1 } {tarif[1]} € - {tarif[0]} {:else } {tarif[1]} € - {tarif[0]} <br /> {/if}
                {/each}
                </div>
            </div>
        </div>
    </div>
</div>
<!-- fin carte -->
{/each}
{:else}
<Chargement>Récupération des données, merci de patienter...</Chargement>
{/if}
</main>

<!-- confirme efface atelier -->
<Dialog bind:visible={flagConfirmationEffacerAtelier} >
    <h4 slot="title">Confirmation</h4>
    <p>Confirmer la suppression de l'atelier</p>
    <div slot="actions" class="flex flex-row justify-end items-center">
        <Bouton on:actionBouton={() => flagConfirmationEffacerAtelier = false}>Annuler</Bouton>
        <Bouton occupe={busyEffacerAtelier} on:actionBouton = {supprimerAtelier} couleur="text-orangeLBF border-orangeLBF">Confirmer</Bouton>
    </div>
</Dialog>

<!-- dialog info Atelier -->
<Dialog bind:visible={flagDialogAtelier} on:close={()=>{flagDialogAtelier=false}}>
    <FormAtelier dataAtelier={dataAtelier} flagEdition={true} archive={true} on:close={()=>{flagDialogAtelier=false}}/>
</Dialog>
