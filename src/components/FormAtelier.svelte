<script>
import { onMount, createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
import { ajouterAtelier, majAtelier,effacerAtelier } from "./../graphQL/ateliers.js"
import { auth } from "./../stores/auth.js"
import { user } from "./../stores/user.js"
import ImageUpload from './imageUpload.svelte';
import ListeInscrits from './listeInscritsAtelier.svelte'
import CheckBox from './CheckBox.svelte';
import Editeur from './editeur.svelte';
import Bouton from './Button/Button.svelte';
import Dialog from './Dialog.svelte'
import Fa from 'svelte-fa'
import { faEuroSign, faEdit, faTrashAlt, faArrowLeft, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faSave, faCopy, faEnvelope } from '@fortawesome/free-regular-svg-icons'

import {espacesBF} from './../stores/espacesBF.js'
import { dateFr, dateInscription} from './../utils/dateFr.js'
import Datepicker from './SvelteCalendar/Datepicker.svelte'

export let flagEdition=false;
export let dataAtelier = {
    id: "",
    titre:"",
    espace: "Latelier",
    urlImage: "logoLBFSeul_a1t4af.png",
    nbParticipants: 8,
    surInscription: true,
    dateDebut: new Date(),
    dateFin: new Date(),
    description: "Une description",
    inscrits:[],
    tarifs: [ [ "Adhérent", "10", true ], [ "Non adhérent", "15", false ] ]
}
export let archive = false;

let editAtelier = {
    ... dataAtelier
}
console.log('editAtelier', editAtelier)

let flagSauvegardeEnCours = false;
let flagDuplicationEnCours = false;
let flagSauvegardeSucces = false;
let flagDuplicationSucces = false;
let busyEffacerAtelier = false;
let flagConfirmationEffacerAtelier = false;
let flagDupliquer = false;
let flagListeInscrits = false;

var jourDebut = new Date(editAtelier.dateDebut)
var jourFin = new Date(editAtelier.dateFin)
let deuxJourAvantDebut = new Date(editAtelier.dateDebut)
let deuxAnsApresFin = new Date(editAtelier.dateFin)
var heureDebut = jourDebut.getHours() + "h"
jourDebut.getMinutes()===0? heureDebut = heureDebut + "00":heureDebut = heureDebut + jourDebut.getMinutes()
var heureFin = jourFin.getHours() + "h"
jourFin.getMinutes()===0? heureFin = heureFin + "00":heureFin = heureFin + jourFin.getMinutes()
let maintenant= new Date();
let  dateFormat = "#{l} #{j} #{F} #{Y}"
let datesFormatees = ""

$: {
    deuxJourAvantDebut = new Date(editAtelier.dateDebut)
    deuxJourAvantDebut.setDate(deuxJourAvantDebut.getDate()-2)
    deuxAnsApresFin = new Date(editAtelier.dateFin)
    deuxAnsApresFin.setMonth(deuxAnsApresFin.getMonth()+24)
    let heureDebutTemp = heureDebut.split('h')
    jourDebut.setHours(heureDebutTemp[0])
    jourDebut.setMinutes(heureDebutTemp[1])
    let heureFinTemp = heureFin.split('h')
    jourFin.setHours(heureFinTemp[0])
    jourFin.setMinutes(heureFinTemp[1])
    datesFormatees =  dateInscription(jourDebut, jourFin)
}

const optionsURL= [
        {
          ar: '2:1',
          cropType: 'fill'
        },
        {
          width: 'auto',
          qualite: 'auto',
          cropType: 'scale'
        }
      ]
      
function fini() {
    dispatch('close')
}

function sauveAtelier() {
    let variables = {}
    let heureDebutTemp = heureDebut.split('h')
    jourDebut.setHours(heureDebutTemp[0])
    jourDebut.setMinutes(heureDebutTemp[1])
    let heureFinTemp = heureFin.split('h')
    jourFin.setHours(heureFinTemp[0])
    jourFin.setMinutes(heureFinTemp[1])
    var tarifs='{'
    editAtelier.tarifs.forEach((tarif, index) => {
        if(index===0) {
          tarifs = tarifs + '{'+ tarif[0] + ', ' +  tarif[1] + ', ' + tarif[2] +'}'
        } else {
          tarifs = tarifs + ', {'+ tarif[0] + ', ' +  tarif[1] + ', ' + tarif[2] +'}'
        }
      })
    tarifs = tarifs + '}'
    variables = {
        dateDebut: jourDebut,
        dateFin: jourFin,
        description: editAtelier.description || "Un nouvel atelier sympa !",
        espace: editAtelier.espace,
        nbParticipants: editAtelier.nbParticipants,
        surInscription: editAtelier.surInscription,
        tarifs: tarifs,
        titre: editAtelier.titre || "Un nouvel atelier A",
        urlImage: editAtelier.urlImage
    }
    if ($auth && $user) {
        flagSauvegardeEnCours = !flagDupliquer;
        flagDuplicationEnCours = flagDupliquer
        ajouterAtelier($auth, $user.estAdmin, variables).then((result)=> {
            flagSauvegardeSucces = !flagDupliquer
            flagDuplicationSucces = flagDupliquer
            flagSauvegardeEnCours = false
            flagDuplicationEnCours = false
            fini()
        })
    }
}

function updateAtelier() {
    let variables = {}
    let heureDebutTemp = heureDebut.split('h')
    jourDebut.setHours(heureDebutTemp[0])
    jourDebut.setMinutes(heureDebutTemp[1])
    let heureFinTemp = heureFin.split('h')
    jourFin.setHours(heureFinTemp[0])
    jourFin.setMinutes(heureFinTemp[1])
    var tarifs='{'
    editAtelier.tarifs.forEach((tarif, index) => {
        if(index===0) {
          tarifs = tarifs + '{'+ tarif[0] + ', ' +  tarif[1] + ', ' + tarif[2] +'}'
        } else {
          tarifs = tarifs + ', {'+ tarif[0] + ', ' +  tarif[1] + ', ' + tarif[2] +'}'
        }
      })
    tarifs = tarifs + '}'
    variables = {
        id: editAtelier.id,
        dateDebut: jourDebut,
        dateFin: jourFin,
        description: editAtelier.description || "Un nouvel atelier sympa !",
        espace: editAtelier.espace,
        nbParticipants: editAtelier.nbParticipants,
        surInscription: editAtelier.surInscription,
        tarifs: tarifs,
        titre: editAtelier.titre || "Un nouvel atelier update",
        urlImage: editAtelier.urlImage
    }
    if ($auth && $user) {
        flagSauvegardeEnCours = true;
        majAtelier($auth, $user.estAdmin, variables).then((result)=> {
            flagSauvegardeSucces = true
            flagSauvegardeEnCours = false
            fini()
        })
    }
}

function dupliqueAtelier() {
    let variables = {}
    let heureDebutTemp = heureDebut.split('h')
    jourDebut.setHours(heureDebutTemp[0])
    jourDebut.setMinutes(heureDebutTemp[1])
    let heureFinTemp = heureFin.split('h')
    jourFin.setHours(heureFinTemp[0])
    jourFin.setMinutes(heureFinTemp[1])
    var tarifs='{'
    editAtelier.tarifs.forEach((tarif, index) => {
        if(index===0) {
          tarifs = tarifs + '{'+ tarif[0] + ', ' +  tarif[1] + ', ' + tarif[2] +'}'
        } else {
          tarifs = tarifs + ', {'+ tarif[0] + ', ' +  tarif[1] + ', ' + tarif[2] +'}'
        }
      })
    tarifs = tarifs + '}'
    variables = {
        dateDebut: jourDebut,
        dateFin: jourFin,
        description: editAtelier.description || "Un nouvel atelier sympa !",
        espace: editAtelier.espace,
        nbParticipants: editAtelier.nbParticipants,
        surInscription: editAtelier.surInscription,
        tarifs: tarifs,
        titre: editAtelier.titre || "Un nouvel atelier Dupliqué",
        urlImage: editAtelier.urlImage
    }
    if ($auth && $user) {
        flagSauvegardeEnCours = !flagDupliquer;
        flagDuplicationEnCours = flagDupliquer
        ajouterAtelier($auth, $user.estAdmin, variables).then((result)=> {
            flagSauvegardeSucces = !flagDupliquer
            flagDuplicationSucces = flagDupliquer
            flagSauvegardeEnCours = false
            flagDuplicationEnCours = false
            fini()
        })
    }
}

function validationSauvegarde() {
    if (flagEdition) {
        updateAtelier()
    } else {
        sauveAtelier()
    }
}

function formatHoraire(e, horaire) {
        let l = horaire.length
    if (horaire.match(/^[0-9]$/g)===null 
        && horaire.match(/^([0-1]?[0-9]|2[0-3])$/gm)=== null 
        && horaire.match(/^([0-1]?[0-9]|2[0-3])h$/gm)=== null 
        && horaire.match(/^([0-1]?[0-9]|2[0-3])h[0-5]$/g)===null 
        && horaire.match(/^([0-1]?[0-9]|2[0-3])h[0-5][0-9]$/g)===null
        ) {
        if (horaire.match(/^([0-1]?[0-9]|2[0-3])[0-5]$/g) || horaire.match(/^([0-1]?[0-9]|2[0-3])[0-5][0-9]$/g)) {
            horaire = horaire.substr(0, 2) + "h"+ horaire.substr(2);
        } else {
            horaire = horaire.slice(0,-1)
        }
    }
    if ((e.key==="Backspace" || e.key==="Delete") && horaire.match(/^([0-1]?[0-9]|2[0-3])h$/gm))
    {
      horaire = horaire.slice(0,-1)  
    }
    return horaire
}

function effacerTarif(index) {
    editAtelier.tarifs.splice(index,1)
    editAtelier = editAtelier
}

function ajouterTarif() {
    editAtelier.tarifs.push(["Nouveau tarif", "10" , false])
    editAtelier = editAtelier
}

function supprimerAtelier() {
    let variables = {}
    busyEffacerAtelier = true
    variables = {
        id: editAtelier.id
    }
    effacerAtelier($auth, $user.estAdmin, variables).then(async ()=>{
        busyEffacerAtelier = false
        fini()
    })
}


</script>

<div class="w-480px p-1 bg-gray-900 flex flex-col border-gray-200">
    <label for="titre">
    Titre de l'atelier
            <input 
            bind:value= {editAtelier.titre}
            class="bg-gray-900 text-gray-200 focus:outline-none border border-bleuLBF rounded py-2 px-4 block w-full appearance-none leading-normal"
            type="text"
            id="titre"
            />
    </label>
    <label for="selectEspaces" class="mt-3 flex flex-row">
    <div class="mr-2 text-base font-medium  text-bleuLBF">Espace concerné</div>
        <select value={editAtelier.espace} id="selectEspaces" class="bg-gray-900 border border-bleuLBF rounded">
		{#each $espacesBF as espace}
			<option value={espace.value}>
				{espace.label}
			</option>
		{/each}
	    </select>
    </label>
    <div class="w-5/6 mx-auto mt-3">
        <ImageUpload bind:nomImage={editAtelier.urlImage} options = {optionsURL} altImage="Illustration de l'atelier" classImage="rounded border-2 border-bleuLBF" />
    </div>
    <div class="flex flex-row items-center justify-between mt-4">
        <label for="nbParticipants" class="w-1/2 flex flex-row items-center text-vertLBF">
            <input 
            bind:value= {editAtelier.nbParticipants}
            class="bg-gray-900 text-gray-200 focus:outline-none focus:shadow-outline border border-vertLBF rounded py-2 text-right block w-1/6 appearance-none leading-normal"
            type="number"
            id="nbParticipant"
            />
            <div class="ml-2 text-base font-medium">Nb de participants</div>
        </label>
        <CheckBox label="sur inscription ?" cbClasses="text-vertLBF" bind:checked={editAtelier.surInscription}/>
    </div>
    <div class="flex flex-col text-vertLBF mt-3">
        <div class="text-base font-medium">du :</div>
        <div class="flex flex-row justify-between">
            <div >
                <Datepicker
                    start={deuxJourAvantDebut}
                    end={jourFin}
                    bind:selected={jourDebut}
                    daysOfWeek={dateFr.jours}
                    monthsOfYear={dateFr.mois}
                    format={dateFormat}
                    buttonBackgroundColor="#1a202c"
                    buttonBorderColor="#93c021"
                    buttonTextColor="#edf2f7"
                    buttonWidth="300px"
                    dayTextColor="#edf2f7"
                    highlightColor="#93c021"
                />
            </div>
            <label for="heureDebut" class="flex flex-row items-center">
                <div class="ml-8 mr-3 text-base font-medium">à :</div>
                <input 
                    bind:value={heureDebut}
                    class="bg-gray-900 text-gray-200 focus:outline-none border border-vertLBF rounded py-2 px-2 text-center block appearance-none leading-normal w-20"
                    type="text" 
                    id="heureDebut"
                    on:keyup={(event)=> {heureDebut = formatHoraire(event, heureDebut)}}
                    />
            </label>
        </div>
        <div class="text-base font-medium">au :</div>
        <div class="flex flex-row justify-between">
            <div >
                <Datepicker
                    start={jourDebut}
                    end={deuxAnsApresFin}
                    bind:selected={jourFin}
                    daysOfWeek={dateFr.jours}
                    monthsOfYear={dateFr.mois}
                    format={dateFormat}
                    buttonBackgroundColor="#1a202c"
                    buttonBorderColor="#93c021"
                    buttonTextColor="#edf2f7"
                    buttonWidth="300px"
                    dayTextColor="#edf2f7"
                    highlightColor="#93c021"
                />
            </div>
            <label for="heureFin" class="flex flex-row items-center">
                <div class="ml-8 mr-3 text-base font-medium">à :</div>
                <input 
                    bind:value={heureFin}
                    class="bg-gray-900 text-gray-200 focus:outline-none border border-vertLBF rounded py-2 px-2 text-center block appearance-none leading-normal w-20"
                    type="text" 
                    id="heureFin"
                    on:keyup={(event)=> {heureFin = formatHoraire(event, heureFin)}}
                    />
            </label>
        </div>
    </div>
    <div class="mt-4 ">
        <div class="text-xl font-medium text-jauneLBF">Description :</div>
        <Editeur bind:contenu={editAtelier.description} couleur="jaune"/>
    </div>
    <div class="mt-4 ">
        <div class="flex flex-row justify-between mb-2">
            <div class="text-xl font-medium text-rougeLBF">Tarifs :</div>
            <button class="text-rougeLBF border border-rougeLBF rounded-sm p-1 focus:outline-none" on:click={ajouterTarif}>Ajouter un tarif</button>
        </div>
        <div class="flex flex-row flex-wrap justify-around">
            {#each editAtelier.tarifs as tarif, index}
                <div class="w-5/12 border border-rougeLBF rounded p-1 mx-2 my-2">
                    <div class="flex flex-row items-center my-2">
                        <Fa icon={faEuroSign} size="lg" class="mx-1 w-8"/>
                        <input 
                            class="bg-gray-800 text-gray-200 focus:outline-none rounded p-0 px-1 block w-full appearance-none leading-normal"
                            type="text" 
                            bind:value={tarif[1]}/>
                        {#if index>0}
                            <div class="text-rougeLBF cursor-pointer focus:outline-none" on:click={() => {effacerTarif(index)}}>
                                <Fa icon={faTrashAlt} size="lg"  class="mx-1 w-8" />
                            </div>
                        {/if}
                    </div>
                    <div class="flex flex-row items-center my-2">
                        <Fa icon={faEdit} size="lg" class="mx-1 w-8"/>
                        <input 
                            class="bg-gray-800 text-gray-200 focus:outline-none rounded p-0 px-1 block w-full appearance-none leading-normal"
                            type="text" 
                            bind:value={tarif[0]}/>
                    </div>
                    <div class="flex flex-row items-center my-2 ml-2">
                        <CheckBox label="QF ?" cbClasses="text-gray-200" bind:checked={tarif[2]}/>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex flex-row justify-end items-center mt-4">
        <Bouton on:actionBouton={fini} largeur="w-10" couleur="text-bleuLBF border-bleuLBF">
            <Fa icon={faArrowLeft} size="lg"  class="mx-auto" />
        </Bouton>
        {#if flagEdition && editAtelier.inscritsAteliers.length===0}
            <Bouton occupe={busyEffacerAtelier} on:actionBouton={() => flagConfirmationEffacerAtelier = true} largeur="w-10" couleur="text-rougeLBF border-rougeLBF">
                <Fa icon={faTrashAlt} size="lg"  class="mx-auto" />
            </Bouton>
        {/if}
        {#if flagEdition}
            <Bouton on:actionBouton={() => flagListeInscrits = true} largeur="w-10" couleur="text-jauneLBF border-jauneLBF">
                <Fa icon={faUsers} size="lg"  class="mx-auto" />
            </Bouton>
            <Bouton occupe={flagDuplicationEnCours} succes={flagDuplicationSucces} on:actionBouton={() => {dupliqueAtelier()}} largeur="w-12" couleur="text-orangeLBF border-orangeLBF">
                <Fa icon={faCopy} size="lg"  class="mx-auto" />
            </Bouton>
        {/if}
        {#if !archive}
            <Bouton bind:occupe={flagSauvegardeEnCours} bind:succes={flagSauvegardeSucces} on:actionBouton={validationSauvegarde} largeur="w-12" couleur="text-vertLBF border-vertLBF">
                <Fa icon={faSave} size="lg" class="mx-auto" />
            </Bouton>
        {/if}
    </div>
</div>

<!-- confirme efface atelier -->
<Dialog bind:visible={flagConfirmationEffacerAtelier} on:close={() => {flagConfirmationEffacerAtelier=false}}>
    <h4 slot="title">Confirmation</h4>
    <p>Confirmer la suppression de l'atelier</p>
    <div slot="actions" class="flex flex-row justify-end items-center">
        <Bouton on:actionBouton={() => flagConfirmationEffacerAtelier = false}>Annuler</Bouton>
        <Bouton occupe={busyEffacerAtelier} on:actionBouton = {supprimerAtelier} couleur="text-orangeLBF border-orangeLBF">Confirmer</Bouton>
    </div>
</Dialog>

<!-- Liste des inscrits-->
<Dialog bind:visible={flagListeInscrits} on:close={() => {flagListeInscrits=false}}>
    <ListeInscrits dateAtelier={datesFormatees} idAtelier={editAtelier.id} archive={archive} on:close={() => {flagListeInscrits=false}}/>
</Dialog>

