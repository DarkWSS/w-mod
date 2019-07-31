import Overlay from './Overlay.vue'
const overlay = {
  install(Vue) {
    Vue.component('Overlay', Overlay)
  }
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(overlay)
}
// 导出模块
export default overlay
