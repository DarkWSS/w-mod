/*
 * 表单顶部提示文字
 */
<template>
  <div class="form_notice">
    <i class="fa fa-info-circle"></i>
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.form_notice {
  height: 3rem;
  line-height: 3rem;
  padding: 0 1rem;
  margin: auto;
  border-radius: $radius;
  font-weight: bold;
  border: $border $blue;
  background-color: transparentize($blue, 0.9);
  i {
    color: $blue;
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
  span {
    display: inline-block;
    @include no_warp;
    color: $black;
  }
}
</style>