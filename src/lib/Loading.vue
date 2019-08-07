<template>
  <div class="loading_main">
    <overlay :overlayState="overlayState">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        height="66"
        width="66"
      >
        <circle
          cx="33"
          cy="33"
          r="30"
          stroke="#ccc"
          fill="rgba(0, 0, 0, 0)"
          stroke-width="3"
        ></circle>
        <line
          x1="33"
          y1="33"
          x2="33"
          y2="17"
          style="fill: none; stroke:#ccc"
          stroke-width="3"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 33 33"
            to="360 33 33"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="33"
          y1="33"
          x2="33"
          y2="20"
          style="fill: none; stroke:#ccc"
          stroke-width="3"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 33 33"
            to="360 33 33"
            dur="6s"
            repeatCount="indefinite"
          />
        </line>
      </svg>
    </overlay>
  </div>
</template>

<script>
import Overlay from './Overlay'
export default {
  components: {
    Overlay
  },
  props: {
    overlayState: false
  }
}
</script>

<style lang="scss" scope>
</style>
