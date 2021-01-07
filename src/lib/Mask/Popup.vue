/*
 * 弹窗
 */
<template>
  <div class="mask"
       v-show="show">
    <div class="mask_area">
      <div class="header">
        <div class="title">{{title}}</div>
        <div class="close"
             @click="() => {this.show = false}">
          <i class="fa fa-close"></i>
        </div>
      </div>
      <div class="content">
        <slot></slot>
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
      show: false // 弹窗是否显示
    }
  },
  props: {
    title: { // 标题
      type: String,
      default: () => {
        return ''
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
    }
  },
  methods: {
    openMask () { // 打开弹窗
      this.show = true
    },
    closeMask () { // 关闭弹窗
      this.show = false
    },
    back () { // 点击返回按钮触发的方法
      this.$emit('back')
      this.closeMask()
    },
    confirm () { // 点击确定按钮触发的方法
      this.$emit('confirm')
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.mask {
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
    .header {
      height: 4rem;
      padding: 0 2rem;
      @include flex_between;
      @include flex_vertical_center;
      border-bottom: $border $gray6;
      .title {
        font: {
          size: 1.4rem;
          weight: bold;
        }
      }
      .close {
        cursor: pointer;
        color: $select-i;
      }
    }
    .content {
      max-width: calc(100vw - 10rem);
      max-height: calc(100vh - 10rem);
      overflow-y: auto;
    }
    .footer {
      padding: 1rem 2rem;
      text-align: right;
      border-top: $border $gray6;
      button {
        margin-left: 2rem;
      }
    }
  }
}
</style>