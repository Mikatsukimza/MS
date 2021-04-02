<template>
<div id="mypreference">
  <el-table :data="tableData" :rules="rules" ref="tableData">
    <el-table-column label="服务ID" prop="serviceID"></el-table-column>
    <el-table-column label="服务内容" prop="servicename"></el-table-column>
    <el-table-column label="价格" prop="price"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="sysData">
      <el-button @click="choosethis(sysData.$index,sysData.row)">选择该服务</el-button>
      <el-button @click="deleteper(sysData.$index,sysData.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--  <el-button @click="goback">返回</el-button>-->
</div>
</template>

<script>
export default {
  name: "mypreference",
  data() {
    return {
      tableData: [],
      rules: {}
    }
  },
  mounted() {
    console.log("this.$store.state.manID:" + this.$store.state.manID)
    this.$axios({
      url: '/getpreference',
      params: {
        manID: this.$store.state.manID}
    }).then((res) => {
      console.log("偏好记录");
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        this.tableData.push(res.data[i]);
      }

    }).catch((err) => {
      console.log(err);
    })
  },
  methods: {
    goback() {
      this.$router.replace('/personservice')
    },
    deleteper(index,data) {
      this.$axios({
        url:'/deletemyservice',
        params:{
          manID: this.$store.state.manID,
          serviceID: data.serviceID
        }
      }).then((res)=>{
        if(res.code==201){
          this.$message("删除操作成功");
        }else if(res.code==200){
          this.$message("操作失败");
        }else{
          this.$message("没有登录信息，无法操作")
        }
      }).catch((err)=>{
        console.log(err)
      })
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
      console.log("currentdata:" + currentdate);
      this.$axios({
        url: '/addtotalprice',
        params: {
          manID: this.$store.state.manID,
          totaldate: currentdate,
          serviceID: data.serviceID,
          totalprice: data.price,
          servicename:data.servicename,
          paid: 0
        }
      }).then((res) => {
        if (res.code == 201) {
          this.$message("您已选择该服务，请稍等...");
        } else {
          this.$message("请勿重复操作！");
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>