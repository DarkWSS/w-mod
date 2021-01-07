/**
* 移动端顶部标题栏组件，包含左侧按钮、中部标题、右侧可选按钮，默认均垂直居中
*/
<template>
  <div class="main">
    <div class="header_area">
      <div class="side left">
        <slot name="left"></slot>
      </div>
      <div class="center">
        <h3>{{center}}</h3>
      </div>
      <div class="side right">
        <slot name='right'></slot>
      </div>
    </div>
    <div class="occupy"></div>
  </div>
</template>
<script>
export default {
  props: {
    center: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  .header_area {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    .side {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      height: fit-content;
    }
    .left {
      left: 0;
    }
    .center {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      position: absolute;
      h3 {
        margin: 0;
      }
    }
    .right {
      right: 0;
    }
  }
  .occupy {
    height: 40px;
  }
}
</style>
