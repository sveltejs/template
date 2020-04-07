<script>
import { createEventDispatcher } from "svelte";
import { get_current_component } from "svelte/internal"
const component = get_current_component()
    const svelteDispatch = createEventDispatcher()
    const dispatch = (name, detail) => {
        svelteDispatch(name, detail)
        component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }))
    }
const actionBouton = () => {
    document.getElementById('leBouton').blur()
    dispatch("actionBouton")
    }

export let occupe = false;
export let couleur = "text-bleuLBF border-bleuLBF"
export let couleurSVG = "text-bleuLBF-500 bg-bleuLBF-500"

$: border = occupe?" cursor-default":" border-2 cursor-pointer"
$: classBouton = "w-24 h-10 mx-1 px-1 my-auto rounded text-base font-medium " + couleur + border
const classSVG = "fill-current stroke-current h-8 w-8 mx-auto mt-2" + couleurSVG

</script>

<button on:click={() => {if (!occupe) {actionBouton()}}} class={classBouton} id="leBouton">
    {#if occupe}
        <svg xmlns="http://www.w3.org/2000/svg" class={classSVG} viewBox="0 0 50 50">
            <g fill="none" fill-rule="evenodd" stroke-width="2">
                <circle cx="22" cy="22" r="1">
                    <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                    <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
                </circle>
                <circle cx="22" cy="22" r="1">
                    <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                    <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
                </circle>
            </g>
        </svg>
    {:else}
        <slot class="mx-auto">un bouton</slot>
    {/if}
</button>