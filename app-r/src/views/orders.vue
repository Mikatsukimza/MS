<template>
<div id="orders">
<h3>历史订单信息</h3>
    <el-table :data="orderhis">
      <el-table-column label="订单号" prop="orderID"></el-table-column>
      <el-table-column label="房间号" prop="roomID"></el-table-column>
      <el-table-column label="入住日期" prop="checkintime" :formatter="dateFormat"></el-table-column>
      <el-table-column label="退房时间" prop="checkoutime" :formatter="dateFormat"></el-table-column>
<!--      <el-table-column label="人员ID" prop="manID"></el-table-column>-->
      <el-table-column label="续住" prop="staywith"></el-table-column>
<!--      <el-table-column label="价格" prop="price"></el-table-column>-->
    </el-table>
<!--  <el-button @click="goback">返回</el-button>-->
<!--  </el-container>-->
</div>
</template>

<script>
import Head from "@/components/Head";
import moment from "moment";
export default {
  name: "orders",
  components: {Head},

  data() {
    return {
      orderhis: []
    }
  },
  mounted() {
    this.$axios({
      url: '/getorders',
      params: {manID: this.$store.state.manID}
    }).then((res) => {
      console.log("订单历史记录");
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        this.orderhis.push(res.data[i]);
      }

    }).catch((err) => {
      console.log(err);
    })
  },
  methods: {
    goback() {
      this.$router.replace('/');
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return ''
      }
      return moment(date).format("YYYY-MM-DD")
    }
  }
}
</script>

<style scoped>

</style>