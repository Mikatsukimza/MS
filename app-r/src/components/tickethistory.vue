<template>
<div id="tickethistory">
<el-table :data="ticketData" :rules="rules" ref="ticketData">
  <el-table-column label="单位名称" prop="unitname"></el-table-column>
  <el-table-column label="税号" prop="faxID"></el-table-column>
  <el-table-column label="注册地址" prop="registadd"></el-table-column>
  <el-table-column label="电话号码" prop="tel"></el-table-column>
  <el-table-column label="开户银行" prop="bankname"></el-table-column>
  <el-table-column label="银行账户" prop="bankaccount"></el-table-column>
  <el-table-column label="操作">
    <template slot-scope="scope">
    <el-button @click="changeticket">开票</el-button>
    <el-button @click="deleteticket(scope.$index,scope.row)">删除</el-button>
    </template>
  </el-table-column>
</el-table>
<!--  <el-button @click="goback">返回</el-button>-->
</div>
</template>

<script>
import store from "@/vuex/store";
export default {
  name: "tickethistory",
  data: function () {
    return {
      ticketData: [],
      rules: {}
    }
  },
  mounted() {
    console.log("manID:" + this.$store.state.manID);
    this.$axios({
          url: '/getTicketHis',
          params: {manID: this.$store.state.manID}
        }
    ).then((res) => {
      console.log("发票历史记录");
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        this.ticketData.push(res.data[i])
      }
    }).catch((err) => {
      console.log(err);
    })
  },
  methods: {
    deleteticket(index,data) {
      this.$axios({
        url:'/deleteticket',
        params:{
          manID:this.$store.state.manID,
          faxID:data.faxID
        }
      }).then((res)=>{
        if(res.code==201){
          this.$message("删除成功");
        }else{
          this.$message("操作失败");
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    goback() {
      this.$router.replace('/')
    },
    changeticket() {
      this.$message('已开票，请到一楼服务大厅领取');
    }
  }
}
</script>

<style scoped>

</style>