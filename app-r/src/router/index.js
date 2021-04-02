import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import aboutme from "@/views/aboutme";
import bills from "@/views/bills";
import personservice from "@/views/personservice";
import mapguide from "@/views/mapguide";
import rooms from "@/views/rooms";
import ticket from "@/views/ticket";
import visitors from "@/views/visitors";
import orders from "@/views/orders";
import newticket from "@/components/newticket";
import tickethistory from "@/components/tickethistory";
import recommendsys from "@/components/recommendsys";
import mypreference from "@/components/mypreference";
import visitorserv from "@/components/visitorserv";
import visitorhistory from "@/components/visitorhistory";
import roomside from "@/components/roomside";
import checkin from "@/components/checkin";
import checkout from "@/components/checkout";
import store from "@/vuex/store";
import register from "@/views/register";
import checkindetail from "@/components/checkindetail";
import Face from "@/views/Face";
import * as path from "path";
import FaceIndex from "@/views/FaceIndex";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/aboutme',
    name: 'aboutme',
    component: aboutme,
    meta: {
      requireAuth: true
    }
  },{
    path: '/bills',
    name: 'bills',
    component: bills,
    meta: {
      requireAuth: true
    }
  },{
    path: '/mapguide',
    name: 'mapguide',
    component: mapguide,
    meta: {
      requireAuth: true
    }
  },{
    path: '/personservice',
    name: 'personservice',
    component: personservice,
    meta: {
      requireAuth: true
    }
  },{
    path: '/rooms',
    name: 'rooms',
    component: rooms,
    meta: {
      requireAuth: true
    }
  },{
    path: '/ticket',
    name: 'ticket',
    component: ticket,
    meta: {
      requireAuth: true
    }
  },{
    path: '/visitors',
    name: 'visitors',
    component: visitors,
    meta: {
      requireAuth: true
    }
  },{
    path: '/orders',
    name: 'orders',
    component: orders,
    meta: {
      requireAuth: true
    }
  },{
  path:'/newticket',
    name:'newticket',
    component: newticket,
    meta: {
      requireAuth: true
    }
  },{
  path:'/tickethistory',
    name:'tickethistory',
    component: tickethistory,
    meta: {
      requireAuth: true
    }
  },{
  path:'/recommendsys',
    name:'recommendsys',
    component: recommendsys,
    meta: {
      requireAuth: true
    }
  },{
  path:'/mypreference',
    name: 'mypreference',
    component: mypreference,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/visitorserv',
    name: 'visitorserv',
    component: visitorserv,
    meta: {
      requireAuth: true
    }
  },{
  path:'/visitorhistory',
    name:'visitorhistory',
    component: visitorhistory,
    meta: {
      requireAuth: true
    }
  },{
  path:'/roomside',
    name:'roomside',
    component: roomside,
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/checkin',
    name:'checkin',
    component: checkin,
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/checkout',
    name:'checkout',
    component: checkout,
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/store',
    name:'store',
    component: store
  },
  {
    path:'/register',
    name:'register',
    component: register
  },
  {
    path:'/checkindetail',
    name:'checkindetail',
    component: checkindetail
  },{
  path:'/Face',
    name:'Face',
    component: Face
  },{
    path:'/FaceIndex',
    name:'FaceIndex',
    component: FaceIndex
  }]

const router = new VueRouter({
  routes,
  linkExactActiveClass:'activeRouter',
  linkActiveClass:'active'
})

if (localStorage.getItem("token")) {
  store.commit("set_token", localStorage.getItem("token"));
}
router.beforeEach((to,from,next)=>{
  if(to.matched.some(res=>res.meta.requireAuth)){
    if(localStorage.getItem('token')){
      next()
    }else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next()
  }
})

console.log(router);
export default router
