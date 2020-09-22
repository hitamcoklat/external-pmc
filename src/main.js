import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";
import VueExcelEditor from 'vue-excel-editor'
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
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
