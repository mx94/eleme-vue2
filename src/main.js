
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import './common/less/index.less';
import 'animate.css';

Vue.use(VueRouter);
Vue.use(VueResource);
import {routes} from './router/index';
let router = new VueRouter({
  linkActiveClass: 'active', // 指定默认添加的class名
  routes
});
new Vue({
  el: '#app',
  render: (h) => h(App),
  router
});
