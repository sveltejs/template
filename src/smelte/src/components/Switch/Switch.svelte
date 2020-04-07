<script>
  import Ripple from "../Ripple";

  import { ClassBuilder } from "../../utils/classes.js";
  
  const classesDefault = `inline-flex items-center mb-2 cursor-pointer z-10`;
  const trackClassesDefault = "relative w-10 h-auto z-0 rounded-full overflow-visible flex items-center justify-center";
  const thumbClassesDefault = "rounded-full p-2 w-5 h-5 absolute elevation-3 transition-fast";
  const labelClassesDefault = "pl-2 cursor-pointer";

  export let value = false;
  export let label = "";
  export let color = "primary";
  export let disabled = false;
  export let trackClasses = trackClassesDefault;
  export let thumbClasses = thumbClassesDefault;
  export let labelClasses = labelClassesDefault;

  let className = "";
  export let classes = classesDefault;

  export {className as class};
  const cb = new ClassBuilder(classes, classesDefault);
  const trcb = new ClassBuilder(trackClasses, trackClassesDefault);
  const thcb = new ClassBuilder(thumbClasses, thumbClassesDefault);
  const lcb = new ClassBuilder(labelClasses, labelClassesDefault);

  $: c = cb
    .flush()
    .add(classes, true, classesDefault)
    .add(className)
    .get();
  $: tr = trcb
    .flush()
    .add("bg-gray-700", !value)
    .add(`bg-${color}-200`, value)
    .add(trackClasses, true, trackClassesDefault)
    .get();
  $: th = thcb
    .flush()
    .add(thumbClasses, true, thumbClassesDefault)
    .add("bg-white left-0", !value)
    .add(`bg-${color}-400`, value)
    .get();
  $: l = lcb
    .flush()
    .add(labelClasses, true, labelClassesDefault)
    .add("text-gray-500", disabled)
    .add("text-gray-700", !disabled)
    .get();

  function check() {
    if (disabled) return;

    value = !value;
  }
</script>

<div class={c} on:click={check}>
  <input bind:value class="hidden" type="checkbox" on:change />
  <div class={tr}>
    <div class="w-full h-full absolute" />
    <Ripple color={value && !disabled ? color : 'gray'} noHover>
      <div
        class={th}
        style={value ? 'left: 1.25rem' : ""} />
    </Ripple>
  </div>
  <label aria-hidden="true" class={l}>
    {label}
  </label>
</div>
