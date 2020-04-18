<script>
import { onMount, createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
import { auth } from "./../stores/auth.js"
import { user } from "./../stores/user.js"
import Editeur from './editeur.svelte';
import Bouton from './Button/Button.svelte';
import Dialog from './Dialog.svelte'
import Fa from 'svelte-fa'
import { faTrashAlt, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faSave, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { listeInscrits, saveNouvelInscrit, effaceInscrit } from './../graphQL/ateliers.js'
import { envoieEmail } from './../graphQL/emails.js'

export let idAtelier = "";
export let dateAtelier = "";
export let archive = "false";

let lesInscrits = []
let classesPaires = "border border-gray-600 bg-lbfvertt-900 px-2 py-0"
let classesImpaires = "border border-gray-600 px-2 py-0"
let nouvelInscrit = {
    prenom: "",
    nom: "",
    email: ""
}
let message= {
    sujet: "",
    corps: ""
}
let idInscritAEffacer = ""
let flagEnvoiMail = false;
let flagEnvoieMailOK = false;
let flagSauveNouvelInscrit = false;
let flagEffaceInscrit = [];
let flagConfirmationEffacerInscrit = false;

function getlisteInscrits() {
    if (idAtelier!=="" && $auth && $user) {
        const variables = {idAtelier: idAtelier}
        listeInscrits($auth,$user.estAdmin, variables).then((retour) => {
            lesInscrits = retour
            lesInscrits.forEach((inscrit)=> {
                flagEffaceInscrit[inscrit.id] = false
            })
        })
    }
}

function sauveNouvelInscrit() {
    flagSauveNouvelInscrit = true
    const variables = {
        atelier: idAtelier,
        ...nouvelInscrit
    }
    if ($auth && $user) {
        saveNouvelInscrit($auth, $user.estAdmin, variables).then((retour) => {
            flagSauveNouvelInscrit = false;
            nouvelInscrit = {
                prenom: "",
                nom: "",
                email: ""
            }
            getlisteInscrits()
        })
    }
}

function prepEffacerInscrit(idInscrit) {
    idInscritAEffacer = idInscrit
    flagConfirmationEffacerInscrit = true
}

function effacerInscrit() {
    flagConfirmationEffacerInscrit = false
    flagEffaceInscrit[idInscritAEffacer] = true;
    const variables = {
        id: idInscritAEffacer
    }
    if ($auth && $user) {
        effaceInscrit($auth, $user.estAdmin, variables).then((retour)=> {
            getlisteInscrits()
            flagEffaceInscrit[idInscritAEffacer] = false
        })
    }
}

function envoyerEmail() {
    if (message.sujet!=="" && message.corps!=="" && message.corps!=="<p><br></p>") {
        flagEnvoiMail = true
        var infoMail = {
            sujet: message.sujet,
            message: message.corps,
            titreAtelier: lesInscrits[0].atelierInscrit.titre,
            date: dateAtelier,
            urlDesinscription: "https://atelier.labonnefabrique.fr/",
            altMachine: "Illustration Atelier",
            urlImage: "https://res.cloudinary.com/la-bonne-fabrique/image/upload/ar_1.5,w_auto,c_fill/" + lesInscrits[0].atelierInscrit.urlImage
        };
        var tableEmails = lesInscrits.map( inscrit => inscrit.email)
        const variables = {
            email: tableEmails,
            templateId: "d-a3a4bd4f471742f7a092f2872b9917b1",
            template: JSON.stringify(infoMail)
        }
        if ($auth && $user) {
            envoieEmail($auth, $user.estAdmin, variables).then((retour)=>{
                flagEnvoiMail = false;
                flagEnvoieMailOK = true;
            }).catch((error) => {console.log('error', error)})
        }
    }
    
    
}

onMount(()=> {
    getlisteInscrits()
})

</script>

<main>
<h4>Liste des inscripts</h4>
<table class="table-auto text-sm border-collapse border-gray-300 mb-2 mx-auto">
  <thead>
    <tr>
      <th class="border border-gray-600 px-2 py-1 text-vertLBF">Prénom</th>
      <th class="border border-gray-600 px-2 py-1 text-vertLBF">Nom</th>
      <th class="border border-gray-600 px-2 py-1 text-vertLBF">email</th>
      <th class="border border-gray-600 px-2 py-1 text-vertLBF">~</th>
    </tr>
  </thead>
  <tbody>
    {#each lesInscrits as inscrit, index (inscrit.id)}
        <tr>
            <td class={index%2===0?classesPaires:classesImpaires}>{inscrit.prenom}</td>
            <td class={index%2===0?classesPaires:classesImpaires}>{inscrit.nom}</td>
            <td class={index%2===0?classesPaires:classesImpaires}>{inscrit.email}</td>
            <td class={index%2===0?classesPaires:classesImpaires}>
            {#if !archive}
                <Bouton noBorder={true} largeur="w-8" couleur="text-orangeLBF border-orangeLBF" on:actionBouton={()=>{prepEffacerInscrit(inscrit.id)}} occupe={flagEffaceInscrit[inscrit.id]}>
                    <Fa icon={faTrashAlt} size="lg" class="mx-auto" />
                </Bouton>
            {/if}
            </td>
        </tr>
    {/each}
    {#if !archive}
    <tr>
        <td class="border border-gray-600 px-2 py-1">
            <input 
                bind:value={nouvelInscrit.prenom}
                class="w-32 p-1 text-sm bg-gray-800 text-gray-200 rounded focus:outline-none appearance-none leading-normal"
                type="text"
                id="prenomInscrit"
                />
        </td>
        <td class="border border-gray-600 px-2 py-1">
            <input
                bind:value={nouvelInscrit.nom}
                class="w-32 p-1 text-sm bg-gray-800 text-gray-200 rounded focus:outline-none appearance-none leading-normal"
                type="text"
                id="nomInscrit"
                />
        </td>
        <td class="border border-gray-600  px-2 py-1">
            <input
                bind:value={nouvelInscrit.email}
                class="w-full p-1 text-sm bg-gray-800 text-gray-200 rounded focus:outline-none appearance-none leading-normal"
                type="text"
                id="emailInscrit"
                />
        </td>
        <td class="border border-gray-600 px-2 py-1">
            {#if nouvelInscrit.email!=="" && nouvelInscrit.prenom!==""}
                <Bouton noBorder={true} largeur="w-10" couleur="text-vertLBF border-vertLBF" on:actionBouton={sauveNouvelInscrit} occupe={flagSauveNouvelInscrit}>
                    <Fa icon={faSave} size="lg" class="mx-auto" />
                </Bouton>
            {/if}
        </td>
    </tr>
    {/if}
  </tbody>
</table>
<div class="mt-4">
<h4>Envoyer un message aux inscrits</h4>
    <label for="sujetEmail" class="mt-2">
    <div class="text-base text-bleuLBF">Sujet</div>
            <input 
            bind:value= {message.sujet}
            class="bg-gray-900 text-gray-200 focus:outline-none border border-bleuLBF rounded py-2 px-4 block w-full appearance-none leading-normal"
            type="text"
            id="sujetEMail"
            />
    </label>
    <div class="mt-2 ">
        <div class="text-base text-bleuLBF">Message</div>
        <Editeur bind:contenu={message.corps} couleur="bleu"/>
    </div>
</div>
    <div class="flex flex-row justify-end items-center mt-4">
        <Bouton largeur="w-10" couleur="text-bleuLBF border-bleuLBF" on:actionBouton={()=>{dispatch('close')}}>
            <Fa icon={faArrowLeft} size="lg"  class="mx-auto" />
        </Bouton>
        <Bouton disabled={message.sujet==="" || message.corps==="" || message.corps ==="<p><br></p>"} largeur="w-12" couleur="text-vertLBF border-vertLBF" on:actionBouton={() => {if (!flagEnvoieMailOK) {envoyerEmail()}}} occupe={flagEnvoiMail} succes={flagEnvoieMailOK}>
            <Fa icon={faEnvelope} size="lg" class="mx-auto" />
        </Bouton>
    </div>
</main>
<!-- confirme efface atelier -->
<Dialog bind:visible={flagConfirmationEffacerInscrit} on:close={() => {flagConfirmationEffacerInscrit=false}}>
    <h4 slot="title">Confirmation</h4>
    <p>Confirmer la suppression de cet inscrit</p>
    <div slot="actions" class="flex flex-row justify-end items-center">
        <Bouton on:actionBouton={() => flagConfirmationEffacerInscrit = false}>Annuler</Bouton>
        <Bouton on:actionBouton = {effacerInscrit} couleur="text-orangeLBF border-orangeLBF">Confirmer</Bouton>
    </div>
</Dialog>