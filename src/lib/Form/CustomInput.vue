/*
 * 自定义input输入框
 */
<template>
  <div class="custom_input"
       @keyup.enter="bindEnter()">
    <input :type="type"
           :placeholder="placeholder"
           v-model="inputValue"
           :readonly="readonly"
           @blur="checkInput"
           @input="inputLimits"
           :class="{'warn_single': !check.status}"
           :name="name">
    <i :class="icon"
       v-if="icon"
       @click="iconClick()"></i>
    <p class="warn_msg"
       v-show="!check.status">{{check.text}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      check: {
        status: true,
        text: this.value ? '' : 'default'
      },
      inputValue: this.value
    }
  },
  props: {
    type: { // 输入框类型
      type: String,
      default: () => {
        return 'text'
      }
    },
    placeholder: { // 输入框默认显示文字
      type: String,
      default: () => {
        return ''
      }
    },
    name: { // 输入框name，用于form表单提交
      type: String,
      default: () => {
        return ''
      }
    },
    icon: { // 右侧图标，没有则不显示
      type: String,
      default: () => {
        return ''
      }
    },
    value: { // 初始值
      type: String,
      default: () => {
        return ''
      }
    },
    readonly: { //只读
      type: Boolean,
      default: () => {
        return false
      }
    },
    maxlength: { // 最大长度
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  methods: {
    iconClick () { // 图标点击事件
      this.$emit('icon-click')
    },
    bindEnter () { // 回车键点击事件
      this.$emit('bind-enter')
    },
    checkInput () { // 输入框输入验证
      this.check = {
        status: true,
        text: ''
      }
      const propsData = this.$parent.$options.propsData
      if (propsData && propsData.notNull && this.inputValue.length < 1) {
        this.check = {
          status: false,
          text: '不可为空'
        }
      } else if (this.type === 'cell_phone' && this.inputValue.length < 11) {
        this.check = {
          status: false,
          text: '手机号码长度为11位'
        }
      }
      this.$emit('update:value', this.inputValue)
    },
    inputLimits () {
      const maxlength = parseInt(this.maxlength)
      if (this.type === 'cell_phone') { // 手机号码输入验证
        this.inputValue = this.inputValue.replace(/[\D]/g, '').substring(0, 11)
      }
      if (!isNaN(maxlength) && maxlength > 0) { // 长度验证
        this.inputValue = this.inputValue.substring(0, this.maxlength)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
.custom_input {
  position: relative;
  i {
    position: absolute;
    height: $form-height;
    line-height: $form-height;
    color: $gray1;
    right: 1rem;
  }
}
</style>