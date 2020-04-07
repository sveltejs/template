<script>
  import { ClassBuilder } from "../../utils/classes.js";

  let className = "";
  export {className as class};

  let classesDefault = "fixed top-0 w-screen items-center flex-wrap flex left-0 z-30 p-0 h-16 elevation-3 bg-primary-300 dark:bg-dark-600";

  export let classes = classesDefault;

  const cb = new ClassBuilder(classes, classesDefault);

  $: c = cb.flush().add(className).get();
</script>

<header class={c}>
  <slot />
</header>
