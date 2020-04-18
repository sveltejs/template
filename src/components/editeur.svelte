<script>
import {onMount} from 'svelte'
import { saveSelection, restoreSelection } from '../utils/selection.js'
import Fa from 'svelte-fa'
import { faBold, faItalic, faUnderline, faLink, faUnlink, faCheck } from '@fortawesome/free-solid-svg-icons'
let editeur;
let url="";
let flagAjoutLien = false;
let flagEstUnLien = false;
let savedSelection;

export let contenu = "";
export let couleur = "jaune"

const classeDefaut = "boutonEditeur bouton-" + couleur + "-hover"
const classeActivee =  "bouton-" + couleur
const classeCadre = "mt-1 border rounded p-1 border-" + couleur + "LBF"
var classBold=classeDefaut
var classItalic=classeDefaut
var classUnderline=classeDefaut
var classUnlink=classeDefaut
function etatBouton(command) {return document.queryCommandState(command)}

onMount(() => {
    editeur.focus()
    document.execCommand('formatBlock', false, '<p>');
    editeur.blur()
})

function MEP(command, value) {
    if (command === 'createLink') {
        restoreSelection(editeur, savedSelection)
        document.execCommand(command, false, value);
        url = ""
        flagAjoutLien = false
    } else {
        document.execCommand(command, false, null);
    }
    verifEtatBouton()
}

function prepLien() {
    savedSelection = saveSelection( editeur );
    flagAjoutLien = true
}

function verifEtatBouton() {
    if(contenu==="") {
        document.execCommand('formatBlock', false, '<p>');
    }
    var range = window.getSelection().getRangeAt(0);
    var container = range.commonAncestorContainer;
    var parent1;
    var parent2;
    var parent3;
    var parent4;
    if (container.nodeType == 3) {
        parent1 = container.parentNode;
        parent2 = parent1.parentNode;
        parent3 = parent2.parentNode;
        parent4 = parent3.parentNode;
        } else {
             return
        }
    /*if (etatBouton('bold')) {
        classBold = "boutonJaune"
    } else {classBold="boutonEditeur boutonJauneHover"} */
    if (etatBouton('italic')) {
        classItalic = classeActivee
    } else {classItalic=classeDefaut}
    if (etatBouton('underline')) {
        classUnderline = classeActivee
    } else {classUnderline=classeDefaut}
    if(parent1.nodeName === "A" || parent2.nodeName === "A" || parent3.nodeName === "A" || parent4.nodeName === "A") {
        flagEstUnLien = true
        classUnlink= classeActivee
    } else {
        flagEstUnLien = false
        classUnlink= classeDefaut 
    }
    if(parent1.nodeName === "B" || parent2.nodeName === "B" || parent3.nodeName === "B" || parent4.nodeName === "B") {
        classBold= classeActivee
    } else {
        classBold= classeDefaut
    }
    }
</script>

<svelte:window on:mouseup={verifEtatBouton} on:click={verifEtatBouton} on:keyup={verifEtatBouton}/>
<div class={classeCadre}>
    <div class="mb-2 px-1 flex flex-row items-center">
        <button on:click={() => {MEP('bold')}} class={classBold}>
            <Fa icon={faBold} size="sm" class="mx-auto my-auto"/>
        </button>
        <button on:click={() => {MEP('italic')}} class={classItalic}>
            <Fa icon={faItalic} size="sm" class="mx-auto my-auto"/>
        </button>
        <button on:click={() => {MEP('underline')}} class={classUnderline}>
            <Fa icon={faUnderline} size="sm" class="mx-auto my-auto"/>
        </button>
        {#if flagEstUnLien}
            <button on:click={() =>{ MEP('unlink')}} class={classUnlink}>
                <Fa icon={faUnlink} size="sm" class="mx-auto my-auto"/>
            </button>
        {:else}
            <button on:click={prepLien} class={classeDefaut}>
                <Fa icon={faLink} size="sm" class="mx-auto my-auto"/>
            </button>
            {#if flagAjoutLien}
                <div class="flex flex-row items-center ml-2">
                    <input class="m-0 p-0 px-1 w-full bg-gray-800 rounded-sm mr-1" bind:value={url} />
                    <button on:click={() => {MEP('createLink', url)}} class={classeDefaut}>
                        <Fa icon={faCheck} size="sm" class="mx-auto my-auto"/>
                    </button>
                </div>
            {/if}
        {/if}
    </div>
    <div bind:this={editeur} contenteditable="true" class="editeur bg-gray-800 rounded-sm p-1 focus:outline-none" bind:innerHTML={contenu}></div>
</div>