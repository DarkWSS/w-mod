/* 
 *  分页组件
 */
<template>
  <div class="paging_area"
       :class="{'mini_paging': miniPaging}"
       v-show="count > 0">
    <div class="total_count"
         v-if="!hideCount">总计{{count}}条数据</div>
    <ul>
      <li :class="{'disabled': pageIndex == 1}"
          @click="changeCurrentPage(1)">
        <i class="fa fa-angle-double-left"></i>
      </li>
      <li :class="{'disabled': pageIndex == 1}"
          @click="previousPage()">
        <i class="fa fa-angle-left"></i>
      </li>
      <li v-for="(page, index) in pageList"
          :key="index"
          @click="changeCurrentPage(page)"
          :class="{'current': page == pageIndex}">
        <span>{{page}}</span>
      </li>
      <li :class="{'disabled': pageIndex == pageCount}"
          @click="nextPage()">
        <i class="fa fa-angle-right"></i>
      </li>
      <li :class="{'disabled': pageIndex == pageCount}"
          @click="changeCurrentPage(pageCount)">
        <i class="fa fa-angle-double-right"></i>
      </li>
    </ul>
    <div class="size_select"
         v-if="!hideSelect">
      <custom-select :option-list=sizeList
                     @on-change=changeSize
                     :selected=selected></custom-select>
    </div>
    <div class="skip"
         v-if="!hideSkip">
      跳转至
      <input @blur="skipToPage()"
             @input="checkPage()"
             v-model="skipPage"
             type="text">
      页
    </div>
  </div>
</template>
<script>
import CustomSelect from './../form/CustomSelect'
export default {
  components: {
    'custom-select': CustomSelect
  },
  data () {
    return {
      sizeList: [
        { name: '10条/页', id: "10" },
        { name: '20条/页', id: "20" },
        { name: '30条/页', id: "30" },
        { name: '40条/页', id: "40" },
        { name: '50条/页', id: "50" }
      ],
      selected: null,
      pageList: [],
      pageCount: 0,
      pageIndex: this.currentPage,
      skipPage: null
    }
  },
  props: {
    count: { // 数据总量
      type: Number,
      default: 0
    },
    currentPage: { // 当前页
      type: Number,
      default: 1
    },
    pageSize: { // ，每页条数，限制10， 20， 30， 40， 50， 其他值均无效
      type: Number,
      default: 10
    },
    hideCount: { // 隐藏总计xx条数据字样
      type: Boolean,
      default: false
    },
    hideSelect: { // 隐藏选择每页数据量的功能
      type: Boolean,
      default: false
    },
    hideSkip: { // 隐藏输入页码直接跳转的功能
      type: Boolean,
      default: false
    },
    miniPaging: { // 设定分页样式为mini状态，可用于宽度较窄的情况
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeSize (selected) { // 更改页码大小
      this.selected = selected.id
      this.changeCurrentPage(1)
      this.skipPage = null
    },
    changeCurrentPage (page) { // 改变当前页码
      this.pageIndex = page
      this.setPageList()
    },
    setPageList () { // 设置显示的页码数组
      this.pageCount = Math.ceil(this.count / this.selected)
      const pageCount = this.pageCount
      const pageIndex = this.pageIndex
      const pageList = []
      for (let i = 1; i <= pageCount; i++) {
        if ((pageIndex < 4 && i < 8) || (pageIndex < pageCount - 3 && i > pageIndex - 4 && i < pageIndex + 4) || (pageIndex >= pageCount - 3 && i > pageCount - 7)) {
          pageList.push(i)
        }
      }
      this.pageList = pageList
      this.$emit('refresh-paging', this.pageIndex, this.pageSize)
    },
    previousPage () { // 上一页
      const index = this.pageIndex - 1
      if (index > 0) {
        this.changeCurrentPage(index)
      }
    },
    nextPage () { // 下一页
      const index = this.pageIndex + 1
      if (index <= this.pageCount) {
        this.changeCurrentPage(index)
      }
    },
    skipToPage (e) { // 跳转到指定页
      let page = isNaN(parseInt(this.skipPage)) ? 1 : parseInt(this.skipPage)
      this.skipPage = null
      this.changeCurrentPage(page)
    },
    checkPage () { // 跳转输入框的输入验证
      let val = this.skipPage
      val = parseInt(val.replace(/[\D]/g, ''))
      if (!isNaN(val)) {
        if (val < 1) {
          val = 1
        } else if (val > this.pageCount) {
          val = this.pageCount
        }
        this.skipPage = val
      } else {
        this.skipPage = null
      }
    }
  },
  beforeMount () {
    const select = this.sizeList.filter(size => this.pageSize == size.id)[0]
    if (select) { // 判断当前传入的每页条数符合规则
      this.selected = select.id
    } else { // 不符合要求弹出警示并将其设置为默认值10
      console.warn('警告: 传入的每页条数为非法值，合法值为10、20、30、40、50，你传入的是：' + this.pageSize)
      this.selected = this.sizeList[0].id
    }
    this.setPageList()
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.paging_area {
  @include flex_center;
  position: relative;
  margin-top: 2rem;
  .total_count {
    margin-right: 2rem;
  }
  ul {
    @include flex_between;
    li {
      width: $form-height;
      height: $form-height;
      text-align: center;
      line-height: $form-height;
      color: $select-i;
      border-radius: $radius;
      margin: 0 0.25rem;
      border: $border $gray4;
      cursor: pointer;
      @include transition;
      &:hover {
        background-color: $baby-blue;
      }
    }
    .disabled {
      background-color: $gray2;
      color: $gray3;
      cursor: not-allowed;
      &:hover {
        background-color: $gray7;
      }
    }
    .current {
      background-color: $blue;
      border-color: $blue;
      color: $white;
      font-weight: bold;
      &:hover {
        background-color: $blue;
      }
    }
  }
  .size_select {
    margin: 0 2rem;
    & /deep/ input {
      width: 10rem;
    }
  }
  .skip {
    input {
      width: 5rem;
      text-align: center;
      margin: 0 1rem;
    }
  }
}
.mini_paging {
  @include flex_end;
  ul {
    li {
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      margin: 0;
      border-radius: 0;
      &:first-child {
        border-top-left-radius: $radius;
        border-bottom-left-radius: $radius;
      }
      &:last-child {
        border-top-right-radius: $radius;
        border-bottom-right-radius: $radius;
      }
    }
  }
  .size_select {
    margin: 0 1rem;
    & /deep/ input {
      width: 8rem;
      height: 2rem;
    }
    & /deep/ i {
      height: 2rem;
      line-height: 2rem;
    }
  }
  .skip {
    input {
      width: 4rem;
      height: 2rem;
      margin: 0 0.5rem;
    }
  }
}
</style>