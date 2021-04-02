<template>
<div id="checkout">
      <h3>我要续住</h3>
          <el-form :model="tableData" ref="tableData" label-width="30%">
            <el-form-item label="续住天数">
              <el-input v-model="tableData.staywith"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="xuzhu">确认续住</el-button>
            </el-form-item>
          </el-form>
  <h3>我要退房</h3>
          <el-button @click="tuifangle">确认退房</el-button>
      <el-button @click="goback">返回</el-button>
</div>
</template>

<script>
import Head from "@/components/Head";
export default {
  name: "checkout",
  components: {Head},
  data() {
    return {
      tableData: [{
        staywith: '',
        roomID:''
      }]
    }
  },
  methods: {
    xuzhu() {
      this.$axios({
        url:'/xuzhu',
        params:{
          staywith:this.tableData.staywith,
          manID:this.$store.state.manID,
          roomID:this.roomID
        }
      }).then((res)=>{
        if(res.code==201){
          this.$message("续住成功")
        }else{
          this.$message("您暂无操作权限")
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    tuifangle() {
      this.$axios({
        url:'/tuifangle',
        params:{
          roomID:this.roomID
        }
      }).then((res)=>{
        console.log(res)
        if(res.code==201){
          this.$axios({
            url:'/personinfochange',
            params:{
              roomID:this.roomID,
              manID:this.$store.state.manID
            }
          }).then((res)=>{
            console.log(res)
            if(res.code==201){
              this.$message("退房成功");
            }else{
              this.$message("您暂无操作权限");
            }
          }).catch((err)=>{
            console.log(err)
          })
        }else{
          this.$message("您暂无操作权限")
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    goback() {
      this.$router.replace('/')
    }
  },
  mounted() {
    console.log("manID"+this.$store.state.manID)
    this.$axios({
      url:'/fetchroommsg',
      params:{
        manID:this.$store.state.manID,
      },
      method:"POST"
    }).then((res)=>{
      console.log(res)
      if(res.code==200){
        this.staywith=res.data[0].staywith;
        this.roomID=res.data[0].roomID;
        console.log("test"+this.staywith,this.roomID);
      }else{
        this.$message("您还没有操作权限哦")
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
#checkout{
  width: 650px;
  position: absolute;
  margin-left: 250px;
}
</style>