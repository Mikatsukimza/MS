<template>
<div id="visitors">
<!--  <el-container>-->
<!--    <Head></Head>-->
    <visitorside></visitorside>
<!--    <el-main>-->
<!--      <visitorserv></visitorserv>-->
<!--      <visitorhistory></visitorhistory>-->
<!--    </el-main>-->
<!--  </el-container>-->
</div>
</template>

<script>
import Head from "@/components/Head";
import Visitorside from "@/components/visitorside";
import Visitorhistory from "@/components/visitorhistory";
import Visitorserv from "@/components/visitorserv";
export default {
  name: "visitors",
  components: {Visitorserv, Visitorhistory, Visitorside, Head}
}
</script>

<style scoped>

</style>