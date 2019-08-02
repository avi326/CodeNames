// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueChatScroll from 'vue-chat-scroll'
import firebase from 'firebase'

Vue.use(VueChatScroll)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

let app = null

// what for firebase auth to init before creating into app
firebase.auth().onAuthStateChanged(() => {

  // init app if not aleardy created
  if (!app){
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
}
  

})
