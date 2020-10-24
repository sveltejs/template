<script>
  import { radio } from "./store.js";
  import { fade } from "svelte/transition";
</script>

<style type="text/scss">
  fieldset {
    border: none;

    legend {
      margin: auto;
      font-size: 1.5em;
    }

    .radio-wrapper {
      border: 0.25em solid white;
      display: inline-block;
      transition: 0.4s;

      &:hover {
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
    }
  }

  .submit {
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
        value={'The other one'} />
      <label for="other">Other?</label>
    </div>
  </div>
  {#if $radio.tech}
    <input
      class="submit"
      on:click|preventDefault
      in:fade
      type="submit"
      value="Okay, done" />
  {/if}
</fieldset>
