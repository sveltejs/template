<script>
import { auth } from "./../stores/auth.js"
import { user } from "./../stores/user.js"
import * as ateliersGQL from "./../graphQL/ateliers.js"
import * as dateFr from "./../utils/dateFr.js"
import Fa from 'svelte-fa'
import { faEuroSign, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import { CaArrive } from './../components/CaArrive.js'

var lesAteliers;
async function getListesAteliers() {
    lesAteliers = await ateliersGQL.listeAteliers($auth, $user.estAdmin)
}
$:     if ($auth && $user) {getListesAteliers()}
$: console.log('les ateliers', lesAteliers)

</script>

<div class="flex flex-row items-stretch flex-wrap justify-around">
{#if lesAteliers !== undefined}
{#each lesAteliers as atelier (atelier.id)}
<div class="relative min-w-340px w-340px border border-lbforange-600 rounded mx-1 my-1 bg-gray-900 text-gray-200">
    <div class="h-14 ml-16 flex flex-row content-center">
        <h5 class="mx-auto my-auto pl-2">{atelier.titre}</h5>
    </div>
    <div class="relative h-180px" style="background-image: url(https://res.cloudinary.com/la-bonne-fabrique/image/upload/ar_16:9,c_fill/w_340,c_scale/{atelier.urlImage})">
        {#if atelier.surInscription }
        <div class="absolute -bottom-2 left-0">
            <une-inscription id_atelier={atelier.id} url_illustration={atelier.urlImage} titre_atelier={atelier.titre} date_atelier={dateFr.dateInscription(atelier.dateDebut, atelier.dateFin)}/>
        </div>
        {/if}
    </div>
    <div class="absolute top-0 left-0 bg-orangeLBF min-h-16 h-16 w-16 rounded-br mb-4">
        <div class="text-gray-900 text-3xl font-bold my-0 p-0 text-center mx-auto">{dateFr.getJour(atelier.dateDebut)}</div>
        <div class="text-gray-900 text-base font-bold my-0 p-0 text-center -mt-2 mx-auto">{dateFr.getMoisShort(atelier.dateDebut)}</div>
    </div>
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
{@html CaArrive}
{/if}
</div>
