<script>
  import { ClassBuilder } from "../../utils/classes.js";
  import { createEventDispatcher } from "svelte";
  import Editable from "./Editable.svelte";
  import { Spacer } from "../Util";
  import Icon from "../Icon";

  const classesDefault = "hover:bg-gray-50 dark-hover:bg-dark-400 border-gray-200 dark:border-gray-400 border-t border-b px-3";

  let className = "";
  export let classes = classesDefault;
  export {className as class};

  export let item = {};
  export let columns = [];
  export let editing = false;
  export let editable = false;
  export let index = 0;

  export let editableClasses = i => i;

  const dispatch = createEventDispatcher();

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb
    .flush()
    .add(classes, true, classesDefault)
    .add(className)
    .get();
</script>

<tr
  class={c}
  on:click={(e) => {
  if (!editable) return;
    editing = { [index]: (e.path.find(a => a.localName === "td") || {}).cellIndex }
  }}
  class:selected={editing[index]}
> 
  {#each columns as column, i}
    <td
      class="relative p-3 font-normal text-right {column.class || ''}"
      class:cursor-pointer={editable && column.editable !== false}
    >
      {#if editable && column.editable !== false && editing[index] === i}
        <slot name="edit-dialog">
          <Editable
            class={editableClasses}
            bind:editing
            bind:item
            on:update
            {column}
          />
        </slot>
      {/if}
      {#if column.value}
        {@html column.value(item)}
      {:else}
        {@html item[column.field]}
      {/if}
    </td>
  {/each}
</tr>