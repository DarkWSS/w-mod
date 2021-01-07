/*
 * 步骤条 
 */
<template>
  <div class="wizard_area">
    <div class="wizard_line">
      <div class="wizard_tempo"
           :style="{width: tempo + '%'}"></div>
    </div>
    <div class="wizard_point"
         v-for="(wizard, index) in wizardList"
         :key="index"
         :class="wizard.type">
      <div class="point">
        <div class="white_point"></div>
      </div>
      <div class="name"
           :class="{'current': index === current}"
           v-if="wizard.name">{{wizard.name}}</div>
      <div class="status"
           v-if="wizard.status">{{wizard.status}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      current: -1, // 当前步骤
      tempo: 0 //进度
    }
  },
  props: {
    wizardList: { // 进度条进度列表
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted () {
    this.current = this.wizardList.findIndex((value) => !value.type) // 获取当前步骤状态为空的下表
    if (this.current) { // 步骤条已开始
      if (this.current > -1) { // 步骤条未完成
        this.tempo = (this.current - 1) * 100 / (this.wizardList.length - 1)
      } else {
        this.tempo = 100
      }
    }
    const refuse = this.wizardList.findIndex((value) => value.type.indexOf('refuse') > -1) // 获取当前步骤条失败步骤的下标
    if (this.current > 0 && refuse < 0) { // 步骤已开始且没有失败
      this.current--
    } else {
      this.current = -1
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.wizard_area {
  @include flex_between;
  position: relative;
  .wizard_point {
    width: 16px;
    position: relative;
    min-height: 3rem;
    @mixin point {
      width: 16px;
      height: 16px;
      border-radius: $radius-circle;
    }
    .point {
      @include point;
      background-color: $gray6;
      .white_point {
        @include point;
        background-color: $white;
        transform: scale(0.5);
      }
    }
    @mixin text_style {
      width: fit-content;
      @include no_warp;
      transform: translateX(calc(-50% + 8px));
      text-align: center;
    }
    .name {
      margin-top: 0.5rem;
      height: 2rem;
      line-height: 2rem;
      padding: 0 0.5rem;
      @include text_style;
    }
    .current {
      background-color: $baby-blue;
      color: $blue;
    }
    .status {
      @include text_style;
      margin-top: 0.5rem;
      color: $gray4;
    }
    &:last-child {
      transform: translateX(calc(100% - 8px));
    }
  }
  .under {
    .point {
      background-color: $blue;
    }
  }
  .refuse {
    .point {
      background-color: $orangered;
    }
    .name {
      background-color: transparentize($orangered, 0.9);
      color: $orangered;
    }
  }
  .wizard_line {
    width: 100%;
    height: 4px;
    position: absolute;
    background-color: $gray6;
    top: 6px;
    border-radius: 25px;
    overflow: hidden;
    .wizard_tempo {
      height: 4px;
      background-color: $blue;
      border-radius: 25px;
    }
  }
}
</style>