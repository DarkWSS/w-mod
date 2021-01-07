/*
 * 将页面除全局遮罩层外的元素包含其中，可在全局遮罩层弹出时保证这些内容不可滑动
 */
<template>
  <div class="scroll_main">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.scroll_main {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  top: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
