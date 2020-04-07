<script>
  import { fade } from "svelte/transition";
  import { quadOut, quadIn } from "svelte/easing";

  export let opacity = 0.5;
  export let inProps = { duration: 200, easing: quadIn };
  export let outProps = { duration: 200, easing: quadOut };
</script>

<div
  class="bg-lbfbleu-900 fixed top-0 left-0 z-10 w-full h-full"
  style="opacity: {opacity}"
  in:fade={inProps}
  out:fade={outProps}
  on:click />
