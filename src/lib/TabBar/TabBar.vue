/**
* 选项卡组件，包含选项卡标题和选项卡内容，其中标题是传入包含icon与name的对象数组，选项卡则是slot
*/
<template>
  <div class="tab_main" :style="{width: tabWidth, height: tabHeight}">
    <div class="tab_list">
      <tab-title v-for="(title, index) in titleList" :tabTitle='title' :key="index" :class="index === chooseIndex ? 'choose_title' : ''" @click.native="chooseTabBar(index)"></tab-title>
    </div>
    <div class="tab_area">
      <div class="tab_area_scroll" :style="{width: width}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import TabTitle from './TabTitle'
import anime from 'animejs/lib/anime.es.js'
export default {
  props: {
    titleList: {
      type: Array,
      default: []
    },
    tabWidth: {
      type: String,
      default: document.body.clientWidth + 'px'
    },
    tabHeight: {
      type: String,
      default: document.body.clientHeight + 'px'
    }
  },
  data() {
    return {
      width: {
        type: String,
        default: '100%'
      },
      chooseIndex: 0
    }
  },
  mounted() {
    this.width = document.getElementsByClassName('tab_item').length + '00%' // 根据选项卡数量设置选项卡滚动区域宽度
    let scroll = document.querySelector('.tab_area') // 获取选项卡显示区域
    let outerScroller = document.querySelector('.tab_area_scroll') // 获取选项卡滚动区域
    outerScroller.addEventListener('touchend', () => { // 滚动区域绑定touchend事件，触摸事件结束判断当前显示选项卡，调用动画显示该选项卡
        let scrollLeft = scroll.scrollLeft
        let num = Math.round(scrollLeft / document.querySelector('tab_main').clientWidth)
        this.getLeft(num)
      },
      false)
  },
  components: {
    'tab-title': TabTitle
  },
  methods: {
    getLeft(num) { // 设置选项卡选中值，调用动画将对应的选项卡显示出来
      this.chooseIndex = num
      let left = num * document.querySelector('tab_main').clientWidth
      let scroll = document.querySelector('.tab_area')
      anime({
        targets: scroll,
        scrollLeft: left,
        duration: 1000
      })
    },
    chooseTabBar(num) { // 点击选项卡标题，显示对应选项卡
      this.getLeft(num)
    },
  }
}

</script>
<style lang="scss" scoped>
.tab_main {
  overflow: hidden;

  .tab_list {
    display: flex;

    .choose_title {
      background-color: #ccc;
    }
  }

  .tab_area {
    width: 100%;
    height: 100%;
    overflow: auto;

    .tab_area_scroll {
      display: flex;
    }
  }
}

</style>
