<template>
<div id="serviceside">
<!--  <el-aside>-->
    <router-link to="/recommendsys">系统推荐</router-link><br>
    <router-link to="/mypreference">我的喜好</router-link><br>
  <el-button @click="goback">返回</el-button>
<!--  </el-aside>-->
</div>
</template>

<script>
export default {
  name: "serviceside",
  methods:{
    goback(){
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>