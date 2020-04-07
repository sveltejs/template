<script>
  export let color = "primary";
  export let noHover = false;
  import createRipple from "../Ripple/ripple.js";
  let className = "p-2";
  export {className as class};


  $: ripple = createRipple(color, true);
  $: hoverClass = `hover:bg-${color}-transLight`;
</script>

<style>
  .ripple {
    position: absolute !important;
  }
</style>

<span
  use:ripple
  class="z-40 {className} rounded-full flex items-center justify-center top-0 left-0 {noHover ? "" : hoverClass}">
  <slot />
</span>
