<template>
  <div class="container">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <span style="font-size: 30px">SHIMAKAZE | 岛风</span>
      <el-menu-item index="1"><router-link to="login">登录</router-link></el-menu-item>
    </el-menu>
    <div class="line"></div>
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="black"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="6"><router-link to="/">首页</router-link></el-menu-item>
      <el-submenu index="1">
        <template slot="title">客房服务</template>
        <el-menu-item index="1-1"><router-link to="checkindetail">入住详情</router-link></el-menu-item>
        <el-menu-item index="1-2"><router-link to="checkout">退房/续住</router-link></el-menu-item>
        <el-menu-item index="1-3"><router-link to="checkin">我要入住</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">访客管理</template>
        <el-menu-item index="2-1"><router-link to="visitorserv">新增访客信息</router-link></el-menu-item>
        <el-menu-item index="2-2"><router-link to="visitorhistory">查看历史记录</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">发票服务</template>
        <el-menu-item index="3-1"><router-link to="newticket">新增发票地址</router-link></el-menu-item>
        <el-menu-item index="3-2"><router-link to="tickethistory">查看历史记录</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">个人信息</template>
        <el-menu-item index="4-1"><router-link to="aboutme">修改个人信息</router-link></el-menu-item>
        <el-menu-item index="4-2"><router-link to="bills">服务账单</router-link></el-menu-item>
        <el-menu-item index="4-2"><router-link to="orders">历史订单信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">个性化服务</template>
        <el-menu-item index="5-1"><router-link to="recommendsys">系统推荐</router-link></el-menu-item>
        <el-menu-item index="5-2"><router-link to="mypreference">我的喜好</router-link></el-menu-item>
        <el-menu-item index="5-3"><router-link to="mapguide">路径规划</router-link></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '6'
    }
  },
  methods:{
    handleSelect(key,keyPath){
      console.log(key,keyPath)
    }
  }
}
</script>

<style scoped>

</style>