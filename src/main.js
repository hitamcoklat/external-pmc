import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";
import Vue from 'vue'
import VueExcelEditor from 'vue-excel-editor'

Vue.use(VueExcelEditor)

Vue.prototype.$http = axios;
// Vue.prototype.$apiUrl = "http://localhost:8000";
Vue.prototype.$apiUrl = "http://192.168.0.110/project/rs_pmc/api"; 
// Vue.prototype.$apiUrl = "http://192.168.100.57/app-rs-api"; // rs pake ini
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
