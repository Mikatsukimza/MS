<template>
  <div id="aboutme">
    <h3>个人信息</h3>
      <el-form :model="tableData" ref="tableData" :rules="rules" label-width="30%">
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="tableData.name"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model.trim="tableData.sex" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="ID">
          <el-input v-model.trim="tableData.ID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="roomID">
          <el-input v-model.trim="tableData.roomID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="tableData.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwds">
          <el-input v-model.trim="tableData.pwds" :type="passw">
            <i slot="suffix" :class="icon" @click="showPass"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="changemsg">修改</el-button>
          <el-button @click="goback">返回</el-button>
        </el-form-item>
        </el-form>
  </div>

</template>

<script>
import Head from "@/components/Head";
export default {
  name: "aboutme",
  data() {
    return {
      tableData: [{
        name: '',
        sex: '',
        ID: '',
        roomID: '',
        phone: '',
        pwds: ''
      }],
      rules:{},
      icon:"el-input__icon el-icon-view",
      passw:"password"
    }
  },
  mounted() {
    // console.log("this.$store.state.manID:" + this.$store.state.manID)
    this.$axios({
      url: '/getPeoMessage',
      params: {manID: this.$store.state.manID}
    }).then((res) => {
      let rets = JSON.parse(JSON.stringify(res))
      console.log(rets.data[0])
      for (var i = 0; i < rets.data.length; i++) {
        this.tableData=res.data[i];
      }
      let str = this.tableData.ID;
      this.tableData.ID = str.replace(/(\w{6})\w*(\w{4})/, '$1******$2');
      let sexs = this.tableData.sex;
      if(sexs==0){
        this.tableData.sex = '女';
      }else{
        this.tableData.sex = '男';
      }
      let phones = this.tableData.phone;
      this.tableData.phone = phones.replace(/^(\d{3})\d+(\d{4})$/, "$1****$2");

    }).catch((err) => {
      console.log(err);
    })
  },
  components: {
    Head
  },
  methods: {
    goback() {
      this.$router.replace('/')
    },
    changemsg() {
      this.$axios({
        url:'/changepersonmsg',
        params:{
          manID:this.$store.state.manID,
          pwds:this.tableData.pwds,
          phone:this.tableData.phone
        }
      }).then((res)=>{
        if(res.code==201){
          this.$message("修改成功")
        }else{
          this.$message("操作失败")
        }
      }).catch((err)=>{
        console.log(err)
      })
    },showPass(){
      //点击图标是密码隐藏或显示
      if( this.passw=="text"){
        this.passw="password";
        //更换图标
        this.icon="el-input__icon el-icon-view";
      }else {
        this.passw="text";
        this.icon="el-input__icon el-icon-loading";
      }
    },
    hide(){
      let str = this.tableData.ID;
      this.tableData.ID = str.replace(/(\w{10})\w*(\w{2})/, '$1******$2');
      console.log(str)
    }
  }
}
</script>

<style scoped>
#aboutme{
  width: 650px;
  position: absolute;
  margin-left: 250px;
}
</style>