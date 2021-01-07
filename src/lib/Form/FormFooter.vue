/*
 * 表单底部两个按钮 
 */
<template>
  <div class="form_footer">
    <button class="default_btn"
            @click="back()">{{backBtn}}</button>
    <button class="blue_btn"
            @click="confirm()"
            :disabled=disabled>{{confirmBtn}}</button>
  </div>
</template>
<script>
export default {
  props: {
    backBtn: { // 左侧按钮显示文字
      type: String,
      default: () => {
        return '返回'
      }
    },
    confirmBtn: { // 右侧按钮显示文字
      type: String,
      default: () => {
        return '提交'
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    back () { // 左侧按钮点击事件
      this.$emit('back')
    },
    confirm () { // 右侧按钮点击事件
      this.$emit('confirm')
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/style";
.form_footer {
  @include flex_rule_center;
  margin-top: 6rem;
  button {
    margin: 0 1rem;
  }
}
</style>