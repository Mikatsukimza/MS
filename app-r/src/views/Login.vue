<template>
    <div id="Login">
      <h3>请登录</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入用户名" v-model.number="ruleForm.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <a @click="loginFace">使用人脸识别登录</a>
        </el-form-item>
        <el-form-item>
          <a @click="regist">啥也没有？点击注册</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import Head from "@/components/Head";
export default {
  components: {Head},
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
    return {
      ruleForm: {
        userName: '',
        pass: '',
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        name: [
          {validator: checkName, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      this.$axios({
        url: '/login',
        params: {
          userName: this.ruleForm.userName,
          userPw: this.ruleForm.pass
        },
        method: "POST"
      }).then(res => {
        console.log("ssss");
        console.log(res.token);
        console.log(res.data[0].name);
        console.log(res.data[0].manID);
        window.localStorage.setItem('token', res.token);
        window.localStorage.setItem('name', res.data[0].name);
        window.localStorage.setItem('ID', res.data[0].manID);
        this.$store.commit("set_token", res.token);
        this.$store.commit("setUserInfo", res.data[0].name);
        this.$store.commit("setUserId", res.data[0].manID);
        let a = window.localStorage.getItem('token');
        console.log("a:" + a);
        console.log("this.$store.state.token:" + this.$store.state.token);
        if(this.$store.state.token){
          this.$router.push('/');
        }else{
          this.$router.replace('/login')
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    loginFace() {
      this.$router.replace('/Face')
    },
    regist() {
      this.$router.replace('/register')
    }
  }
}
</script>

<style scoped>
#Login{
  width: 650px;
  position: absolute;
  margin-left: 250px;
}
</style>