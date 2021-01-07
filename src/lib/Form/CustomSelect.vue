/*
 * 自定义select选择框 
 */
<template>
  <div class="custom_select"
       :class="{'show_select': focus, 'small_select': isSmall}">
    <input type="text"
           :readonly="!allowSearch"
           @focus="showSelect()"
           @blur="hideSelect()"
           @input="searchOption()"
           v-model="keyword"
           :class="{'warn_single': !check.status}"
           :placeholder="placeholder">
    <i class="fa"
       :class="{'focus_icon': focus, 'fa-angle-down': !clear, 'fa-times-circle': clear && !focus}"
       @mouseover="checkAllowClear()"
       @mouseleave="() => {this.clear = false}"
       @click="clearSelect()"></i>
    <p class="warn_msg"
       v-show="!check.status">{{check.text}}</p>
    <ul :style="ulStyle">
      <li v-for="(option, index) in showOptionList"
          :key="index"
          @click="valueSelect(option)">{{option.name}}</li>
      <li class="no_data"
          v-show="showOptionList.length < 1">暂无数据</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      focus: false, // 输入框聚焦状态
      select: this.selected, // 选择的数据
      ulStyle: { // 弹出选择框样式，用于过渡动画
        height: 0,
        overflowY: 'hidden'
      },
      clear: false, // 选择框是否为空的状态，用来判断清空图标是否显示
      keyword: '', // 检索功能的关键字
      check: {
        status: true,
        text: this.selected.id ? '' : 'default'
      },
      showOptionList: this.optionList
    }
  },
  computed: {
    inputValue () {
      return this.select.id
    },
    selectHeight () { // 弹出的选择框的高度，用于动画
      return this.showOptionList.length > 6 ? '12rem' : this.showOptionList.length * 2 + 'rem' // 动态设置选择框高度用于动画
    }
  },
  props: {
    placeholder: { // 默认显示的文本
      type: String,
      default: () => {
        return ''
      }
    },
    name: { // select的name属性，用于表单提交
      type: String,
      default: () => {
        return ''
      }
    },
    optionList: { // 选项列表
      type: Array,
      default: () => {
        return []
      }
    },
    allowClear: { // 是否允许清空选择框
      type: Boolean,
      default: () => {
        return false
      }
    },
    allowSearch: { // 是否允许进行选择框关键字检索
      type: Boolean,
      default: () => {
        return false
      }
    },
    isSmall: { // 是否为小选择框，主要用于其他组件
      type: Boolean,
      default: () => {
        return false
      }
    },
    selected: { // 传入的默认选中的值
      type: String,
      default: ''
    }
  },
  methods: {
    showSelect () { // 打开选择框
      this.focus = true;
      const _this = this
      this.ulStyle = {
        height: this.selectHeight,
        overflowY: 'hidden'
      }
      setTimeout(() => {
        _this.ulStyle = {
          height: this.selectHeight,
          overflowY: 'auto'
        }
      }, 500);
      if (this.allowSearch) { // 如果允许关键字检索，关键字永远是被选中的name
        this.keyword = this.select.name
        this.searchOption()
      }
    },
    hideSelect () { // 关闭选择框
      setTimeout(() => {
        this.focus = false;
        this.ulStyle = {
          height: 0,
          overflowY: 'hidden'
        }
        if (this.allowSearch && this.keyword != this.select.name) { // 如果允许关键字检索而且关键字并不是有效值的情况下，清空选择的内容
          this.keyword = ''
          this.select = {
            name: null,
            id: null
          }
        }
        this.check = {
          status: true,
          text: ''
        }
        if (Boolean(this.$parent.$options.propsData.notNull) && !this.select.id) {
          this.check = {
            status: false,
            text: '不可为空'
          }
        }
      }, 167);
    },
    valueSelect (option) { // 点击某一选项，进行传值
      this.select = option
      this.keyword = this.select.name
      this.$emit('on-change', option)
    },
    checkAllowClear () { // 检查当前是否已清空
      if (!this.focus && this.allowClear && this.select.name) {
        this.clear = true
      }
    },
    clearSelect () { // 清空选择的内容
      if (!this.focus && this.clear) {
        this.select = {
          name: null,
          id: null
        }
        this.clear = false
        this.keyword = ''
        this.searchOption()
        const propsData = this.$parent.$options.propsData
        if (propsData && propsData.notNull) {
          this.check = {
            status: false,
            text: '不可为空'
          }
        }
      }
    },
    searchOption () { // 检索选项
      if (this.keyword.length > 0) {
        this.showOptionList = this.optionList.filter(option => option.name.indexOf(this.keyword) > -1)
      } else {
        this.showOptionList = this.optionList
      }
      if (this.showOptionList.length < 1) {
        this.ulStyle = {
          height: '2rem',
          overflowY: 'auto'
        }
      } else {
        this.ulStyle = {
          height: this.selectHeight,
          overflowY: 'auto'
        }
      }

    }
  },
  mounted () {
    if (this.selected) { // 获取并设置默认值
      this.select = this.optionList.filter(option => option.id == this.selected)[0]
      this.keyword = this.select.name
      if (this.keyword.length > 0) {
        this.check = {
          status: true,
          text: ''
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.custom_select {
  display: inline-block;
  position: relative;
  i {
    height: $form-height;
    line-height: $form-height;
    color: $select-i;
    position: absolute;
    right: 1rem;
    top: 0;
    @include transition;
  }
  .fa-times-circle {
    cursor: pointer;
  }
  .focus_icon {
    transform: rotateZ(180deg);
  }
  input {
    padding-right: 2rem;
    @include no_warp_hide;
  }
  ul {
    width: 100%;
    position: absolute;
    background-color: $white;
    z-index: 1;
    box-shadow: $box-shadow;
    max-height: 12rem;
    overflow-y: hidden;
    padding: 0;
    margin: 0;
    @include transition;
    li {
      height: 2rem;
      line-height: 2rem;
      list-style-type: none;
      cursor: pointer;
      padding: 0 0.8rem;
      @include transition;
      &:hover {
        color: $blue;
      }
    }
    .no_data {
      text-align: center;
      color: $gray4;
    }
  }
}
.small_select {
  input {
    width: 100%;
    height: 2rem;
    border: 0;
    background-color: transparent;
    color: $gray4;
  }
  i {
    height: 2rem;
    line-height: 2rem;
  }
  ul {
    width: fit-content;
    min-width: 100%;
    li {
      white-space: nowrap;
    }
  }
}
</style>