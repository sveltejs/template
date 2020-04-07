<script>
  import { slide } from "svelte/transition";
  import utils from "../../utils/classes.js";

  export let width = 0;
  export let left = 0;
  export let color = "primary";

  const { bg } = utils(color);

</script>

<div
  class="absolute bottom-0 left-0 transition {bg(700)}"
  class:hidden={left < 0}
  style="width: {width}px; left: {left}px; height: 2px;"
  transition:slide />
