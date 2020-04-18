<script>
  import { onMount, createEventDispatcher, tick } from 'svelte';

  const dispatch = createEventDispatcher();

  let once = (el, evt, cb) => {
    function handler() {
      cb.apply(this, arguments);
      el.removeEventListener(evt, handler);
    }
    el.addEventListener(evt, handler);
  };

  let popover;
  let w;
  let triggerContainer;
  let contentsAnimated;
  let contentsWrapper;
  let translateY = 0;
  let translateX = 0;

  export let open = false;
  export let shrink;
  export let trigger;
  export const close = () => {
    shrink = true;
    once(contentsAnimated, 'animationend', () => {
      shrink = false;
      open = false;
      dispatch('closed');
    });
  };

  function checkForFocusLoss(evt) {
    if (!open) return;
    let el = evt.target;
    // eslint-disable-next-line
    do {
      if (el === popover) return;
    // eslint-disable-next-line
    } while (el = el.parentNode);
    close();
  }

  onMount(() => {
    document.addEventListener('click', checkForFocusLoss);
    if (!trigger) return;
    triggerContainer.appendChild(trigger.parentNode.removeChild(trigger));

    // eslint-disable-next-line
    return () => {
      document.removeEventListener('click', checkForFocusLoss);
    };
  });

  const getDistanceToEdges = async () => {
    if (!open) { open = true; }
    await tick();
    let rect = contentsWrapper.getBoundingClientRect();
    return {
      top: rect.top + (-1 * translateY),
      bottom: window.innerHeight - rect.bottom + translateY,
      left: rect.left + (-1 * translateX),
      right: document.body.clientWidth - rect.right + translateX
    };
  };

  const getTranslate = async () => {
    let dist = await getDistanceToEdges();
    let x; let
      y;
    if (w < 480) {
      y = dist.bottom;
    } else if (dist.top < 0) {
      y = Math.abs(dist.top);
    } else if (dist.bottom < 0) {
      y = dist.bottom;
    } else {
      y = 0;
    }
    if (dist.left < 0) {
      x = Math.abs(dist.left);
    } else if (dist.right < 0) {
      x = dist.right;
    } else {
      x = 0;
    }
    return { x, y };
  };

  const doOpen = async () => {
    const { x, y } = await getTranslate();

    translateX = x;
    translateY = y;
    open = true;

    dispatch('opened');
  };
</script>

<svelte:window bind:innerWidth={w} />
<div class="sc-popover" bind:this={popover}>
  <div class="trigger" on:click={doOpen} bind:this={triggerContainer}>
    <slot name="trigger">
    </slot>
  </div>
  <div 
    class="contents-wrapper" 
    class:visible={open}
    class:shrink={shrink}
    style="transform: translate(-50%,-50%) translate({translateX}px, {translateY}px)" 
    bind:this={contentsWrapper}>
    <div class="contents" bind:this={contentsAnimated}>
      <div class="contents-inner">
        <slot name="contents"></slot>
      </div>
    </div>
  </div>
</div>

<style>
  .sc-popover { 
    position: relative;
  }

  .contents-wrapper { 
    transform: translate(-50%, -50%); 
    position: absolute;
    top: 50%; 
    left: 50%; 
    transition: none;
    z-index: 2;
    display: none;
  }

  .contents { 
    background: #1a202c;
    box-shadow: 0px 10px 26px rgba(0,0,0,0.4) ;
    opacity: .8; 
    padding-top: 0;
    display: none;
    animation: grow 200ms forwards cubic-bezier(.92,.09,.18,1.05);
  }

  .contents-inner { 
    animation: fadeIn 400ms forwards;
  }

  .contents-wrapper.visible { 
    display: block;
  }

  .contents-wrapper.visible .contents { 
    opacity: 1; 
    transform: scale(1);
    display: block;
  }

  .contents-wrapper.shrink .contents { 
    animation: shrink 150ms forwards cubic-bezier(.92,.09,.18,1.05);
  }

  @keyframes grow { 
    0% { 
      transform: scale(.9,.1); 
      opacity: 0; 
    }
    30% { 
      opacity: 1; 
    }
    100% { 
      transform: scale(1);
    }
  }

  @keyframes shrink { 
    0% { 
      transform: scale(1); 
      opacity: 1; 
    }
    70% { 
      opacity: 1; 
    }
    100% { 
      opacity: 0; 
      transform: scale(.9,.1);
    }
  }

  @keyframes fadeIn { 
    0% { 
      opacity: 0; 
    }
    50% { 
      opacity: 0;
    }
    100% { 
      opacity: 1; 
    }
  }
</style>
