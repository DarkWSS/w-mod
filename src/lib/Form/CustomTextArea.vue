/*
 * 自定义文本输入框 
 */
<template>
  <div class="custom_textarea">
    <textarea :placeholder="placeholder"
              :name="name"
              v-model="inputValue"
              @blur="checkInput"
              :class="{'warn_single': !check.status}"
              :maxlength="maxlength">
    </textarea>
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
    placeholder: { // 默认显示的文本
      type: String,
      default: () => {
        return ''
      }
    },
    name: { // name用于表单提交
      type: String,
      default: () => {
        return ''
      }
    },
    maxlength: { // 最大输入长度
      type: Number,
      default: () => {
        return 1000
      }
    },
    value: { // 初始值
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
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
      }
      this.$emit('update:value', this.inputValue)
    }
  }
}
</script>
<style lang='scss' scoped>
.custom_textarea {
  position: relative;
}
</style>