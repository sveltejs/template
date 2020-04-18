<script>
  import { areDatesEquivalent } from './lib/helpers';
  import { fly, fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let days;
  export let selected;
  export let highlighted;
  export let shouldShakeDate;
  export let direction;
</script>

<div 
  class="week" 
  in:fly|local={{ x: direction * 50, duration: 180, delay: 90 }}
  out:fade|local={{ duration: 180 }}
>
  {#each days as day}
    <div 
      class="day" 
      class:outside-month={!day.partOfMonth}
      class:is-today={day.isToday}
      class:is-disabled={!day.selectable}
    >
      <button 
        class="day--label" 
        class:selected={areDatesEquivalent(day.date, selected)}
        class:highlighted={areDatesEquivalent(day.date, highlighted)}
        class:shake-date={shouldShakeDate && areDatesEquivalent(day.date, shouldShakeDate)}
        class:disabled={!day.selectable}
        type="button"
        on:click={() => dispatch('dateSelected', day.date)}
      >
        {day.date.getDate()}
      </button>
    </div>
  {/each}
</div>

<style>
  .week { 
    padding: 0;
    margin: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-flow: row;
    -webkit-flex-flow: row;
    justify-content: space-around;
    -ms-grid-column: 1;
    grid-column: 1; 
  }
  .week:nth-child(6n + 1) { 
    -ms-grid-row: 1; 
    grid-row: 1; 
  }
  .week:nth-child(6n + 2) { 
    -ms-grid-row: 2; 
    grid-row: 2; 
  }
  .week:nth-child(6n + 3) { 
    -ms-grid-row: 3; 
    grid-row: 3; 
  }
  .week:nth-child(6n + 4) { 
    -ms-grid-row: 4; 
    grid-row: 4; 
  }
  .week:nth-child(6n + 5) { 
    -ms-grid-row: 5; 
    grid-row: 5; 
  }
  .week:nth-child(6n + 6) { 
    -ms-grid-row: 6; 
    grid-row: 6; 
  }
  .day { 
    margin: 2px;
    color: var(--day-text-color);
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    flex: 1 0 auto;
    height: auto;
    display: flex; 
    flex-basis: 0;
  }
  .day.outside-month, 
  .day.is-disabled { 
    opacity: 0.35;
  }
  .day:before { 
    content: '';
    float: left;
    padding-top: 100%;
  }
  .day--label { 
    color: var(--day-text-color);
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    position: relative;
    border: 1px solid #fff;
    border-radius: 50%; 
    margin: 10%;
    padding: 0;
    align-items: center;
    background: var(--day-background-color);
    cursor: pointer;
    transition: all 100ms linear;
    font-weight: normal;
  }
  .day--label.disabled { 
    cursor: default;
  }
  @media (min-width: 480px) { 
    .day--label.highlighted,
    .day--label:not(.disabled):hover { 
      background: var(--day-highlighted-background-color);
      border-color: var(--day-highlighted-background-color);
      color: var(--day-highlighted-text-color);
    }
  }
  .day--label.shake-date { 
    animation: shake 0.4s 1 linear;
  }
  .day--label.selected:hover,
  .day--label.selected,
  .day--label:active:not(.disabled) { 
    background-color: var(--highlight-color);
    border-color: var(--highlight-color);
    color: #fff;
  }
  .day.is-today .day--label, 
  .day.is-today .day--label:hover { 
    opacity: 1; 
    background: none;
    border-color: var(--highlight-color);
    color: #718096;
  }

  @keyframes shake {
    0% { transform: translate(7px); }
    20% { transform: translate(-7px); }
    40% { transform: translate(3px); }
    60% { transform: translate(-3px); }
    80% { transform: translate(1px); }
    100% { transform: translate(0px); }
  }
</style>
