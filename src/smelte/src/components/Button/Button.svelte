<script>
  import Icon from "../Icon";
  import utils, { ClassBuilder, filterProps } from "../../utils/classes.js";
  import createRipple from "../Ripple/ripple.js";

  let className = "";
  export {className as class};
  export let value = false;
  export let outlined = false;
  export let text = false;
  export let block = false;
  export let disabled = false;
  export let icon = null;
  export let small = false;
  export let light = false;
  export let dark = false;
  export let flat = false;
  export let iconClass = "";
  export let color = "primary";
  export let href = null;
  export let fab = false;

  export let remove = "";
  export let add = "";
  export let replace = {};

  const classesDefault = 'py-2 px-4 uppercase text-sm font-medium relative overflow-hidden';
  const basicDefault = 'text-white transition';
  const outlinedDefault = 'bg-transparent border border-solid';
  const textDefault = 'bg-transparent border-none px-4 hover:bg-transparent';
  const iconDefault = 'p-4 flex items-center';
  const fabDefault = 'hover:bg-transparent';
  const smallDefault = 'pt-1 pb-1 pl-2 pr-2 text-xs';
  const disabledDefault = 'bg-gray-300 text-gray-500 dark:bg-dark-400 elevation-none pointer-events-none hover:bg-gray-300 cursor-default';
  const elevationDefault = 'hover:elevation-5 elevation-3';

  export let classes = classesDefault;
  export let basicClasses = basicDefault;
  export let outlinedClasses = outlinedDefault;
  export let textClasses = textDefault;
  export let iconClasses = iconDefault;
  export let fabClasses = fabDefault;
  export let smallClasses = smallDefault;
  export let disabledClasses = disabledDefault;
  export let elevationClasses = elevationDefault;

  fab = fab || (text && icon);
  const basic = !outlined && !text && !fab;
  const elevation = (basic || icon) && !disabled && !flat && !text;

  let Classes = i => i;
  let iClasses = i => i;
  let shade = 0;

  $: {
    shade = light ? 200 : 0;
    shade = dark ? -400 : shade;
  }
  $: normal = 500 - shade;
  $: lighter = 400 - shade;

  const {
    bg,
    border,
    txt,
  } = utils(color);

  const cb = new ClassBuilder(classes, classesDefault);
  let iconCb;

  if (icon) {
    iconCb = new ClassBuilder(iconClass);
  }

  $: classes = cb
      .flush()
      .add(basicClasses, basic, basicDefault)
      .add(`${bg(normal)} hover:${bg(lighter)}`, basic)
      .add(elevationClasses, elevation, elevationDefault)
      .add(outlinedClasses, outlined, outlinedDefault)
      .add(
        `${border(lighter)} ${txt(normal)} hover:${bg("trans")} dark-hover:${bg("transDark")}`,
        outlined)
      .add(`${txt(lighter)}`, text)
      .add(textClasses, text, textDefault)
      .add(iconClasses, icon, iconDefault)
      .remove("py-2", icon)
      .remove(txt(lighter), fab)
      .add(disabledClasses, disabled, disabledDefault)
      .add(smallClasses, small, smallDefault)
      .add("flex items-center justify-center h-8 w-8", small && icon)
      .add("border-solid", outlined)
      .add("rounded-full", icon)
      .add("w-full", block)
      .add("rounded", basic || outlined || text)
      .add("button", !icon)
      .add(fabClasses, fab, fabDefault)
      .add(`hover:${bg("transLight")}`, fab)
      .add(className)
      .remove(remove)
      .replace(replace)
      .add(add)
      .get();

  $: if (iconCb) {
    iClasses = iconCb.flush().add(txt(), fab && !iconClass).get();
  }

  const ripple = createRipple((text || fab || outlined) ? color : "white");

  const props = filterProps([
    'outlined',
    'text',
    'color',
    'block',
    'disabled',
    'icon',
    'small',
    'light',
    'dark',
    'flat',
    'add',
    'remove',
    'replace',
  ], $$props);
</script>


{#if href}
  <a
    {href}
    {...props}
  >
    <button
      use:ripple
      class={classes}
      {...props}
      {disabled}
      on:click={() => (value = !value)}
      on:click
      on:mouseover
      on:*
    >
      {#if icon}
        <Icon class={iClasses} {small}>{icon}</Icon>
      {/if}
      <slot />
    </button>
  </a>
{:else}
  <button
    use:ripple
    class={classes}
    {...props}
    {disabled}
    on:click={() => (value = !value)}
    on:click
    on:mouseover
    on:*
  >
    {#if icon}
      <Icon class={iClasses} {small}>{icon}</Icon>
    {/if}
    <slot />
  </button>
{/if}
