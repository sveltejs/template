<script>
  export let progress = null;
  export let color = "primary";
  export let width = 3;
  export let size = 70;

  $: style = progress > 0 ? `
      animation: none;
      stroke-dasharray: ${150000 - progress * 1000};
      stroke-dashoffset: -${124 - (progress * 124) / 100};
    ` : "";
</script>

<style>
  .circular {
    animation: rotate 2s linear infinite;
    position: relative;
  }

  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124;
    }
  }
</style>

<svg class="circular" style="width: {size}px; height: {size}px;">
  <circle
    class="path stroke-{color}"
    cx={size / 2}
    cy={size / 2}
    fill="none"
    r={(size / 2) - (size / 5)}
    stroke-width={width}
    stroke-miterlimit="10"
    {style} />
</svg>
