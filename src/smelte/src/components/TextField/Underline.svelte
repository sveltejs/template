<script>
  import utils, { ClassBuilder, filterProps } from "../../utils/classes.js";

  let className = "";
  export {className as class};
  export let noUnderline = false;
  export let outlined = false;
  export let focused = false;
  export let error = false;
  export let color = "primary";

  let defaultClasses = `mx-auto w-0`;

  export let add = "";
  export let remove = "";
  export let replace = "";

  export let lineClasses = defaultClasses;

  const {
    bg,
    border,
    txt,
    caret,
  } = utils(color);

  const l = new ClassBuilder(lineClasses, defaultClasses);

  let Classes = i => i;

  $: classes = l
      .flush()
      .add(txt(), focused && !error)
      .add('bg-error-500', error)
      .add('w-full', focused || error)
      .add(bg(), focused)
      .add(add)
      .remove(remove)
      .replace(replace)
      .get();

  const props = filterProps([
    'focused',
    'error',
    'outlined',
    'labelOnTop',
    'prepend',
    'bgcolor',
    'color'
  ], $$props);
</script>

<style>
.line {
  height: 1px;
}
</style>

<div
  class="line absolute bottom-0 left-0 w-full bg-gray-600 {className}"
  class:hidden={noUnderline || outlined}>
  <div
    class="{classes}"
    style="height: 2px; transition: width .2s ease" />
</div>