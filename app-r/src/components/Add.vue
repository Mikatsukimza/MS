<template>
  <div id="add">
    <el-popover
        placement="right"
        width="400"
        trigger="click">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="序号">
          <el-input v-model="sizeForm.id"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="sizeForm.classes"></el-input>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="sizeForm.specification"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家">
          <el-input v-model="sizeForm.manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="sizeForm.price"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="sizeForm.note"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit()">立即保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-edit" slot="reference">添加</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "Add",
  data() {
    return {
      sizeForm: {
        id:'',
        classes:'',
        name:'',
        specification: '',
        manufacturer: '',
        price: '',
        note: ''
      }
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      this.$axios({
        baseURL:'http://localhost:8081',
        url:'/add',
        params: {
          id: this.sizeForm.id,
          classes:this.sizeForm.classes,
          name:this.sizeForm.name,
          specification:this.sizeForm.specification,
          manufacturer:this.sizeForm.manufacturer,
          price:this.sizeForm.price,
          note:this.sizeForm.note
        }
      }).then((res)=>{
        console.log("----------------------");
        console.log(res.data);
      }).cache((err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
  #add{
    margin-right: 1200px;
  }
</style>