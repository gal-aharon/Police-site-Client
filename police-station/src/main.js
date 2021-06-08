import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router.js';
import VueRouter from 'vue-router';
import DatetimePicker from 'vuetify-datetime-picker';
 
Vue.use(DatetimePicker)

Vue.config.productionTip = false

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
