export function hideListAction(node, cb) {
  const onWindowClick = e => {
    if (!node.contains(e.target)) {
      cb();
    }
  };

  window.addEventListener("click", onWindowClick);

  return {
    destroy: () => {
      window.removeEventListener("click", onWindowClick);
    }
  };
}
