import Overlay from './Overlay.vue' // 全屏遮罩层，可添加自定义弹窗，弹窗位于页面中央
import Scroll from './Scroll.vue'
import Loading from './Loading.vue'
import Toast from './Toast.vue'
import PullRefresh from './PullRefresh.vue'
import TabBar from './TabBar/TabBar.vue'
import TabTitle from './TabBar/TabTitle.vue'
import TabItem from './TabBar/TabItem.vue'
import HeaderBar from './HeaderBar.vue'
import FootBar from './FootBar.vue'
import MenuBar from './MenuBar.vue'
const wMod = {
  install(Vue) {
    Vue.component('overlay', Overlay)
    Vue.component('scroll', Scroll)
    Vue.component('loading', Loading)
    Vue.prototype.toastMsg = option => {
      let toastClass = Vue.extend(Toast)
      let msgInstance = new toastClass()
      msgInstance.$mount()
      document.body.appendChild(msgInstance.$el)
      msgInstance.showToast(option)
    }
    Vue.component('pull-refresh', PullRefresh)
    Vue.component('tab-bar', TabBar)
    Vue.component('tab-title', TabTitle)
    Vue.component('tab-item', TabItem)
    Vue.component('header-bar', HeaderBar)
    Vue.component('foot-bar', FootBar)
    Vue.component('menu-bar', MenuBar)
  }
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(wMod)
}
// 导出模块
export default wMod
