import Vue from 'vue'
import Vuex from 'vuex'
import * as storage from "core-js";

Vue.use(Vuex)

let getters;
var store = new Vuex.Store({
    state: {
        token: "",
        name: "",
        manID: "",
        access_token:"",
        faceimg:""
    },
    getters :{
        get_token(state){
            return state.token || window.localStorage.getItem("token") || null;
        }
    },
    mutations: {
        set_token(state, token) {
            state.token = "JWT" + token;
            localStorage.setItem("token", token);
            console.log("store.localstorage保存token成功" + state.token);
        },
        del_token(state) {
            state.token = "";
            localStorage.removeItem("token");
        },
        setUserInfo(state, name) {
            state.name = name;
            console.log("store:name:" + state.name);
        },
        setUserId(state, manID) {
            state.manID = manID;
        },
        setAccess_Token(state,access_token){
            state.access_token = access_token;
        },setFaceImg(state,faceimg){
            state.faceimg = faceimg
            alert("图片保存成功"+ faceimg)
        }
    },
    actions:{

    }
})



export default store