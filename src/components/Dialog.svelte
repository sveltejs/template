<script>
import { createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
import { fade } from "svelte/transition";
import { quadOut, quadIn } from "svelte/easing";
import { scale } from "svelte/transition";

export let visible = false;
export let persistant = false;
export let opacity = 0.7;

let inProps = { duration: 150, easing: quadIn };
let outProps = { duration: 150, easing: quadOut };
let transitionProps = { duration: 100, easing: quadIn, delay: 0 };

</script>

{#if visible}
  <div class="fixed w-full h-full top-0 left-0 z-30 overflow-y-scroll">
    <div
        class="bg-lbfbleu-900 fixed top-0 left-0 z-10 w-full h-full"
        style="opacity: {opacity}"
        in:fade={inProps}
        out:fade={outProps}
        on:click={() => {if(visible && !persistant) {dispatch('close')}}} />
    <div class="h-full w-full absolute flex items-center justify-center">
        <div
        in:scale={transitionProps}
        out:scale={transitionProps}
        class="items-center z-50 rounded bg-gray-900 dark:bg-dark-400 p-4 elevation-4 max-w-5/6">
        <div class="text-lg font-bold pb-4">
            <slot name="title" />
        </div>
        <slot />
        <div class="flex flex-row w-full justify-end items-center pt-4">
            <slot name="actions" />
        </div>
        </div>
    </div>
  </div>
{/if}