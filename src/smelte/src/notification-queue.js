import { writable } from "svelte/store";

function withColor(color, store) {
  return message =>
    store.update(u => [
      ...u,
      {
        message,
        ts: new Date(),
        color,
        toString() {
          return message;
        }
      }
    ]);
}

export default function notificationQueue() {
  const store = writable([]);

  return {
    subscribe: store.subscribe,

    notify: withColor("gray", store),
    error: withColor("error", store),
    alert: withColor("alert", store),

    remove: i =>
      store.update(u => {
        u.splice(i, 1);
        return u;
      })
  };
}
