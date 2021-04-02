<template>
<div id="checkin">
  <h3>空房情况</h3>
  <div class="block">
    <span class="demonstration">选择入住时间</span>
    <el-date-picker
        v-model="value7"
        type="daterange"
        align="right"
        value-format="yyyy-MM-dd"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
    </el-date-picker>
  </div>
  <el-table :data="roomData">
    <el-table-column label="房间类型" prop="roomtype"></el-table-column>
    <el-table-column label="价格" prop="price"></el-table-column>
    <el-table-column label="预定须知" prop="bookNotes"></el-table-column>
    <el-table-column label="细节" prop="detail"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="chooseroom(scope.$index,scope.row)">预定该间</el-button>
      </template>

    </el-table-column>
  </el-table>
</div>
</template>

<script>
import Head from "@/components/Head";
import Roominfo from "@/components/popover/roominfo";

export default {
  name: "checkin",
  components: {Head},
  data() {
    return {
      roomData: [],
      value7: ''
    }
  },
  methods: {
    goback() {
      this.$router.push('/rooms')
    },
    chooseroom(index, data) {
      console.log(this.value7);
      let str1 = this.value7[0];
      let str2 = this.value7[1];
      console.log(str1,str2)
      this.$axios({
        url: '/chooseroom',
        params: {
          manID: this.$store.state.manID,
          checkintime:str1,
          roomID: data.roomID,
          checkoutime: str2
        },
        method:"POST"
      }).then((res) => {
        console.log(res.msg.sqlMessage)
        if (res.code == 201) {
          this.$message("预定成功");
          this.$router.push({name:'checkindetail',query:{manID: this.$store.state.manID,roomID: data.roomID}})
        } else {
          this.$message("操作失败")
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.$axios({
      url: '/getRoomInfo'
    }).then((res) => {
      let str = JSON.parse(JSON.stringify(res))
      console.log(str)
      for (var i = 0; i < res.data.length; i++) {
        this.roomData.push(str.data[i])
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>