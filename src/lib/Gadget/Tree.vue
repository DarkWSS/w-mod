/*
 * 递归组件生成多层树形图
 */
<template>
  <li>
    <p :class="{'select_li': selectId === treeData.id}">
      <i class="fa"
         :class="[show ? 'fa-minus-square-o' : 'fa-plus-square-o']"
         @click="toggleUl"
         v-if="treeData.child"></i>
      <span @click="selectLi(treeData.id)"
            :class="{'last_tree': !treeData.child}">{{treeData.name}}</span>
    </p>

    <ul v-if="treeData.child"
        :style="ulStyle">
      <tree v-for="(tree, index) in treeData.child"
            :key="index"
            :select-id=selectId
            @select-tree=selectLi
            :tree-data=tree></tree>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'Tree',
  data () {
    return {
      show: false, // 下级菜单是否显示
      ulHeight: 0, // 下级菜单高度
      ulStyle: { // 下级菜单样式
        'height': 0,
        'overflow-y': 'hidden'
      }
    }
  },
  props: {
    treeData: { // 渲染数据
      type: Object,
      default: () => {
        return {}
      }
    },
    selectId: { // 选中ID
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    toggleUl () { // 切换下级菜单显示状态调整菜单样式完善过渡动画效果
      this.show = !this.show
      const _this = this
      if (this.treeData.child) {
        if (this.show) {
          this.ulStyle = {
            'height': this.ulHeight + 'rem',
            'overflow-y': 'hidden'
          }
          setTimeout(() => {
            _this.ulStyle = {
              'height': 'auto',
              'overflow-y': 'auto'
            }
          }, 500)
        } else {
          this.ulStyle = {
            'height': this.ulHeight + 'rem',
            'overflow-y': 'auto'
          }
          setTimeout(() => {
            _this.ulStyle = {
              'height': 0,
              'overflow-y': 'hidden'
            }
          }, 100)
        }
      }
    },
    selectLi (id) { // 点击对应li触发对应方法
      this.$emit('select-tree', id)
    }
  },
  mounted () {
    if (this.treeData.child) { // 计算下层菜单高度用于动画
      this.ulHeight = this.treeData.child.length * 2
    }
  }
}
</script>
<style lang='scss' scoped>
.last_tree {
  padding-left: 1rem;
}
</style>