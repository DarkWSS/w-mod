import Overlay from './Overlay.vue' // 全屏遮罩层，可添加自定义弹窗，弹窗位于页面中央
import Scroll from './Scroll.vue'
import Loading from './Loading.vue'
import Toast from './Toast.vue'
import PullRefresh from './PullRefresh.vue'
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
  }
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(wMod)
}
// 导出模块
export default wMod
