<template>
  <div class="home">
    <head></head>
    <el-carousel  :height="bannerH+'px'"  trigger="click" arrow="always" ref="tag">
      <el-carousel-item class="image" v-for="item in images" :key="item.id">
        <img :src="item.url" width="100%" height="100%" alt="无图片" />
      </el-carousel-item>
    </el-carousel>
    <div id="main">
      <p>“宾至如归”这四个字恰如其分地反映了入住岛风酒店宾客的感受。选择入住岛风也体现了宾客的眼光，
        因为在这里不但可以享受超越以往的服务、宁静的环境以及富于灵感的建筑格调和设计品位。
        此外，每个酒店都能提供难忘的餐饮体验，确保每位宾客遍尝人间美味，满足味觉享受。
        但是，让宾客每次入住岛风酒店记忆犹新的是能感受到岛风非同寻常的热情好客和体贴入微，这是一种发自内心的殷勤待客之道。</p>
    </div>
  </div>
</template>
<script>
import Head from "@/components/Head";
import Table from "@/components/Table";
import Add from "@/components/Add";

export default {
  name: 'Home',
  data: function () {
    return {
      tableData: [],
      images: [
        {url: require("@/imgs/homeBG1.jpg")},
        {url: require("@/imgs/HOME2.jpg")},
        {url: require("@/imgs/HOME3.jpg")}
      ],
      bannerH:640
    }
  },
  components: {
    Head
  },
  methods: {
    goback() {
      this.$router.replace('/Login')
    },
    setSize1() {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.screenWidth = width;
      //图片                高 / 宽  500 / 1920
      this.bannerHeight = 640 / 1366 * this.screenWidth
      // let label = document.getElementById('el-carousel');
      let label = this.$refs.tag;
      // label.style.height = this.bannerHeight + 'px';
      label.offsetHeight = this.bannerHeight + 'px';
    },
    setSize() {
      this.bannerHeight = 640 / 1366 * this.screenWidth
      let label = this.$refs.tag;
      label.offsetHeight = this.bannerHeight + 'px';
    },
  }, mounted() {
    this.setSize1();
    const that = this;
    //监听浏览器窗口大小改变
    window.addEventListener('resize', function () {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      that.screenWidth = width;
      that.setSize();
    }, false);
  }
}
</script>
<style>
a{
  text-decoration: none;
  font-size: 30px;
}
.home{
  height: 1024px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.banner .block img{
  width: 100%;
}
.banner, .banner .block, .banner >>> .el-carousel .el-carousel--horizontal, .block >>> .el-carousel__container{
  height: 100%!important;
  overflow: hidden;
}
#main{
  width: 750px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}

</style>
