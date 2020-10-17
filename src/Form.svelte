<script>
  import { radio } from "./store.js";
</script>

<style>
  fieldset {
    border: none;
  }

  legend {
    font-size: 1.5em;
  }

  .radio-wrapper {
    border: 0.25em solid white;
    display: inline-block;
    transition: 0.4s;
  }

  .radio-wrapper:hover {
    background-color: white;
    border: 0.25em solid #00aa4d;
    border-radius: 5em;
  }

  input {
    height: 1em;
    width: 1em;
  }

  label {
    display: inline-block;
    font-size: 1.5em;
    padding: 1em;
  }

  label:hover {
    cursor: pointer;
  }

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
</style>

<fieldset>
  <legend>Which wiretap company do you use?</legend>
  <div class="radio-buttons">
    <div class="radio-wrapper">
      <input
        type="radio"
        name="company-name"
        id="google"
        bind:group={$radio.tech}
        value={'Hey Google'} />
      <label for="google">Google</label>
    </div>
    <div class="radio-wrapper">
      <input
        type="radio"
        name="company-name"
        id="amazon"
        bind:group={$radio.tech}
        value={'Amazon'} />
      <label for="amazon">Amazon</label>
    </div>
    <div class="radio-wrapper">
      <input
        type="radio"
        name="company-name"
        id="other"
        bind:group={$radio.tech}
        value={'The other one??'} />
      <label for="other">Other?</label>
    </div>
  </div>
</fieldset>

<!-- Should this be a submit button as part of the form? -->
<button on:click>Okay, done</button>
