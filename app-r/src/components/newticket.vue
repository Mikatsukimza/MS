<template>
  <div id="newticket">
<h3>新增发票地址</h3>
    <el-form :model="ticketData" :rules="rules" ref="ticketData" label-width="30%">
<!--      <el-form-item label="人员ID">-->
<!--        <el-input v-model="ticketData.manID" prop="manID"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="单位名称">
        <el-input v-model="ticketData.unitname" prop="unitname"></el-input>
      </el-form-item>
      <el-form-item label="税号">
        <el-input v-model="ticketData.faxID" prop="faxID"></el-input>
      </el-form-item>
      <el-form-item label="注册地址">
        <el-input v-model="ticketData.registadd" prop="registadd"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="ticketData.tel" prop="tel"></el-input>
      </el-form-item>
      <el-form-item label="开户银行">
        <el-input v-model="ticketData.bankname" prop="bankname"></el-input>
      </el-form-item>
      <el-form-item label="银行账号">
        <el-input v-model="ticketData.bankaccount" label="银行账号" prop="bankaccount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="insertTicket">新增</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Head from "@/components/Head";
export default {
  name: "newticket",
  components: {Head},
  data() {
    return {
      ticketData: {
        unitname: '',
        faxID: '',
        bankname: '',
        bankaccount: '',
        tel: '',
        registadd: ''
      },
      rules:{}
    }
  },
  methods: {
    insertTicket() {
      this.$axios({
        url: '/insertticket',
        params: {
          unitname: this.ticketData.unitname,
          faxID: this.ticketData.faxID,
          bankname: this.ticketData.bankname,
          bankaccount: this.ticketData.bankaccount,
          tel: this.ticketData.tel,
          registadd: this.ticketData.registadd,
          manID: this.$store.state.manID
        }
      }).then((res) => {
        if(res.code==201){
          this.$message("新增成功")
        }else if(res.code==200){
          this.$message("操作失败")
        }else{
          this.$message("没有登录信息")
        }
      })
    },
    goback(){
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
#newticket{
  width: 650px;
  position: absolute;
  margin-left: 250px;
}
</style>