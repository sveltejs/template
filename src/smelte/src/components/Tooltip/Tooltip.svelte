<script>
  import { scale, fade } from "svelte/transition";
  import { ClassBuilder } from "../../utils/classes.js";

  const classesDefault = "tooltip whitespace-no-wrap text-xs absolute mt-2 bg-gray-600 text-gray-50 rounded md:px-2 md:py-2 py-4 px-3 z-30";
  let className = "";
  export let classes = classesDefault;

  export {className as class};
  export let show = false;

  export let timeout = null;

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb
    .flush()
    .add(classes, true, classesDefault)
    .add(className)
    .get();

  function showTooltip() {
    if (show) return;

    show = true;

    if (!timeout) return;

    timeout = setTimeout(() => {
      show = false;
    }, timeout);
  }

  function hideTooltip() {
    if (!show) return;
    
    show = false;
    clearTimeout(timeout);
  }

  function debounce(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this,
        args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
</script>

<style>
.tooltip {
  left: 50%;
  transform: translateX(-50%);
}
</style>

<div class="relative inline-block">
  <div
    on:mouseenter={debounce(showTooltip, 100)}
    on:mouseleave={debounce(hideTooltip, 500)}
    on:mouseenter
    on:mouseleave
    on:mouseover
    on:mouseout
  >
    <slot name="activator" />
  </div>

  {#if show}
    <div
      in:scale={{ duration: 150 }}
      out:scale={{ duration: 150, delay: 100 }}
      class={c}
    >
      <slot />
    </div>
  {/if}
</div>