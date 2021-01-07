/*
 * 选项卡 
 */
<template>
  <div class="tabs">
    <div class="tab"
         v-for="(tab, index) in tabList"
         :key="index"
         @click="chooseTab(index)"
         :class="{'select_tab': selectTab === index}">{{tab}}</div>
  </div>
</template>
<script>
export default {
  props: {
    selectTab: { // 当前选中的选项卡
      type: Number,
      default: 0
    },
    tabList: { // 选项卡列表
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    chooseTab (index) { // 点击选择当前选项卡
      this.$emit('choose-tab', index)
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.tabs {
  @include flex;
  .tab {
    height: 2.6rem;
    color: $gray4;
    border-bottom: 2px solid transparent;
    margin-right: 4rem;
    cursor: pointer;
    @include transition;
  }
  .select_tab {
    color: $black;
    border-color: $blue;
    font-weight: bold;
  }
}
</style>