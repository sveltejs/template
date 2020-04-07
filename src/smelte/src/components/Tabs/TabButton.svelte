<script>
  import Icon from "../Icon";
  import createRipple from "../Ripple/ripple.js";
  import utils, { ClassBuilder } from "../../utils/classes.js";

  const classesDefault = "transition-fast relative overflow-hidden text-center w-full h-full p-4 cursor-pointer flex mx-auto items-center text-sm h-full";

  export let classes = classesDefault;

  export let icon = "";
  export let id = "";
  export let text = "";
  export let to = "";
  export let selected = "";
  export let color = "primary";
  export let notSelectedColor = "white";
  export let tabClasses = "flex flex-col items-center content-center mx-auto";

  let className = "";
  export {className as class};

  const ripple = createRipple(color);

  const { txt, bg } = utils(color);
  const notSelected = utils(notSelectedColor);

  $: textColor = selected === id ? txt() : notSelected.txt();

  const cb = new ClassBuilder(classes, classesDefault);

  $: c = cb
    .flush()
    .add(className)
    .add("uppercase", icon)
    .add(textColor)
    .add(`hover:bg-${color}-transLight hover:${txt(900)}`)
    .get();
</script>

{#if to}
  <a
    use:ripple
    href={to}
    class={c}
    on:click
  >
    <div class={tabClasses}>
      {#if icon}
        <Icon class="mb-1" color={textColor}>{icon}</Icon>
      {/if}

      <div>
        <slot>{text}</slot>
      </div>
    </div>
  </a>
{:else}
  <li
    use:ripple
    class={c}
    on:click={() => selected = id }
    on:click
  >
    <div class={tabClasses}>
      {#if icon}
        <Icon class="mb-1" color={textColor}>{icon}</Icon>
      {/if}

      <div>
        <slot>{text}</slot>
      </div>
    </div>
  </li>
{/if}
