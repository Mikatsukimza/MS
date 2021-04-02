<template>
<div id="register">
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="20%" class="demo-ruleForm">
  <el-form-item label="姓名"><el-input v-model="ruleForm.name"></el-input></el-form-item>
  <el-form-item label="身份证号"><el-input v-model="ruleForm.ID"></el-input></el-form-item>
  <el-form-item label="性别"><el-input v-model="ruleForm.sex" placeholder="女性请填0，男性请填1"></el-input></el-form-item>
  <el-form-item label="手机号"><el-input v-model="ruleForm.phone"></el-input></el-form-item>
  <el-form-item label="年龄"><el-input v-model="ruleForm.age"></el-input></el-form-item>
  <el-form-item label="注册密码"><el-input v-model="ruleForm.pass"></el-input></el-form-item>
<!--  <el-form-item label="确认密码"><el-input v-model="ruleForm.repass"></el-input></el-form-item>-->
  <el-form-item><el-button @click="registUser">确定注册</el-button>
  <el-button @click="goback">返回</el-button></el-form-item>
</el-form>
</div>
</template>

<script>
export default {
  name: "register",
  methods: {
    goback() {
      this.$router.replace('/login')
    },
    registUser() {
      this.$axios({
        url:'/registers',
        params:{
          name:this.ruleForm.name,
          ID:this.ruleForm.ID,
          sex:this.ruleForm.sex,
          pass:this.ruleForm.pass,
          phone:this.ruleForm.phone,
          age:this.ruleForm.age
        },
        method:"POST"
      }).then(res=>{
        console.log("res.data.status" + res.status);
        if(res.status=="200"){
          this.$message('注册成功')
          this.$router.push('/login')
        }else{
          this.$message('注册失败')
        }
      })
    }
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        name: '',
        ID: '',
        phone: '',
        sex: '',
        pass: '',
        repass: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        name: [
          {validator: checkName, trigger: 'blur'}
        ],
        repass: [
          {validator: checkPass, trigger: 'blur'}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>