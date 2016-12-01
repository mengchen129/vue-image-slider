import Vue from 'vue'
import App from './App.vue'

import VueLazyLoad from './components/vue-lazyload';

Vue.use(VueLazyLoad, {
  error: 'http://img.ishequ360.com/images/test/Loading.png',
  loading: 'http://img.ishequ360.com/images/test/Loading.png',
  attempt: 1
});

new Vue({
  el: '#app',
  render: h => h(App)
})
