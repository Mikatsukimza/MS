<template>
<div id="visitorhistory">
  <el-table
      :data="visitorh" :rules="rules" ref="visitorh">
    <el-table-column prop="visitTime" label="来访时间">
    </el-table-column>
    <el-table-column prop="visitorname" label="来访者姓名">
    </el-table-column>
    <el-table-column prop="visitorID" label="身份证号">
    </el-table-column>
    <el-table-column prop="roomID" label="房间号">
    </el-table-column>
    <el-table-column prop="mastername" label="被访者姓名">
    </el-table-column>
  </el-table>
<!--  <el-button @click="goback">返回</el-button>-->
</div>
</template>

<script>
export default {
  name: "visitorhistory",
  data() {
    return {
      visitorh: [],
      rules: {}
    }
  },
  mounted() {
    this.$axios({
      url: '/getvisitorhistory',
      params: {manID: this.$store.state.manID}
    }).then((res) => {
      console.log("访客历史记录");
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        this.visitorh.push(res.data[i]);
      }

    }).catch((err) => {
      console.log(err);
    })
  },
  methods: {
    goback() {
      this.$router.replace('/visitors')
    }
  }
}
</script>

<style scoped>

</style>