/*
 * 时间选择器，使用了laydate 
 */
<template>
  <div class="data_select">
    <input :id="elemId"
           placeholder="请选择时间"
           v-model="inputValue"
           readonly
           :class="{'warn_single': !check.status}"
           :name="name">
    <i class="fa fa-calendar"></i>
    <p class="warn_msg"
       v-show="!check.status">{{check.text}}</p>
  </div>
</template>
<script>
import laydate from 'layui-laydate'
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
    name: { // name，用于表单提交
      type: String,
      default: ''
    },
    elemId: { // 设置元素ID用于laydate的elem设置
      type: String,
      default: ''
    },
    dateOption: { // 时间插件设置
      type: Object,
      default: () => {
        return {}
      }
    },
    value: { // 默认初始值
      type: String,
      default: ''
    }
  },
  mounted () {
    this.dateOption['theme'] = '#348af4' // 强制配置颜色
    this.dateOption['done'] = value => { // 调用laydate完成的回调
      this.inputValue = value
      this.$emit('update:value', value)
      this.checkInput()
    }
    if (this.value) {
      this.dateOption['value'] = this.value
    }
    laydate.render(this.dateOption); // 执行laydate配置
  },
  methods: {
    checkInput () { // 时间选择完成后检查是否填写
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
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
.data_select {
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