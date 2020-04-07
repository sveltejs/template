<script>
  import { onMount } from "svelte";
  import { ClassBuilder } from "../../utils/classes.js";

  import Indicator from "./Indicator.svelte";
  import ProgressLinear from "../ProgressLinear";
  import TabButton from "./TabButton.svelte";

  export let selected = null;
  export let navigation = false;
  export let items = [];
  export let indicator = true;
  export let color = "white";
  export let notSelectedColor = "white";
  let className = "";
  export {className as class};
  export let loading = false;
  export let tabButtonClasses = i => i;

  let node;
  let indicatorWidth = 0;
  let indicatorOffset = 0;
  let offset = null;


  function calcIndicator() {
    indicatorWidth = node ? node.offsetWidth / items.length : 0;

    let left = 0;
    if (selected && items.findIndex(i => selected.includes(i.to || i.id)) !== -1) {
      const longestMatch = items
        .map((item, index) => [index, item])
        .filter(([index, item]) => selected.includes(item.to || item.id))
        .sort(
          ([index1, item1], [index2, item2]) =>
            (item2.to || item2.id).length - (item1.to || item1.id).length
        )[0];

      if (longestMatch) {
        left = longestMatch[0];
        offset = left * indicatorWidth;
      }
    } else {
      offset = null;
    }
  }

  onMount(() => calcIndicator(selected));

  $: calcIndicator(selected);

  const classesDefault = "y-0 h-full items-center relative mx-auto z-20";

  export let classes = classesDefault;

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb
    .flush()
    .add(className)
    .add('hidden md:flex w-full max-w-2xl', navigation)
    .add('flex', !navigation)
    .get();
</script>

<div
  class={c}
  bind:this={node}>
  {#each items as item, i}
    <slot name="item" {color} {item}>
      <TabButton
        class={tabButtonClasses}
        bind:selected
        {...item}
        {color}
        {notSelectedColor}
      >{item.text}</TabButton>
    </slot>
  {/each}
  {#if indicator && offset !== null}
    <Indicator {color} width={indicatorWidth} left={offset} />
  {/if}
</div>
{#if loading}
  <ProgressLinear {color} />
{/if}

<slot {selected} name="content" />
