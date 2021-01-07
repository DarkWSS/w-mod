/*
 * 页面头部包含面包屑与标题 
 */
<template>
  <div class="page_title">
    <div class="crumbs">
      <div v-for="(crumb, index) in crumbList"
           :key="index">
        <span class="name"
              @click="skipToPage(crumb.link)"
              :class="{'crumb': crumbList.length > 1 && index === crumbList.length - 1}">{{crumb.name}}</span>
        <span class="separator"
              v-if="index < crumbList.length - 1">/</span>
      </div>
    </div>
    <div class="title"
         v-if="title">{{title}}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    crumbList: { // 面包屑列表
      type: Array,
      default: () => {
        return []
      }
    },
    title: { // 标题
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    skipToPage (link) { // 点击面包屑跳转，可传入url直接跳转或者传入数字进行历史跳转
      if (link) {
        if (Number.isInteger(link)) {
          window.history.go(link)
        } else {
          window.location.href = link
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
.page_title {
  .crumbs {
    height: 4.5rem;
    color: $gray1;
    padding: 1rem 0;
    display: flex;
    .name {
      cursor: pointer;
    }
    .separator {
      padding: 0 0.5rem;
    }
    .crumb {
      color: $blue;
    }
  }
  .title {
    font-size: 1.8rem;
    font-weight: bold;
    padding-bottom: 2rem;
  }
}
</style>