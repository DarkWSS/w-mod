/*
 * 自定义弹窗消息组件
 */
<template>
  <div
    id="toastMsg"
    class="toast_main"
  >
    <p
      :style="toastStyle"
      :class="[site, animate]"
    >
      <i :class="icon"></i>
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '', // 传入消息内容
      site: 'bottom', // 弹窗位置，可选top|center|bottom，默认bottom
      animate: '', // 执行的动画
      // animateIn: 'animated fadeIn', // 传入animate.css动画类
      // animateOut: 'animated fadeOut', // 传入animate.css动画类
      icon: '', // 传入font-awesome图标类
      toastStyle: '', // 自定义弹窗style
      duration: 1200
    }

  },
  methods: {
    showToast(option) {
      this.text = option.text || ''
      this.site = option.site || 'bottom'
      this.animate = option.animateIn || 'animated fadeIn'
      this.icon = option.icon || ''
      this.toastStyle = option.toastStyle || ''
      this.duration = option.duration || 1200
      setTimeout(() => {
        this.animate = option.animateOut || 'animated fadeOut'
        setTimeout(() => {
          document.body.removeChild(document.getElementById('toastMsg'))
        }, 1200)
      }, this.duration)
    }
  }
}
</script>

<style lang="scss" scoped>
.toast_main {
  p {
    width: fit-content;
    height: fit-content;
    padding: 5px 15px;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
    color: #fff;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
  }
  .top {
    top: 20px;
  }
  .center {
    top: 0;
    bottom: 0;
  }
  .bottom {
    bottom: 20px;
  }
}
</style>
