<script>
    export let value = "";
    export let label = "";
    export let name = "";
    export let pending = false;
    export let errors = {};
    export let onInput = () => {};

    $: messages = errors[name] || [];
  </script>

<label for={name} class:pending class={$$props.class}>{label}</label>
{#if messages.length}
<p class="help is-danger">{messages[0]}</p>
{/if}

<input type="text" class="input" {name} bind:value {...$$props} on:input={onInput} />
