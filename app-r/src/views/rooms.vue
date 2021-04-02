<template>
<div id="rooms">
  <roomside></roomside>
  <el-form label-width="20%" :model="tableData" ref="tableData" :rules="rules">
    <el-form-item label="房间号">
      <el-input v-model="tableData.roomID"></el-input>
    </el-form-item>
    <el-form-item label="房间类型">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="预定须知">
      <el-input type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="细节">
      <el-input type="textarea"></el-input>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import Roomside from "@/components/roomside";
export default {
  name: "rooms",
  components: {Roomside},
  data(){
    return{
      tableData:[{
        roomID:'',
        roomtype:'',
        bookNotes:'',
        detail:'',
        type:'',
        price:'',
        checkin:''
      }]
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>