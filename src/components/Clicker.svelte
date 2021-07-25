<script lang="ts">
let clicks: number = 0;

function handleClick(): void {
  clicks += 1;
  console.log('Incremented successfully ' + clicks + ' times.')
}
</script>

<button on:click={handleClick}>
  Increment
</button>

<style>

</style>