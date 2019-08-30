/*
 * @Description: 移动端常见的菜单组，传入菜单图标与菜单名数组以及每行几个菜单
 * @Author: shuaishuai.wang 
 * @Date: 2019-08-30 16:14:36 
 * @Last Modified by: shuaishuai.wang
 * @Last Modified time: 2019-08-30 16:15:46
 */
<template>
  <div class="menu_main">
    <div class="menu_area">
      <div
        class="menu_line"
        v-for="(menuLine, index) in newMenuList"
        :key="index"
      >
        <div
          class="menu"
          v-for="(menu, menuIndex) in menuLine"
          :key="menuIndex"
        >
          <div class="icon">
            <img :src="menu.img">
          </div>
          <p>{{menu.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: []
    },
    num: {
      type: Number,
      default: 5
    }
  },
  mounted() {
    let list = this.menuList
    let productData = [];
    let num = Math.ceil(list.length / this.num);
    for (let i = 0; i < num; i++) {
      productData.push(list.slice(i * this.num, (i + 1) * this.num))
    }
    this.newMenuList = productData
  },
  data() {
    return {
      newMenuList: []
    }
  }
}
</script>

<style lang="scss" scoped>
.menu_main {
  .menu_area {
    .menu_line {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      padding-bottom: 10px;
    }
    .menu {
      width: 100%;
      text-align: center;
      .icon {
        width: 30px;
        padding-top: 10px;
        margin: auto;
        img {
          width: 100%;
        }
      }
      p {
        font-size: 12px;
        margin: 0 auto;
      }
    }
  }
}
</style>