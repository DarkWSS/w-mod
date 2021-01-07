/*
 * 文件上传 
 */
<template>
  <div class="upload_area">
    <button class="blue_btn"
            type="button"
            @click="uploadFile()">上传文件</button>
    <div class="warn_msg"
         v-show="!check.status">请至少上传一个文件</div>
    <div class="msg"
         v-show="check.status">*
      <span>{{msg}}</span>
    </div>
    <input type="file"
           multiple
           ref="file"
           @change="fileSelect($event)"
           :accept="accept.join(',')">
    <div class="file_area">
      <div v-for="(file, index) in files"
           :key="index"
           class="file_name">
        <span>{{file.name}}</span>
        <i class="fa fa-close"
           @click="removeFile(index)"></i>
      </div>
      <div v-for="(file, index) in oldFiles"
           :key="'old' + index"
           class="file_name">
        <span>{{file.name}}</span>
        <i class="fa fa-close"
           @click="removeOldFile(index)"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      files: [], // 上传的文件列表
      delOldFiles: [], // 删除的旧文件id数组
      check: {
        status: true,
        text: this.oldFiles.length > 0 ? '' : 'default'
      }
    }
  },
  props: {
    msg: { // 显示的提示文字
      type: String,
      default: () => {
        return ''
      }
    },
    accept: { // 允许的上传文件类型
      type: Array,
      default: () => {
        return ['*']
      }
    },
    option: { // 最多上传数量与最大上传容量
      type: Object,
      default: () => {
        return {
          num: 1,
          maxSize: 10
        }
      }
    },
    oldFiles: { // 初始的文件列表
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    uploadFile () { // 触发文件上传的点击操作
      this.$refs.file.click()
    },
    fileSelect (event) { // 文件选择完点击上传时的操作
      const files = event.target.files
      this.option.maxSize *= 1000000
      for (let i = 0; i < files.length; i++) {
        if (!this.files.some(oldFile => {
          return oldFile.name == files[i].name
        }) && files[i].size <= this.option.maxSize) { // 判断文件名不重复且大小没超出最大容量
          this.files.unshift(files[i])
        } else {
          this.$emit('toast', '文件已上传或超出体积限制', 'error')
        }
      }
      this.toggleWarnMsg()
    },
    removeFile (index) { // 点击X移除将对应文件移除
      this.files.splice(index, 1)
      if (this.files.length < 1) {
        this.$refs.file.value = ''
      }
      this.toggleWarnMsg()
    },
    removeOldFile (index) { // 移除初始化文件的操作
      this.delOldFiles.push(this.oldFiles[index].id)
      this.oldFiles.splice(index, 1)
      this.toggleWarnMsg()
    },
    getFiles (formData, filesName, oldFilesName) { // 获取文件上传列表
      this.delOldFiles.forEach(id => {
        formData.append(oldFilesName, id)
      })
      this.files.forEach(file => {
        formData.append(filesName, file)
      })
      return formData
    },
    toggleWarnMsg () {
      this.check = {
        status: true,
        text: ''
      }
      const propsData = this.$parent.$options.propsData
      if (propsData && propsData.notNull && this.oldFiles.length + this.files.length < 1) {
        this.check = {
          status: false,
          text: '请至少上传一个文件'
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~style/values";
@import "~style/style";
.upload_area {
  width: $form-width;
  position: relative;
  .msg {
    padding: 0.5rem 0;
    color: #ff0000;
    span {
      margin-left: 0.5rem;
      color: #a0a9c1;
    }
  }
  input[type="file"] {
    display: none;
  }
  .file_area {
    width: $form-width;
    .file_name {
      @include flex_between;
      span {
        height: 2rem;
        line-height: 2rem;
        @include no_warp_hide;
      }
      i {
        width: 3rem;
        text-align: right;
        font-size: 1rem;
        height: 2rem;
        line-height: 2rem;
        flex: none;
        cursor: pointer;
      }
    }
  }
}
</style>