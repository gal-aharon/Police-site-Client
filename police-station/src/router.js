import VueRouter from 'vue-router';
import Activities from './views/Activities.vue';
import Reports from './views/Reports.vue';
import Map from './views/Map.vue';

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
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  }
];

export default new VueRouter({
  routes
});