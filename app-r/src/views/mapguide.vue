<template>
<div id="mapguide">
  <h3>路径规划</h3>
    <el-form :model="mapData" ref="mapData">
      <el-form-item label="您目前所在地"><span>深圳市罗湖区建设路1002号(火车站东侧)</span></el-form-item>
      <el-form-item label="目的地">
        <el-select v-model="mapData.value" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="checkmap">查询</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  <div>
    <el-form :model="checkData" ref="checkData">
      <el-form-item label="步行"><span>{{checkData.walk}}</span></el-form-item>
<!--      <el-form-item label="步行示意图"><img :src=""></el-form-item>-->
      <el-form-item label="驾车"><span>{{checkData.drive}}</span></el-form-item>
<!--      <el-form-item label="驾车示意图"><span><img :src="checkData.driveimg"></span></el-form-item>-->
<!--      <el-form-item label="驾车示意图"><img src="../imgs/1-bus.png"></el-form-item>-->
      <el-form-item label="公交地铁"><span>{{checkData.bus}}</span></el-form-item>
<!--      <el-form-item label="公交地铁示意图"><span><img :src="checkData.busimg"></span></el-form-item>-->
    </el-form>
  </div>

</div>
</template>
<script>
import Head from "@/components/Head";
export default {
  name: "mapguide",
  components: {Head},
  data() {
    return {
      mapData:[{
        loc:'深圳市罗湖区建设路1002号(火车站东侧)',
        destination:''
      }],
      options: [{
        value: '1',
        label: '深圳宝安国际机场(公交站)'
      }, {
        value: '2',
        label: '深圳北站'
      }, {
        value: '3',
        label: '深圳罗湖口岸'
      }, {
        value: '4',
        label: '深圳湾口岸',
      }],
      checkData:[{
        walk:'',
        drive:'',
        bus:'',
        walkimg:'',
        driveimg:'',
        busimg:''
      }],
      props:{
        busimg:String
      },
      imgsInfo:[
        // {busimg1:'../imgs/1-bus.png'},
        // {busimg2:'../imgs/2-bus.png'},
        // {busimg3:'../imgs/3-bus.png'},
        // {walkimg1:'../imgs/1-walk.png'},
        // {walkimg2:'../imgs/2-walk.png'},
        // {walkimg3:'../imgs/3-walk.png'},
        // {driveimg1:'../imgs/1-drive.png'},
        // {driveimg2:'../imgs/2-drive.png'},
        // {driveimg3:'../imgs/3-drive.png'},
        {
          value:1,
          busimg1:'../imgs/1-bus.png',
          walkimg1:'../imgs/1-walk.png',
          driveimg1:'../imgs/1-drive.png'
        }
      ]
    }
  },
  methods:{
    goback(){
      this.$router.replace('/')
    },
    checkmap(){
      console.log(this.mapData.value)
      this.$axios({
        url:'/checkmap',
        params:{
          value:this.mapData.value
        }
      }).then((res)=>{
        let str = JSON.parse(JSON.stringify(res))
        console.log(str)
        if(str.code==200){
          this.checkData=str.data[0];
          console.log(str.data[0].driveimg)
        }else{
          this.$message("有什么地方出问题了...")
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#mapguide{
  width: 650px;
  position: absolute;
  margin-left: 250px;
}
</style>