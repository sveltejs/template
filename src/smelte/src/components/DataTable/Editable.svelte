<script>
  import { ClassBuilder } from "../../utils/classes.js";
  import { createEventDispatcher } from "svelte";
  import TextField from "../TextField";
  import Icon from "../Icon";

  const classesDefault = "absolute left-0 top-0 z-10 bg-white dark:bg-dark-400 p-2 elevation-3 rounded";

  export let item = {};
  export let column = {};
  export let editing = false;

  let className = "";
  export let classes = classesDefault;
  export {className as class};

  const dispatch = createEventDispatcher();

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb
    .flush()
    .add(classes, true, classesDefault)
    .add(className)
    .get();
</script>

<div class={c} style="width: 300px">
  <slot>
    <TextField
      value={item[column.field]}
      textarea={column.textarea}
      on:change
      remove="bg-gray-100 bg-gray-300"
      on:blur={({ target }) => {
        editing = false;
        dispatch("update", {
          item,
          column,
          value: target.value
        });
      }}
    />
  </slot>
</div>