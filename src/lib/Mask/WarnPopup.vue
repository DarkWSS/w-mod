/*
 * 确认弹窗 
 */
<template>
  <div class="warn_mask"
       v-show="show">
    <div class="mask_area">
      <div class="title"
           v-if="title">
        <i class="fa fa-exclamation-triangle"></i>
        {{title}}
      </div>
      <div class="close"
           v-if="allowClose"
           @click="() => {this.show = false}">
        <i class="fa fa-close"></i>
      </div>
      <div v-if="msg"
           class="msg">{{msg}}</div>
      <div class="spinner"
           v-if="loading">
        <i class="fa fa-spinner fa-pulse"></i>
      </div>
      <div class="footer">
        <button v-if="backBtn"
                class="default_btn mini_btn"
                @click="back()">{{backBtn}}</button>
        <button v-if="confirmBtn"
                class="blue_btn mini_btn"
                @click="confirm()">{{confirmBtn}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false // 弹窗显示状态
    }
  },
  props: {
    title: { // 标题
      type: String,
      default: () => {
        return ''
      }
    },
    msg: { // 提示消息
      type: String,
      default: () => {
        return ''
      }
    },
    loading: { // loading动画
      type: Boolean,
      default: () => {
        return false
      }
    },
    backBtn: { // 返回按钮
      type: String,
      default: () => {
        return null
      }
    },
    confirmBtn: { // 确认按钮
      type: String,
      default: () => {
        return null
      }
    },
    allowClose: { // 是否允许手动关闭弹窗
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  methods: {
    openMask () { // 打开弹窗
      this.show = true
    },
    closeMask () { // 关闭弹窗
      this.show = false
    },
    back () { // 返回按钮操作
      this.$emit('back')
      this.closeMask()
    },
    confirm () { // 确认按钮操作
      this.$emit('confirm')
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.warn_mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  @include flex_center;
  .mask_area {
    width: fit-content;
    position: relative;
    background-color: $white;
    box-shadow: $box-shadow;
    border-radius: $radius;
    padding: 1.5rem;
    .title {
      font: {
        size: 1.4rem;
        weight: bold;
      }
      height: 4rem;
      @include flex_center;
      i {
        color: $yellow;
        font-size: 1.8rem;
        margin-right: 1rem;
      }
    }
    .close {
      position: absolute;
      top: 1rem;
      right: 1.2rem;
      cursor: pointer;
      color: $select-i;
    }
    .msg {
      width: 30rem;
      font-size: 1.2rem;
      text-align: center;
      margin: {
        top: 1rem;
        bottom: 2rem;
      }
    }
    .spinner {
      color: $blue;
      text-align: center;
      i {
        font-size: 2rem;
      }
    }
    .footer {
      margin-top: 2rem;
      text-align: center;
      button {
        margin: 0 1rem;
      }
    }
  }
}
</style>