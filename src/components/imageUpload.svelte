<script>
import {onMount, tick } from 'svelte'
import { auth } from "./../stores/auth.js"
import { user } from "./../stores/user.js"
import { urlImage } from './../utils/urlImages.js'
import Dialog from './../smelte/src/components/Dialog';
import Bouton from './Button/Button.svelte';
import Fa from 'svelte-fa'
import { faCircle, faDotCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

import {listeIllustrationsByEspace, ajoutIllustration, effaceIllustration, effaceCloudinary} from "./../graphQL/illustrations.js"
import FilePond from "./../components/Filepond.svelte"

var showDialog = false;
var flagConfirmationEffacer = false;
var flagSuppressionImage = false;
var suppressionId = "";
var suppressionImageId="";

export let nomImage = "logoLBFSeul_a1t4af.png"
export let options = [
        {
          ar: '16:9',
          cropType: 'fill'
        },
        {
          width: 'auto',
          qualite: 'auto',
          cropType: 'scale'
        }
      ]
export let altImage = "Une illustration";
export let espace = "Latelier";
export let typeIllustration = "Atelier"
const optionsULRThumbs =  [
        { height: '80', width: '80', qualite: '60', cropType: 'fill' }
      ]

var choixImage = "logoLBFSeul_a1t4af.png"
var listeIllustrations = []

async function getListeIllustrations() {
		var variables = {
            espace: espace,
            typeIllustration: typeIllustration
        }
        listeIllustrations = await listeIllustrationsByEspace($auth, $user.estAdmin, variables)
        console.log('illu', listeIllustrations)
    };

$: if ($auth && $user) {
    getListeIllustrations()
    }

async function onUploadDone(event) {
    console.log('filemena', event.detail.fileProps)
    var variables = {
            espace: espace,
            typeIllustration: typeIllustration, 
            ...event.detail.fileProps
        }
    await ajoutIllustration($auth, $user.estAdmin, variables)
    await getListeIllustrations()
}

async function effaceImage() {
    flagSuppressionImage = true
    console.log('suppressionImageId', suppressionImageId)
    var variables={
        imageId: suppressionImageId
    }
    effaceCloudinary($auth, $user.estAdmin, variables).then(()=> {
        variables = {
            id: suppressionId
        }
        effaceIllustration($auth, $user.estAdmin, variables).then(()=> {
            getListeIllustrations()
            flagSuppressionImage = false
            flagConfirmationEffacer = false
        })
    })
}

</script>

<img src={urlImage(nomImage, options)} alt={altImage}} on:click={() => showDialog = true}/>

<Dialog bind:value={showDialog} opacity="0.5" class="items-center z-50 rounded bg-gray-900 dark:bg-dark-400 p-4 elevation-4 max-w-5/6">
    <h4 slot="title">Choix Illustration</h4>
    <div class="flex flex-column flex-wrap justify-around mb-2">
        <div  on:click={() => {nomImage = "logoLBFSeul_a1t4af.png"}} class="p-1">
            <img src={urlImage('logoLBFSeul_a1t4af.png',optionsULRThumbs)} alt="logoLBFSeul_a1t4af" class="rounded cursor-pointer">
            <div class="flex flex-column">
                <div class="relative my-1 text-vertLBF cursor-pointer">
                    {#if nomImage === "logoLBFSeul_a1t4af.png"}
                    <Fa icon={faDotCircle} />
                    {:else}
                    <Fa icon={faCircle} />
                    {/if}
                </div>
            </div>
        </div>
        {#each listeIllustrations as illu (illu.id)}
            <div class="p-1">
                    <img on:click={() => {nomImage = illu.idImage + '.' + illu.format}} src={urlImage(illu.idImage + '.' + illu.format,optionsULRThumbs)} alt={illu.idImage + '.' + illu.format} class="rounded cursor-pointer">
                    <div class="flex flex-column">
                        <div on:click={() => {nomImage = illu.idImage + '.' + illu.format}} class="relative my-1 text-vertLBF cursor-pointer">
                            {#if nomImage === illu.idImage + '.' + illu.format}
                            <Fa icon={faDotCircle} />
                            {:else}
                            <Fa icon={faCircle} />
                            {/if}
                        </div>
                        <div class="text-orangeLBF ml-1 my-1 cursor-pointer" on:click={() => {suppressionId = illu.id; suppressionImageId = illu.idImage; flagConfirmationEffacer = true}}>
                            <Fa icon={faTrashAlt} />
                        </div>
                    </div>
            </div>
        {/each}
  </div>
  <FilePond on:uploadDone={onUploadDone} />
  <div slot="actions">
    <Bouton on:actionBouton={() => showDialog = false}>Terminer</Bouton>
  </div>
</Dialog>
<!-- confirmation effacer-->
<Dialog bind:value={flagConfirmationEffacer} opacity="0.5" class="items-center z-50 rounded bg-gray-900 dark:bg-dark-400 p-4 elevation-4 max-w-5/6">
<h4 slot="title">Confirmation</h4>
<p>Confirmer la suppression de l'image</p>
  <div slot="actions" class="flex flex-column">
    <Bouton on:actionBouton={() => flagConfirmationEffacer = false}>Annuler</Bouton>
    <Bouton occupe={flagSuppressionImage} on:actionBouton={effaceImage} couleur="text-orangeLBF border-orangeLBF">Confirmer</Bouton>
  </div>
</Dialog>