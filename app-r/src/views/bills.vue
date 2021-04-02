<template>
<div id="bills">
<!--  <el-container>-->
<!--    <Head></Head>-->
    <el-table :data="billmsg">
      <el-table-column prop="totaldate" label="日期" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="serviceID" label="服务ID"></el-table-column>
      <el-table-column prop="servicename" label="服务内容"></el-table-column>
      <el-table-column prop="totalprice" label="价格"></el-table-column>
      <el-table-column prop="paid" label="操作">
        <template slot-scope="sysData">
          <div>
            <el-button  @click="paypal(sysData.$index,sysData.row)">{{sysData.row.paid==0?"现在支付":"已支付"}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
<!--<el-button @click="goback">返回</el-button>-->
</div>
</template>

<script>
import Head from "@/components/Head";
import moment from 'moment'
export default {
  name: "bills",
  components: {Head},
  data: function () {
    return {
      billmsg: [],
      paid:''
    }
  },
  mounted() {
    this.$axios({
      url: '/getBillshis',
      params: {manID: this.$store.state.manID}
    }).then((res) => {
      console.log("账单历史记录");
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        this.billmsg.push(res.data[i]);
      }

    }).catch((err) => {
      console.log(err);
    })
  },
  methods: {
    goback() {
      this.$router.replace('/')
    },
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return ''
      }
      ;
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },
    paypal(index, data) {
      this.$axios({
        url: '/paybills',
        params: {
          manID: this.$store.state.manID,
          serviceID: data.serviceID,
          paid: data.paid
        }
      }).then((res) => {
        if (res.code == 201) {
          this.$message("已完成支付");
        } else {
          this.$message("操作失败");
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