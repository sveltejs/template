<script>
  import { radio } from "./store.js";
  import { fade } from "svelte/transition";

  let commands = [
    {
      id: "1",
      text: "do the thing.",
    },
    {
      id: "2",
      text: "call your ex-boyfriend's mom's lawyer.",
    },
    {
      id: "3",
      text: "take me to the dark web.",
    },
    {
      id: "4",
      text: "is your refrigerator running?",
    },
  ];

  let randomCommand = Math.floor(Math.random() * commands.length);
  let clickedOnce = false;

  function handleClick() {
    clickedOnce = true;
    randomCommand = Math.floor(Math.random() * commands.length);
    console.log(commands[randomCommand]);
  }
</script>

<style type="text/scss">
  button {
    background-color: #00aa4d;
    border: 0.25em solid white;
    border-radius: 5em;
    color: white;
    padding: 1em 2em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 2em;
    text-transform: uppercase;
    transition-duration: 0.4s;

    &:hover,
    &:focus {
      background-color: white;
      border: 0.25em solid #00aa4d;
      color: #00aa4d;
      cursor: pointer;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  h2 {
    font-size: 3em;
  }
</style>

{#if clickedOnce}
  <h2>{$radio.tech}, {commands[randomCommand].text}</h2>
{/if}

<button on:click={handleClick} transition:fade> Press this button </button>
