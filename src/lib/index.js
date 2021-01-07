// 公共功能组件Gadget
import Toast from './Gadget/Toast.vue'
import PageTitle from './Gadget/PageTitle.vue'
import Tabs from './Gadget/Tabs.vue'
import DropDown from './Gadget/DropDown.vue'
import Empty from './Gadget/Empty.vue'
import Wizard from './Gadget/Wizard.vue'
import TreeArea from './Gadget/TreeArea.vue'
import Paging from './Gadget/Paging.vue'
import Loading from './Gadget/Loading.vue'
import PullRefresh from './Gadget/PullRefresh'
// 表单模块Form
import FormArea from './Form/FormArea.vue'
import FormRow from './Form/FormRow.vue'
import UploadFile from './Form/UploadFile.vue'
import CustomSelect from './Form/CustomSelect.vue'
import CustomInput from './Form/CustomInput.vue'
import MultiSelect from './Form/MultiSelect.vue'
import DateSelect from './Form/DateSelect.vue'
import CustomTextarea from './Form/CustomTextarea.vue'
import NumberInput from './Form/NumberInput.vue'
import CheckBox from './Form/CheckBox.vue'
import FormFooter from './Form/FormFooter.vue'
import FormNotice from './Form/FormNotice.vue'
// 弹窗模块mask
import Popup from './Mask/Popup.vue'
import WarnPopup from './Mask/WarnPopup.vue'
import Overlay from './Mask/Overlay.vue' // 全屏遮罩层，可添加自定义弹窗，弹窗位于页面中央
//
import Scroll from './Layout/Scroll.vue'
import HeaderBar from './Layout/HeaderBar.vue'
import FootBar from './Layout/FootBar.vue'
import MenuBar from './Layout/MenuBar.vue'
//
import TabBar from './TabBar/TabBar.vue'
import TabTitle from './TabBar/TabTitle.vue'
import TabItem from './TabBar/TabItem.vue'
const wMod = {
  install (Vue) {
    /*
     * 全局toast方法
     */
    const ToastConstructor = Vue.extend(Toast)
    const toast = new ToastConstructor()
    toast.$mount(document.createElement('div'))
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = (text, type) => {
      toast.text = text || ''
      toast.type = type || 'warn'
      toast.status = true
      const iconObj = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warn: 'fa-exclamation-circle'
      }
      toast.icon = iconObj[type]
      setTimeout(() => {
        setTimeout(() => {
          toast.status = false
        }, 2000)
      }, 2000)
    }

    Vue.component('page-title', PageTitle)
    Vue.component('tabs', Tabs)
    Vue.component('drop-down', DropDown)
    Vue.component('empty', Empty)
    Vue.component('wizard', Wizard)
    Vue.component('tree-area', TreeArea)
    Vue.component('paging', Paging)
    Vue.component('loading', Loading)
    Vue.component('pull-refresh', PullRefresh)

    Vue.component('form-area', FormArea)
    Vue.component('form-row', FormRow)
    Vue.component('upload-file', UploadFile)
    Vue.component('custom-select', CustomSelect)
    Vue.component('custom-input', CustomInput)
    Vue.component('multi-select', MultiSelect)
    Vue.component('date-select', DateSelect)
    Vue.component('custom-textarea', CustomTextarea)
    Vue.component('number-input', NumberInput)
    Vue.component('check-box', CheckBox)
    Vue.component('form-footer', FormFooter)
    Vue.component('form-notice', FormNotice)

    Vue.component('popup', Popup)
    Vue.component('warn-popup', WarnPopup)
    Vue.component('overlay', Overlay)

    Vue.component('scroll', Scroll)
    Vue.component('header-bar', HeaderBar)
    Vue.component('foot-bar', FootBar)
    Vue.component('menu-bar', MenuBar)

    Vue.component('tab-bar', TabBar)
    Vue.component('tab-title', TabTitle)
    Vue.component('tab-item', TabItem)
  }
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(wMod)
}
// 导出模块
export default wMod
