<script>
  import { scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { quadIn } from "svelte/easing";
  import { Scrim } from "../Util";
  import { ClassBuilder } from "../../utils/classes.js";

  const classesDefault = "items-center z-50 rounded bg-gray-900 dark:bg-dark-400 p-4 elevation-4";
  const titleClassesDefault = "text-lg font-bold pb-4";
  const actionsClassesDefault = "flex w-full justify-end pt-4";
  
  export let value;
  export let classes = classesDefault;
  export let titleClasses = titleClassesDefault;
  export let actionsClasses = actionsClassesDefault;
  export let opacity = 0.5;
  export let persistent = false;

  export let transitionProps = { duration: 100, easing: quadIn, delay: 0 };

  let className = "";
  export {className as class};

  const cb = new ClassBuilder(classes, classesDefault);
  const tcb = new ClassBuilder(titleClasses, titleClassesDefault);
  const acb = new ClassBuilder(actionsClasses, actionsClassesDefault);

  $: c = cb
    .flush()
    .add(classes, true, classesDefault)
    .add(className)
    .get();

  $: t = tcb
    .flush()
    .add(titleClasses, true, actionsClassesDefault)
    .get();

  $: a = acb
    .flush()
    .add(actionsClasses, true, actionsClassesDefault)
    .get();
</script>

{#if value}
  <div class="fixed w-full h-full top-0 left-0 z-30">
    <Scrim {opacity} on:click={() => !persistent && (value = false)} />
    <div class="h-full w-full absolute flex items-center justify-center">
      <div
        in:scale={transitionProps}
        out:scale={transitionProps}
        class={c}>
        <div class={t}>
          <slot name="title" />
        </div>
        <slot />
        <div class={a}>
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
{/if}
