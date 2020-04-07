<script>
  export let selected = false;
  export let id = null;
</script>

{#if selected === id}
  <slot />
{/if}
