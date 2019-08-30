/*
 * @Description: 移动端底部菜单栏
 * @Author: shuaishuai.wang 
 * @Date: 2019-08-30 16:15:56 
 * @Last Modified by: shuaishuai.wang
 * @Last Modified time: 2019-08-30 16:16:16
 */
<template>
  <div class="footbar_main">
    <div class="footbar_empty"></div>
    <div class="footbar_area">
      <div
        class="footbar"
        v-for="(bar, index) in barList"
        :key="index"
      >
        <div class="icon">
          <i
            class="fa"
            :class="bar.icon"
          ></i>
        </div>
        <div class="text">{{bar.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    barList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
.footbar_main {
  .footbar_empty {
    height: 60px;
  }
  .footbar_area {
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    background-color: #fff;
    .footbar {
      width: 100%;
      text-align: center;
      padding-top: 12px;
      div {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #666;
        i {
          font-size: 20px;
        }
      }
    }
  }
}
</style>