<script>
  import Form from "./Form.svelte";
  import Button from "./Button.svelte";

  export let name;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #00aa4d;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>{name}</h1>

  <!-- {#if !formData.done} -->
  <Form />
  <!-- {:else} -->
  <Button />
  <!-- {/if} -->
</main>
