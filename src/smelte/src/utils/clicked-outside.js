import { writable } from "svelte/store";

export default function clickedOutside() {
  if (!window) return writable(false);

  const store = writable(false);

  return {
    subscribe: store.subscribe,
    action: function(node) {
      const onClick = ({ target }) => store.set(!node.contains(target));

      window.addEventListener("click", onClick);

      return {
        destroy: () => window.removeEventListener("click", onClick)
      };
    }
  };
}
