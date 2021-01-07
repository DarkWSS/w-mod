/*
 * 树形图区域样式
 */
<template>
  <div class="tree_area">
    <ul>
      <slot>
        <tree v-for="(tree, index) in treeList"
              :key="index"
              :select-id=selectId
              @select-tree=selectTree
              :tree-data=tree></tree>
      </slot>
    </ul>
  </div>
</template>
<script>
import Tree from './Tree'
export default {
  components: {
    'tree': Tree
  },
  props: {
    treeList: { // 传入数据为对象数组
      type: Array,
      default: () => {
        return []
      }
    },
    selectId: { // 当前选中的菜单ID
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    selectTree (id) { // 树形图点击时的方法
      this.$emit('select-tree', id)
    }
  }
}
</script>
<style lang='scss'>
@import "~style/values";
@import "~style/style";
@mixin select {
  background-color: $gray5;
  color: $blue;
}
.tree_area {
  overflow-y: auto;
  ul {
    @include transition;
    li {
      padding-left: 1rem;
      p {
        height: 2rem;
        line-height: 2rem;
        margin: 0;
        cursor: pointer;
        @include transition;
        &:hover {
          @include select;
        }
      }
      .select_li {
        @include select;
      }
    }
  }
}
</style>