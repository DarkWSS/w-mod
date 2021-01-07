/*
 * 自定义多选 
 */
<template>
  <div class="multi_select">
    <div class="tag_area">
      <div v-for="(tag, index) in tagList"
           :key="index"
           class="tag">
        <span>{{tag.name}}</span>
        <i class="fa fa-close"
           @click="deleteTag(tag.id)"></i>
      </div>
      <div class="tag add_tag"
           v-show="addShow"
           @click="openSelectArea()">
        <span>{{addText}}</span>
        <i class="fa fa-plus"></i>
      </div>
    </div>
    <div class="warn_msg"
         v-show="!check.status">请至少选择一个</div>
    <div class="msg"
         v-show="check.status">{{msg}}</div>
    <div class="select_area"
         v-show="selectStatus">
      <div class="data_area">
        <div class="check_rule"
             v-if="rules && rules.length > 0">
          <div v-for="(rule, index) in rules"
               :key="index"
               class="rule"
               :class="{'select_rule': selectRule === index}"
               @click="selectRules(index)">
            {{rule}}
          </div>
        </div>
        <div class="check_area"
             v-for="(checks, index) in checksList"
             v-show="index===selectRule"
             :key="index">
          <div v-for="(check, cIndex) in checks.data"
               :key="cIndex"
               class="check_value"
               @click="toggleStatus(check.id, check.name)">
            <div class="check_icon"
                 :class="{checked: judgeChecked(check.id) > -1}">
              <i class="fa fa-check"></i>
            </div>
            <div class="check_name">{{check.name}}</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <button class="default_btn mini_btn"
                @click="() => {this.selectStatus = false}">取消</button>
        <button class="blue_btn mini_btn"
                @click="updateTags()">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkList: [], // 被选择过的对象列表
      tagList: [], // 标签列表
      selectStatus: false, // 是否显示选择区域
      selectRule: 0, // 左侧选中下标
      addShow: true, // 新增按钮显示状态
      check: {
        status: true,
        text: this.checkedList.length > 0 ? '' : 'default'
      },
    }
  },
  props: {
    addText: { // 新增按钮文本
      type: String,
      default: '新增成员'
    },
    len: { // 最多可选数量
      type: Number,
      default: 10
    },
    msg: { // 超出可选数量的提示文字
      type: String,
      default: '最多只可选择10位成员'
    },
    rules: { // 左侧菜单数据
      type: Array,
      default: () => {
        return []
      }
    },
    checksList: { // 右侧选择数据
      type: Array,
      default: () => {
        return []
      }
    },
    checkedList: { // 已选择数据
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    toggleStatus (id, name) { // 切换选中状态
      let checkCount = this.checkList.length
      if (checkCount < this.len) { // 长度小于限制的长度
        const index = this.judgeChecked(id)
        if (index < 0) {
          this.checkList.push({
            id: id,
            name: name
          })
        } else {
          this.checkList.splice(index, 1)
        }
      } else {
        this.$emit('toast', this.msg, 'warn')
      }
    },
    getFormData (formData, name) { // 获取选中的数据的ID
      for (let i = 0; i < this.tagList.length; i++) {
        formData.append(name, this.tagList[i].id)
      }
      return formData
    },
    openSelectArea () { // 打开选择区域
      this.selectStatus = true
    },
    updateTags () { // 更新标签内容
      this.selectStatus = false
      this.tagList = []
      this.addShow = true
      for (const check of this.checkList) {
        this.tagList.push(check)
      }
      this.toggleWarnMsg()
      if (this.tagList.length === this.len) {
        this.addShow = false
      }
    },
    deleteTag (id) { // 删除对应标签
      this.addShow = true
      this.tagList = this.tagList.filter(tag => { return tag.id !== id })
      this.toggleWarnMsg()
      this.checkList = this.checkList.filter(check => { return check.id !== id })
    },
    selectRules (index) { // 选择左侧内容刷新右侧
      this.selectRule = index
    },
    toggleWarnMsg () { // 判断是否显示必填提示
      this.check = {
        status: true,
        text: ''
      }
      const propsData = this.$parent.$options.propsData
      if (propsData && propsData.notNull && this.tagList.length < 1) {
        this.check.status = false
      }
    },
    judgeChecked (id) { // 判断当前数据是否已被选中
      return this.checkList.findIndex(check => check.id == id)
    }
  },
  mounted () {
    if (this.checkedList.length > 0) {
      let checks = []
      this.checksList.forEach(check => {
        check.data.forEach(data => {
          checks.push(data)
        })
      })
      this.checkedList.forEach(checked => {
        const check = checks.filter(check => check.id === checked)[0]
        this.checkList.push(check)
      })
      this.updateTags()
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.multi_select {
  position: relative;
  .tag_area {
    width: $form-width;
    @include flex_wrap;
    .tag {
      height: $form-height;
      line-height: $form-height;
      padding-left: 1rem;
      padding-right: 2.5rem;
      border: $border $gray1;
      border-radius: $radius;
      margin-right: 1rem;
      margin-bottom: 1rem;
      @include no_warp_hide;
      position: relative;
      overflow-y: hidden;
    }
    i {
      margin-left: 1rem;
      cursor: pointer;
      position: absolute;
      line-height: $form-height;
      right: 1rem;
    }
    .add_tag {
      cursor: pointer;
    }
  }
  .warn_msg {
    margin-top: -1rem;
  }
  .msg {
    font-size: 0.8rem;
    color: $gray1;
  }
  .select_area {
    width: $form-width;
    box-shadow: $box-shadow;
    border-radius: $radius;
    background-color: $white;
    position: absolute;
    z-index: 10;
    .data_area {
      @include flex;
      .area_style {
        padding: 1.6rem;
        max-height: 30rem;
        overflow-y: auto;
      }
      .check_rule {
        width: 12rem;
        border-right: $border $gray6;
        @extend .area_style;
        .rule {
          padding-left: 0.5rem;
          height: 2rem;
          line-height: 2rem;
          margin: 0.5rem 0;
          cursor: pointer;
          @include transition;
        }
        .select_rule {
          background-color: rgba(52, 138, 244, 0.1);
          color: $blue;
        }
      }
      .check_area {
        flex: 1;
        @extend .area_style;
        .check_value {
          height: $form-height;
          cursor: pointer;
          @include flex_vertical_center;
          .check_name {
            @include no_warp_hide;
            padding-left: 1rem;
          }
        }
      }
    }
    .footer {
      @include flex_end;
      padding: 1rem;
      button {
        margin-left: 1rem;
      }
    }
  }
}
</style>