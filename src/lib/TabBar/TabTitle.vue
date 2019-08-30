/**
* 单独选项卡标题组件，包含标题图标与标题内容，不传入则不显示
*/
<template>
  <div class="tab_title">
    <i :class="tabTitle.icon" v-if="tabTitle.icon && tabTitle.icon.length > 0"></i>
    <span v-if="tabTitle.name && tabTitle.name.length > 0">{{tabTitle.name}}</span>
  </div>
</template>
<script>
export default {
  props: {
    tabTitle: {
      icon: '',
      name: ''
    }
  }
}

</script>
<style lang="scss" scope>
.tab_title {
  width: fit-content;
  height: 40px;
  line-height: 40px;
  padding: 5px 10px;
  font-size: 14px;

  i {
    margin-right: 5px;
  }

  span {
    display: inline-block;
  }
}

</style>
