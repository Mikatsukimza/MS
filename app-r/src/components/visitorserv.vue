<template>
<div id="visitorserv">
  <h3>访客预约系统</h3>
  <el-form :model="visitForm"  :rules="rules" ref="ruleForm" label-width="20%" class="demo-ruleForm">
    <el-form-item label="来访者姓名" prop="name">
      <el-input placeholder="请输入姓名" v-model.number="visitForm.visitorname" clearable></el-input>
    </el-form-item>
    <el-form-item label="来访者身份证号" prop="idcard">
      <el-input placeholder="请输入身份证号" v-model="visitForm.visitorID"></el-input>
    </el-form-item>
    <el-form-item label="来访时间" prop="dates">
      <el-time-picker v-model="visitForm.visitTime"></el-time-picker>
    </el-form-item>
    <el-form-item label="房间号">
      <el-input v-model="visitForm.roomID"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="visitcheck">确定</el-button>
<!--      <el-button @click="goback">返回</el-button>-->
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import Head from "@/components/Head";
export default {
  name: "visitorserv",
  components: {Head},
  data() {
    return {
      visitForm: {
        visitorname: '',
        visitorID: '',
        roomID: '',
        visitTime: '',
        manID: ''
      },
      rules: {
        idCards: [
          {required: true, message: "身份证号不能为空", trigger: "blur"},
          {validator: this.validID, trigger: "blur"}
        ]
      },
      options: []
    }
  },
  methods: {
    validID(rule, value, callback) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(value)) {
        this.go(value.length);
        callback();
      } else {
        callback(new Error("身份证号码不正确"));
      }
    },
    goback() {
      this.$router.replace('/visitors')
    },
    visitcheck() {
      console.log(this.visitForm.visitTime)
      var date = this.visitForm.visitTime;
      var seperator1 = "-";
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
      this.$axios({
        url: '/addvisitorser',
        params: {
          mastername: this.$store.state.name,
          roomID: this.visitForm.roomID,
          manID: this.$store.state.manID,
          visitorname: this.visitForm.visitorname,
          visitorID: this.visitForm.visitorID,
          visitTime: currentdate
        }
      }).then((res) => {
        console.log(res);
        if (res.code == 201) {
          alert("预约成功");
        } else if (res.code == 200) {
          alert("预约失败");
        } else {
          alert("操作失败");
        }
      })
    }
  }
}
</script>

<style scoped>
#visitorserv{
  width: 650px;
  position: absolute;
  margin-left: 250px;
}
</style>