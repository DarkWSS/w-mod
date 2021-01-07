/*
 * 单项选择，模拟checkbox
 */
<template>
  <div class="check_box">
    <div class="check"
         v-for="(check, index) in checkList"
         :key="index"
         @click="checkThis(check.value)"
         :class="{'check_box_checked': check.value===inputValue}">
      <div class="circle">
        <div class="point"></div>
      </div>
      <p>{{check.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputValue: this.checkValue
    }
  },
  props: {
    name: { // name参数，用于表单提交
      type: String,
      default: ''
    },
    checkList: { // 选项数组
      type: Array,
      default: () => {
        return []
      }
    },
    checkValue: { // 默认选中值
      type: String,
      default: ''
    }
  },
  mounted () {
    if (!this.checkValue) { // 未传入默认选中值默认选项数组第一项
      this.checkThis(this.checkList[0].value)
    }
  },
  methods: {
    checkThis (check) { // 点击选项选中当前值
      this.inputValue = check
      this.$emit('update:checkValue', check)
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.check_box {
  width: $form-width;
  height: $form-height;
  @include flex_vertical_center;
  input {
    display: none;
  }
  .check {
    cursor: pointer;
    margin-right: 4rem;
    @include flex_vertical_center;
    .circle {
      width: 1rem;
      height: 1rem;
      border-radius: $radius-circle;
      border: $border $gray1;
      margin-right: 0.5rem;
      @include flex_center;
      .point {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: $radius-circle;
      }
    }
  }
  .check_box_checked {
    .circle {
      border-color: $blue;
      .point {
        background-color: $blue;
      }
    }
  }
}
</style>