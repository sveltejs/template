<script>
  let commands = [
    {
      id: "1",
      text: "Hey Google, do this thing - ",
    },
    {
      id: "2",
      text: "Hey Google, call your ex-boyfriend's mom's lawyer.",
    },
    {
      id: "3",
      text: "Hey Google, take me to the dark web.",
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

<style>
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
  }

  button:hover,
  button:focus {
    background-color: white;
    border: 0.25em solid #00aa4d;
    color: #00aa4d;
    cursor: pointer;
  }

  h2 {
    font-size: 3em;
  }
</style>

{#if clickedOnce}
  <h2>{commands[randomCommand].text}</h2>
{/if}

<button on:click={handleClick}> Press this button </button>
