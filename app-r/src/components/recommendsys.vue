<template>
<div id="recommendsys">
  <el-table :data="sysData" class="data_table">
    <el-table-column label="服务ID" prop="serviceID"></el-table-column>
    <el-table-column label="服务名称" prop="servicename"></el-table-column>
    <el-table-column label="价格" prop="price"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="sysData">
      <el-button @click="insertservice(sysData.$index,sysData.row)">添加到我的库</el-button>
      <el-button @click="choosethis(sysData.$index,sysData.row)">选择该服务</el-button>
</template>
    </el-table-column>
  </el-table>
<!--  <el-button @click="goback">返回</el-button>-->
</div>
</template>

<script>
export default {
  name: "recommendsys",
  data:function(){
    return {
      sysData:[]
    }
  },
  mounted() {
    this.$axios('/getRecSer').then((res) => {
      console.log("系统推荐");
      console.log(res.data);
      for(var i=0;i<res.data.length;i++){
        this.sysData.push(res.data[i])
      }
    }).catch((err) => {
      console.log(err);
    })
  },
  methods:{
    insertservice(index,data){
      console.log("index:row" + index,data);
      this.$axios({
        url:'/insertservice',
        params:{
          manID:this.$store.state.manID,
          serviceID:data.serviceID,
          price:data.price,
          servicename:data.servicename
        }
      }).then((res)=>{
        if(res.code==201){
          this.$message("您已添加成功至库");
        }else if(res.code==200){
          this.$message("您的库中已存在该服务");
        }else{
          this.$message("ERROR")
          console.log(res.msg.sqlMessage);
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
      goback(){
        this.$router.replace('/');
      },
    choosethis(index,data) {
      var date = new Date();
      var seperator1 = "/";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
          +" " + date.getHours() + ":" + date.getMinutes() +":" + date.getSeconds();
      console.log(currentdate);
      this.$axios({
        url:'/addtotalprice',
        params:{
          manID:this.$store.state.manID,
          totaldate:currentdate,
          serviceID:data.serviceID,
          totalprice:data.price,
          servicename:data.servicename,
          paid:0
        }
      }).then((res)=>{
        if(res.code==201){
          this.$message("您已选择该服务，请稍等...");
      }else if(res.code==200){
          this.$message("请勿重复操作！");
        }else{
          this.$message("没有登录信息，无法操作")
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>