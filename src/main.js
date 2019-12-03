import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import EleMultiCascader from 'ele-multi-cascader'
import 'ele-multi-cascader/dist/cascader.css'

// // Require Froala Editor js file.
// require('froala-editor/js/froala_editor.pkgd.min')

// // Require Froala Editor css files.
// require('froala-editor/css/froala_editor.pkgd.min.css')
// require('font-awesome/css/font-awesome.css')
// require('froala-editor/css/froala_style.min.css')
// // Import and use Vue Froala lib.
// import VueFroala from 'vue-froala-wysiwyg'
// Vue.use(VueFroala)

Vue.use(ElementUI, { locale })

// Vue.use(EleMultiCascader, {locale})
Vue.use(EleMultiCascader, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// Though method above is universial useful
// However, if use below , there is a vue warning
// vue.runtime.esm.js:587 [Vue warn]: You are using the runtime-only build of Vue where the template
// compiler is not available.
// Either pre-compile the templates into render functions, or use the compiler-included build.

// var global1 = new Vue({
//   components: { App },
//   router,
//   store,
//   template: '<App/>'
// })
// global1.$mount('#app')
