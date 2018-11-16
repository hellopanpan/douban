import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './assets/js/bootstrap.min.js'
import './assets/css/bootstrap.min.css'
import routerConfig from './routerConfig.js'
import store from './store'
import Loading from './components/loading'
import Axios from 'axios'
import ElementU from "element-ui"
import 'element-ui/lib/theme-default/index.css'
import _ from "lodash"
//关于axios配置;

Vue.use(ElementU);

Vue.use(Loading);
Vue.use(VueRouter);
Axios.interceptors.request.use(function(config){
	store.dispatch("showloading");
	return config;
},function(error){
	return Promise.reject(error);
});
Axios.interceptors.response.use(function(response){
	store.dispatch('hideloading');
	return response;
},function(error){
	return Promise.reject(error)
});
Vue.prototype.$http=Axios;
const router=new VueRouter({
	routes:routerConfig,
	scrollBehavior:() =>({y:0})
});
Vue.filter("torate", function (value) {
        //return (value/10 * 5).toFixed(0);
        return value+ '222';
    }
);
var result = new Vue();
new Vue({
	store,
	router,
  el: '#app',
  render: h => h(App),


});
