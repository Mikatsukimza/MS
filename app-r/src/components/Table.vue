<template>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableData2: [],
      search: '',
      sizeForm: {
        name: ''
      },
      sizeForm2: {
        id:'',
        classes:'',
        name:'',
        specification: '',
        manufacturer: '',
        price: '',
        note: ''
      }
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$axios({
        baseURL:'http://localhost:8081',
        url:'/getList2',
        params: {
          id: row.id
        }
      }).then((res)=>{
        console.log(res.data);
        this.tableData2=res.data.data;
        console.log(this.tableData2);
      }).cache((err)=>{
        console.log(err);
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
      /*删除数据库中的数据*/
      this.$axios({
        baseURL: 'http://localhost:8081',
        url: '/delete',
        params: {
          id: row.id
        }
      }).then((res) => {
        /*this.msg = res.data.msg;*/
        console.log(res.data);
      })
      /*删除网页表格显示数据*/
      this.tableData.splice(index,1);
    },
    onSubmit(index,row) {
      console.log('submit!');
      this.$axios({
        baseURL:'http://localhost:8081',
        url:'/edit',
        params: {
          i:index,
          id: row.id,
          classes:row.classes,
          name:row.name,
          specification:row.specification,
          manufacturer:row.manufacturer,
          price:row.price,
          note:row.note
        }
      }).then((res)=>{
        console.log("----------------------");
        console.log(res.data);
      }).cache((err)=>{
        console.log(err);
      })
    },
    handleClose(row){
      row.name=this.tableData2.name
    },
    onSubmit2() {
      console.log('submit!');
      this.$axios({
        baseURL:'http://localhost:8081',
        url:'/add',
        params: {
          id: this.sizeForm2.id,
          classes:this.sizeForm2.classes,
          name:this.sizeForm2.name,
          specification:this.sizeForm2.specification,
          manufacturer:this.sizeForm2.manufacturer,
          price:this.sizeForm2.price,
          note:this.sizeForm2.note
        }
      }).then((res)=>{
        console.log("----------------------");
        console.log(res.data);
        this.tableData.push(this.sizeForm2);
      }).cache((err)=>{
        console.log(err);
      })
    }
  },
  mounted(){
    this.$axios({
      /*baseURL:'http://localhost:8081',*/
      url:'/getList',
      type:'get'
    }).then((res)=>{
      console.log(res.data);
      this.tableData=res.data.data;
    }).cache((err)=>{
      console.log(err);
    })
  }
}
</script>

<style scoped>
/*整个框架的样式*/
  #table{
    width: 90%;
    margin: auto;
    /*弹性布局*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #edit{
    margin-right: 14px;
  }
  #add{
    margin-right: 1200px;
  }
</style>