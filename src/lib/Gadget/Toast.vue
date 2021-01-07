/*
 * 自定义弹窗消息组件
 */
<template>
  <div v-if="status"
       class="toast_main">
    <p :style="toastStyle"
       :class="type">
      <i class="fa"
         :class="icon"></i>
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '', // 文本
      type: '', // 消息类型
      icon: '', // 类型对应图标
      status: false // 是否显示
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~style/values";
.toast_main {
  p {
    width: fit-content;
    height: fit-content;
    padding: 0.5rem 1rem;
    border-radius: $radius;
    background-color: $white;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 4rem;
    color: $black;
    box-shadow: $box-shadow;
  }
  i {
    padding-right: 0.8rem;
    font-size: 1rem;
  }
  .warn {
    i {
      color: $yellow;
    }
  }
  .success {
    i {
      color: $green;
    }
  }
  .error {
    i {
      color: $orangered;
    }
  }
}
</style>
