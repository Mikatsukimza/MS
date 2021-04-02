<template>
<div id="ticket">
<!--<el-container>-->
<!--  <Head></Head>-->
  <ticketside></ticketside>
<!--  <el-main>-->
<!--  </el-main>-->
<!--</el-container>-->
</div>
</template>

<script>
import Head from "@/components/Head";
import Ticketside from "@/components/ticketside";
import Tickethistory from "@/components/tickethistory";
export default {
name: "ticket",
  components: {Tickethistory, Ticketside, Head}
}
</script>

<style scoped>

</style>