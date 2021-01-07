/*
 * 纯数字输入框，输入范围为自然数
 */
<template>
  <div class="number_input">
    <div class="number_area">
      <i class="fa fa-minus"
         :class="{'disabled': inputValue == this.min}"
         @click="minusNumber"></i>
      <input type="text"
             :name="name"
             @input="inputValidation($event)"
             @blur="checkEmpty($event)"
             v-model="inputValue">
      <i class="fa fa-plus"
         :class="{'disabled': inputValue == this.max}"
         @click="plusNumber"></i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputValue: this.initialValue
    }
  },
  props: {
    name: { // name属性，用于表单提交
      type: String,
      default: ''
    },
    initialValue: { // 初始值
      type: Number,
      default: 0
    },
    min: { // 最小值
      type: Number,
      default: 0
    },
    max: { // 最大值
      type: Number,
      default: 100
    }
  },
  methods: {
    minusNumber () { // 数字减小
      if (this.inputValue > this.min) {
        this.inputValue--
      }
    },
    plusNumber () { // 数字增加
      if (this.inputValue < this.max) {
        this.inputValue++
      }
    },
    inputValidation (e) { // 手动输入时的表单验证
      const value = e.target.value
      if (value.length > 0 && value != "-") {
        let vaildNumber = parseInt(value.replace(/[^\-\d]/g, '').replace(/\-{2,}/g, ''))
        this.inputValue = Number.isNaN(vaildNumber) ? this.min : vaildNumber
        if (this.inputValue > this.max) {
          this.inputValue = this.max
        } else if (this.inputValue < this.min) {
          this.inputValue = this.min
        }
      }
    },
    checkEmpty (e) { // 手动输入时的表单验证
      const value = e.target.value
      if (value.length < 1 || value == "-") {
        this.inputValue = this.min
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.number_input {
  width: $form-width;
  height: $form-height;
  .number_area {
    width: fit-content;
    border: $border $gray1;
    border-radius: $radius;
    @include flex_vertical_center;
  }
  i {
    width: $form-height;
    height: $form-height;
    line-height: $form-height;
    text-align: center;
  }
  .disabled {
    background-color: $gray1;
    color: $white;
    border-color: $gray1;
    cursor: not-allowed;
  }
  input {
    text-align: center;
    width: 10rem;
    outline: none;
    border: {
      top: 0;
      bottom: 0;
      radius: 0;
    }
    &:hover,
    &:focus {
      border-color: $gray1;
    }
  }
}
</style>