<script>
  import utils, { ClassBuilder, filterProps } from "../../utils/classes.js";

  let className = "";
  export {className as class};
  export let focused = false;
  export let error = false;
  export let outlined = false;
  export let labelOnTop = false;
  export let prepend = false;
  export let color = "primary";
  // for outlined button label
  export let bgColor = "white";

  let labelDefault = `pt-4 absolute top-0 label-transition block pb-2 px-4 pointer-events-none cursor-text`;

  export let add = "";
  export let remove = "";
  export let replace = "";

  export let labelClasses = labelDefault;

  const {
    bg,
    border,
    txt,
    caret,
  } = utils(color);

  const l = new ClassBuilder(labelClasses, labelDefault);

  let lClasses = i => i;

  $: lClasses = l
      .flush()
      .add(txt(), focused && !error)
      .add('text-error-500', focused && error)
      .add('label-top text-xs', labelOnTop)
      .remove('pt-4 pb-2 px-4 px-1 pt-0', labelOnTop && outlined)
      .add(`ml-3 p-1 pt-0 mt-0 bg-${bgColor} dark:bg-dark-500`, labelOnTop && outlined)
      .remove('px-4', prepend)
      .add('pr-4 pl-10', prepend)
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
    'color'
  ], $$props);
</script>

<style>
.label-top {
  line-height: 0.05;
}
.label-transition {
  transition: font-size 0.05s, line-height 0.1s;
}
</style>

<label class="{lClasses} {className}" {...props}>
  <slot />
</label>