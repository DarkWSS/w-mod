/*
 * 表单区域样式与居中设置 
 */
<template>
  <div class="form_area">
    <div class="form_position">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    checkForm () { // 用于检查表单，判断所有需要验证的输入框内容是否全部通过，完全通过会返回formData用于提交，否则会返回false
      let formData = new FormData()
      let failCount = 0
      this.$children.forEach(child => {
        const children = child.$children[0]
        if (child.$children.length > 0) {
          const props = children.$options.propsData
          if (child.$options.propsData.notNull && children.check && ((children.check.status && children.check.text.length > 0) || !children.check.status)) { // 判断当前文件非空并且验证数据保持初始化状态
            children.check = {
              status: false,
              text: ''
            }
            failCount++
          } else if (props.name && children.inputValue) {
            formData.append(props.name, children.inputValue)
          }
        }
      })
      if (failCount > 0) {
        return false
      }
      return formData
    }
  }
}
</script>
<style lang='scss' scoped>
.form_area {
  padding-top: 4px;
  padding-bottom: 3rem;
  display: flex;
  justify-content: center;
  .form_position {
    width: fit-content;
  }
}
</style>