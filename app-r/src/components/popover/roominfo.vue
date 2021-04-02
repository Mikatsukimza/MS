<template>
<!--  <span>-->
<!--    <el-popover title="预定信息" trigger="click">-->
<!--      <template slot-scope="scope">-->
<!--        <el-form :model="tableData" ref="tableData" label-width="20%">-->
<!--        <el-form-item label="入住人数"><el-input v-model="tableData.num" placeholder="请填写入住人数，不可超过3人"></el-input></el-form-item>-->
<!--        <el-form-item label="入住人姓名"><el-input v-model="tableData.name" placeholder="如果是多人入住，填写一人信息即可"></el-input></el-form-item>-->
<!--        <el-form-item label="入住人身份证号"><el-input v-model="tableData.ID" placeholder="如果是多人入住，填写一人信息即可"></el-input></el-form-item>-->
<!--        <el-form-item label="入住人手机号"><el-input v-model="tableData.phone" placeholder="如果是多人入住，填写一人信息即可"></el-input></el-form-item>-->
<!--        <el-form-item label="客房"><el-input v-model="tableData.price"></el-input></el-form-item>-->
<!--        <el-form-item>-->
<!--  </el-form-item>-->
<!--  <el-form-item>-->
<!--    <el-button @click="checkinroom">确认入住</el-button>-->
<!--  <el-button @click="goback">返回</el-button>-->
<!--  </el-form-item>-->
<!--</el-form>-->
<!--      </template>-->

<!--    </el-popover>-->
<!--  </span>-->
  <el-popover
      placement="top"
      width="160"
      v-model="visible2">
    <p>这是一段内容这是一段内容确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
      <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
    </div>
    <el-button slot="reference">预定该间</el-button>
  </el-popover>
</template>

<script>
export default {
  name: "roominfo",
  data() {
    return {
      tableData: [{
        name: '',
        ID: '',
        phone: '',
        num: '1'
      }

      ]
    }
  },
  methods:{
    goback(){
      this.$router.replace('/checkin')
    }
  }
}
</script>

<style scoped>

</style>