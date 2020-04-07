<script>
  import { ClassBuilder } from "../../utils/classes.js";

  const classesDefault = "rounded inline-flex flex-col overflow-hidden transition";

  export let hover = true;
  export let elevation = 1;
  export let hoverElevation = 8;
  export let classes = classesDefault;

  export {className as class};
  let className = "";

  const cb = new ClassBuilder(classes, classesDefault);

  $: c = cb
    .flush()
    .add(`elevation-${elevation} hover:elevation-${hoverElevation}`, hover)
    .add(classes, true, classesDefault)
    .add(className)
    .get();
</script>

<div
  class={c}>
  <slot name="title" />
  <slot name="media" />
  <slot />
  <slot name="text" />
  <slot name="actions" />
</div>
