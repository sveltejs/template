<script context="module">
  import notificationQueue from "../../notification-queue";

  export const notifier = notificationQueue();
</script>

<script>
  import Snackbar from "./Snackbar.svelte";

  export let queue = notifier;
  let message;
  let color = "gray";
  let item;
  let ts;

  $: {
    if (!item) {
      item = $queue[0];
    }

    if (typeof item === "string") {
      message = item;
    } else if (item) {
      message = item.toString();
      color = item.color;
      ts = item.ts;
    }
  }

</script>

<Snackbar
  value={ts}
  hash={ts}
  {color}
  {...item}
  on:finish={() => {
    queue.remove($queue.indexOf(item));
    item = false;
  }}
>
  {message}
</Snackbar>