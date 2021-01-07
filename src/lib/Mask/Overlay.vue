/*
* 全屏遮罩层组件，父组件传入参数为overlayState(控制遮罩层显示状态)、enterAnime(遮罩层显示过渡动画)、leaveAnime(遮罩层隐藏过渡动画)
* 备注：传入的动画值为animate.css的相关类名，必须先加animate类名
*/
<template>
  <div class="overlay_main">
    <div class="overlay"
         v-show="overlayState">
      <div class="pop">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    overlayState: false
  }
}

</script>
<style lang="scss" scoped>
.overlay_main {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;

    .pop {
      width: fit-content;
      height: fit-content;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
}

.roll-enter-active {
  animation: roll-in 0.5s;
}

.roll-leave-active {
  animation: roll-in 0.5s reverse;
}

@keyframes roll-in {
  from {
    top: 100%;
  }

  to {
    top: 0;
  }
}

.fade-enter-active {
  animation: roll-in 0.5s;
}

.fade-leave-active {
  animation: roll-in 0.5s reverse;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
