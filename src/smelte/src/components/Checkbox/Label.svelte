<script>
  import { ClassBuilder } from "../../utils/classes.js";

  const classesDefault = "pl-2 cursor-pointer 'text-gray-700 dark:text-gray-300'";
  let className = "";
  export let classes = classesDefault;

  export {className as class};
  export let label = "";
  export let disabled = false;
  export let disabledClasses = "text-gray-500 dark:text-gray-600";

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb
    .flush()
    .add(classes, true, classesDefault)
    .add(disabledClasses, disabled)
    .add(className)
    .get();
</script>

<label
  aria-hidden="true"
  {...$$props}
  class={c}
>
  <slot>{label}</slot>
</label>