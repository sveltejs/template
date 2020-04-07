<script>
  import { ClassBuilder } from "../../utils/classes.js";
  import { createEventDispatcher } from "svelte";
  import Select from "../Select";
  import Button from "../Button";
  import { Spacer } from "../Util";
  import Icon from "../Icon";

  const classesDefault = "flex justify-between items-center text-gray-700 text-sm w-full h-16";

  const paginatorPropsDefault = {
    color: "gray",
    text: true,
    flat: true,
    dark: true,
    remove: "px-4 px-3",
    iconClasses: (c) => c.replace("p-4", ""),
    disabledClasses: (c) => c
      .replace("text-white", "text-gray-200")
      .replace("bg-gray-300", "bg-transparent")
      .replace("text-gray-700", ""),
  };

  let className = "";
  export let classes = classesDefault;
  export {className as class};

  export let perPage = 0;
  export let page = 0;
  export let offset = 0;
  export let pagesCount = 0;
  export let perPageOptions = 0;
  export let scrollToTop = false;
  export let table = null;
  export let total = 0;

  export let paginatorProps = false;

  const dispatch = createEventDispatcher();

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb
    .flush()
    .add(classes, true, classesDefault)
    .add(className)
    .get();
</script>

<tfoot>
  <tr>
    <td colspan="100%" class="border-none">
      <div class={c}>
        <Spacer />
        <div class="mr-1 py-1">
        Rows per page:
        </div>
        <Select
          class="w-16 h-8 mb-5"
          remove="select"
          replace={{ "pt-6": "pt-4" }}
          inputWrapperClasses={(c) => c.replace("mt-2", "").replace("pb-6", "")}
          appendClasses={(c) => c.replace("pt-4", "pt-3").replace("pr-4", "pr-2")}
          noUnderline
          dense
          bind:value={perPage}
          items={perPageOptions}
        />
        <Spacer />
        <div>{offset}-{offset + perPage > total ? total : offset + perPage} of {total}</div>
        <Button
          disabled={(page - 1) < 1}
          icon="keyboard_arrow_left"
          {...(paginatorProps || paginatorPropsDefault)}
          on:click={() => {
            page -= 1;
            if (scrollToTop) table.scrollIntoView({ behavior: "smooth" });
          }} />
        <Button
          disabled={page === pagesCount}
          icon="keyboard_arrow_right"
          {...(paginatorProps || paginatorPropsDefault)}
          on:click={() => {
            page += 1;
            if (scrollToTop) table.scrollIntoView({ behavior: "smooth" });
          }} />
        </div>
      </td>
    </tr>
  </tfoot>