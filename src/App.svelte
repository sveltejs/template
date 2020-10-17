<script>
  import { radio } from "./store.js";

  import Form from "./Form.svelte";
  import Button from "./Button.svelte";

  let formComplete = false;

  export let appName;

  // I think we can use "event forwarding" to work with events from children to parents - DA 10/16/20
  function handleClick() {
    formComplete = !formComplete;
    console.log($radio.tech);
  }
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
  <h1>{appName}</h1>

  {#if !formComplete}
    <Form on:click={handleClick} />
  {:else}
    <Button />
  {/if}
</main>
