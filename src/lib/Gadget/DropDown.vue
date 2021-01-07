/*
 * 下拉菜单 
 */
<template>
  <div class="drop_down">
    <slot></slot>
    <ul class="drop_menu"
        :style="{height: show ? menuHeight : 0}">
      <li v-for="(menu, index) in menuList"
          :key="index"
          @click="selectMenu(index)">{{menu}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuHeight: 0, // 菜单区高度
      show: false // 菜单显示状态
    }
  },
  props: {
    menuList: { // 菜单列表
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    openMenu () { // 打开下拉菜单
      this.show = !this.show
    },
    selectMenu (index) { // 选择菜单操作
      this.show = false
      this.$emit('select-menu', index)
    }
  },
  mounted () {
    this.menuHeight = (this.menuList.length * 2) + 'rem' // 动态设置下拉框高度用于动画
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.drop_down {
  position: relative;
  display: inline-block;
  .drop_menu {
    width: fit-content;
    position: absolute;
    left: 0;
    height: 0;
    overflow: hidden;
    min-width: 100%;
    background-color: $white;
    padding: 0 0.5rem;
    box-shadow: $box-shadow;
    @include transition;
    z-index: 1;
    li {
      height: 2rem;
      line-height: 2rem;
      @include transition;
      @include no_warp;
      cursor: pointer;
      &:hover {
        color: $blue;
      }
    }
  }
}
</style>