<script context="module">
  import { writable } from "svelte/store";
  
  const queue = writable([]);
  let running = false;
</script>

<script>
  import { fade, scale } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  import { quadOut, quadIn } from "svelte/easing";
  import Button from "../Button";
  import { Spacer } from "../Util";
  import utils, { ClassBuilder } from "../../utils/classes.js";

  export let value = false;
  export let timeout = 2000;
  export let inProps = { duration: 100, easing: quadIn };
  export let outProps = { duration: 100, easing: quadOut, delay: 150 };
  export let color = "gray";
  export let text = "white";
  export let top = false;
  export let bottom = true;
  export let right = false;
  export let left = false;
  export let noAction = true;
  export let hash = false;

  const dispatch = createEventDispatcher();

  const classesDefault = `pointer-events-auto flex absolute py-2 px-4 z-30 mb-4 content-between mx-auto
      rounded items-center elevation-2 h-12`;
  const wrapperDefault = "fixed w-full h-full flex items-center justify-center pointer-events-none";

  let className = classesDefault;
  export {className as class};
  export let classes = wrapperDefault;

  const cb = new ClassBuilder(className, classesDefault);
  const wrapperCb = new ClassBuilder(classes, wrapperDefault);

  let wClasses = i => i;
  let tm;
  let node;

  let bg = () => {};

  $: {
    const u = utils(color || "gray");
    bg = u.bg;
  }

  $: {
    hash = hash || (value ? btoa(`${value}${new Date().valueOf()}`) : null);
    value = value;
  }

  $: toggler = () => toggle(value, hash);

  $: if (value) {
    queue.update(u => [...u, toggler]);
  }

  $: if (!running && value && $queue.length) {
    $queue.shift()();
  }

  $: if (!value) clearTimeout(tm);

  function toggle(h, id) {
    if (value === false && running === false) {
      return;
    }
    hash = running = value = id;

    if (!timeout) return;

    tm = setTimeout(() => {
      value = running = hash = false;
      dispatch("finish");

      if ($queue.length) {
        $queue.shift()();
      }
    }, timeout);
  }

  $: c = cb
      .flush()
      .add(bg(800), color)
      .add("right-0 mr-2", right)
      .add("top-0 mt-2", top)
      .add("left-0 ml-2", left)
      .add("bottom-0", bottom)
      .add("snackbar", !noAction)
      .get();

  // for some reason it doesn't get updated otherwise
  $: if (node) node.classList = c;

  wClasses = wrapperCb
    .flush()
    .add(`text-${text}`)
    .get();
</script>

<style>
  .snackbar {
    min-width: 344px;
  }
</style>

{#if value && (running === hash)}
  <div
    class="fixed w-full h-full top-0 left-0 z-30 pointer-events-none"
  >
    <div class={wClasses}>
      <div
        bind:this={node}
        in:scale={inProps}
        out:fade={outProps}
        on:click={() => value = false}>
        <slot /> 
        {#if !noAction}
          <Spacer />
          <slot name="action">
            {#if !timeout}
              <Button text on:click={() => value = false}>Close</Button>
            {/if}
          </slot>
        {/if}
      </div>
    </div>
  </div>
{/if}
