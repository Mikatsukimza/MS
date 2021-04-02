<template>
<div id="checkindetail">
  <h3>查看入住详情</h3>
  <el-button @click="findcheck">点击查看</el-button>
  <div v-if="flag==1">
    <el-form :model="roomData" ref="roomData" id="myrooms">
      <el-form-item label="房间类型"><span>{{roomData.roomtype}}</span></el-form-item>
      <el-form-item label="价格"><span>{{roomData.price}}</span></el-form-item>
      <el-form-item label="预定须知"><span>{{roomData.bookNotes}}</span></el-form-item>
      <el-form-item label="细节"><span>{{roomData.detail}}</span></el-form-item>
    </el-form>
  </div>
  <div v-else>
    <span>暂无查询信息</span>
    <div>
      <img src="../imgs/logo.png">
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "checkindetail",
  methods: {
    findcheck() {
      this.$axios(
          {
            url: '/findcheckin',
            params: {
              manID: this.$store.state.manID,
              roomID: this.$route.query.roomID
            }
          }).then((res) => {
        if (res.code == 200) {
          this.$message('查询成功')
          this.flag = 1;
          console.log(res.data[0])
          let str = JSON.parse(JSON.stringify(res.data[0]))
          this.roomData = str;
        } else {
          this.$message("查询失败")
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  data() {
    return {
      flag: 0,
      roomData: [{
        roomtype: '',
        price: '',
        bookNotes: '',
        detail: ''
      }],
      manID: this.$store.state.manID,
      roomID: this.$route.query.roomID
    }
  },
  mounted() {
    this.$axios(
        {
          url: '/changeroominfo',
          params: {
            manID: this.$route.query.manID,
            roomID: this.$route.query.roomID
          }
        }).then((res) => {
      if (res.code == 201) {
        this.$message("房间状态已更新");
      } else {
        this.$message("暂无房间状态更新信息")
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
#myrooms{
  width: 650px;
  position: absolute;
  margin-left: 250px;
}
</style>