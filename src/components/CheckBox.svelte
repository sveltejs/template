<script>
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
import Fa from 'svelte-fa'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'

export let checked=false;
export let label="";
export let position="après";
export let cbClasses="";

let mettreApres = position === "après"
function check() {
    checked != checked
    dispatch('change', checked);
}
</script>

<div on:click={check}>
    <label class={"flex flex-row items-center " + cbClasses}>
        {#if mettreApres}
            <input bind:checked class="hidden" type="checkbox" />
            <div >
                {#if checked}
                    <Fa icon={faCheckSquare} size="lg" />
                {:else}
                    <Fa icon={faSquare} size="lg" />
                {/if}
            </div>
            <div class="ml-3 text-base font-medium">
                {label}
            </div>
        {:else}
            <div class="mr-1">
                {#if checked}
                    <Fa icon={faCheckSquare} size="lg" />
                {:else}
                    <Fa icon={faSquare} size="lg" />
                {/if}
            </div>
            <div class="ml-1 text-base font-medium">
                {label}
            </div>
            <input bind:checked class="hidden" type="checkbox" />
        {/if}
    </label>
</div>