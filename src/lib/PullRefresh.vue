/* 
 * @Description: 下拉刷新组件 
 * @Author: wang 
 * @Date: 2019-08-07 14:29:29 
 * @Last Modified by: shuaishuai.wang
 * @Last Modified time: 2019-08-07 14:58:40
 */

<template>
  <div class="main">
    <div
      class="main_area"
      :class="resetPull ? 'reset_pull' : ''"
    >
      <div class="pull_area">
        <div class="pull_text">
          <i class="fa" :class="iconUp ? 'fa-arrow-up' : 'fa-arrow-down'"></i>
          <span>{{msg}}</span>
        </div>
      </div>
      <slot></slot>
    </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '下拉刷新', // 下拉提示文本
      resetPull: false, // 是否收回下拉框
      iconUp: false // 下拉图标选择，默认向下箭头
    }
  },
  mounted() {
    let scroll = document.querySelector('.main_area')
    let outerScroller = document.querySelector('.main')
    let touchStart = 0
    let touchDis = 0
    let _this = this
    outerScroller.addEventListener('touchstart', function (event) {
      let touch = event.targetTouches[0]
      // 把元素放在手指所在的位置
      touchStart = touch.pageY
    }, false)
    outerScroller.addEventListener('touchmove', function (event) {
      let touch = event.targetTouches[0]
      let top = scroll.offsetTop + touch.pageY - touchStart
      if (top > 99) { // 限定下拉高度为100px
        top = 100
      }
      if (top > 70) { // 下拉至70高度时可触发刷新操作，此时更改图标与提示文字
        _this.iconUp = true
        _this.msg = '松开即可刷新'
      } else if(top > 0) { // 下拉高度恢复至70以下时，将其内容恢复至初始内容
        _this.iconUp = false
        _this.msg = '下拉刷新'
      } else{
        top = 0
      }
      scroll.style.top = top + 'px'
      touchStart = touch.pageY
      touchDis = touch.pageY - touchStart
    }, false)
    outerScroller.addEventListener('touchend', function (event) {
      touchStart = 0
      let top = scroll.offsetTop
      if (top > 70) { // 下拉高度超过70时松手，执行自定义refresh方法
        _this.refresh(scroll)
      } else { // 松手时高度低于70，将下拉框收回并将其内容重置
        _this.resetPull = true
        setTimeout(() => { // 延时执行，收缩动画结束，重置下拉框
          _this.resetPull = false
          scroll.style.top = 0
          _this.iconUp = false
          _this.msg = '下拉刷新'
        }, 500)
      }
    }, false)
  },
  methods: {
    refresh(scroll) {
      this.$emit('refresh')
      this.resetPull = true
      setTimeout(() => { // 延时执行，收缩动画结束，重置下拉框
        this.resetPull = false
        scroll.style.top = 0
        this.iconUp = false
        this.msg = '下拉刷新'
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scope>
.main {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  left: 0;
  overflow: hidden;
  .main_area {
    width: 100%;
    margin-top: 0;
    position: absolute;
    left: 0;
    padding: 0;
    top: 0;
    .pull_area {
      width: 100%;
      height: 30px;
      margin-top: -30px;
      .pull_text {
        color: #cccccc;
        text-align: center;
        height: 100%;
        line-height: 100%;
      }
      .pull_icon {
        transition: all .5s;
      }
      p {
        font-size: 12px;
      }
    }
  }
  .reset_pull {
    animation: resetPull 1s forwards;
  }
}

@keyframes resetPull {
  from {
    /*top: 100px;*/
  }
  to {
    top: 0;
  }
}
</style>
