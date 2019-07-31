<template>
  <div class="main">
    <div class="overlay">
      <slot
        name="pop"
        class="pop"
      ></slot>
    </div>
    <slot
      name="page"
      class="page"
    ></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  position: relative;
  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .pop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  .page {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
