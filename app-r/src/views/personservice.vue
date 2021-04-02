<template>
  <div id="personservice">
<!--    <el-container>-->
<!--      <Head></head>-->
      <serviceside></serviceside>
<!--      <el-main>-->

<!--      </el-main>-->
<!--    </el-container>-->
  </div>
</template>

<script>
import Head from "@/components/Head";
import Serviceside from "@/components/serviceside";
export default {
  name: "personservice",
  components: {Serviceside, Head}
}
</script>

<style scoped>

</style>