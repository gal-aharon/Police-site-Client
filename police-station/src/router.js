import VueRouter from 'vue-router';
import Activities from './views/Activities.vue';
import Reports from './views/Reports.vue';

const routes = [
  {
    path: '/',
    name: 'activities',
    component: Activities
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports
  }
];

export default new VueRouter({
  routes
});