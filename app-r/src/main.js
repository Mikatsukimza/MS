import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'
import Router from 'vue-router'
import store from "@/vuex/store";
import qs from 'qs'
import user from '@/vuex/store'


Vue.prototype.$qs=qs;
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
var loadingInstance;
// var access_token = '';
// Axios.defaults.headers.post['access_token'] = access_token;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//添加请求拦截器
Axios.interceptors.request.use(function (config){
  //在发送请求之前
    const token = store.state.token;
    console.log("token:" + token);
    if(token){
        config.headers.Authortization=store.getters.get_token;
    }
    config.headers.access_token = store.state.access_token;
    console.log("ABC:"+ JSON.stringify(config));
  return config;
},function (error){
  //请求错误做的事情
  console.log('error');
  return Promise.reject(error)
})

Axios.interceptors.response.use(
    response => {
        let token=localStorage.getItem("token");
        console.log("xxxxxxxxxx");
        console.log(response.data);
        return response.data;
    }
)

Axios.defaults.baseURL='http://localhost:8081';

Vue.prototype.$axios=Axios;

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
    store
}).$mount('#app')

