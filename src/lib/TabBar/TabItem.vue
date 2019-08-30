/**
* 选项卡内容组件，由一个固定高度的div包裹内容，防止因div等长导致的内容高度远小于div高度
*/
<template>
  <div class="tab_item" :style="{height: height}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: ''
    }
  },
  mounted() {
    this.height = document.querySelector(".tab_main").clintHeight - document.querySelector(".tab_list").clintHeight + 'px'
  }
}

</script>
<style lang='scss' scope>
.tab_item {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

</style>
