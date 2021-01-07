/*
 * 表单每一列的样式 
 */
<template>
  <div class="form_row"
       :class="{'not_null': notNull}">
    <p v-if="name">
      <i v-if="notNull">*</i>
      <span>{{name}}</span>
    </p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    notNull: { // 是否不可为空
      type: Boolean,
      default: false
    },
    name: { // 左侧表单元素的名称
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='scss' scoped>
.form_row {
  display: flex;
  margin-top: 1.8rem;
  padding: 0 5rem;
  justify-content: center;
  p {
    height: 3rem;
    line-height: 3rem;
    padding-right: 1rem;
    flex: 1;
    text-align: right;
    margin: 0;
    i {
      color: #ff0000;
      padding-right: 0.5rem;
    }
  }
}
</style>