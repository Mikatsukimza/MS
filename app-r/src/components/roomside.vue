<template>
<div id="roomside">
    <router-link to="/checkin">入住</router-link><br>
    <router-link to="/checkout">退房/续住</router-link>
</div>
</template>

<script>
import Head from "@/components/Head";

export default {
  name: "roomside",
  components:Head
}
</script>

<style scoped>

</style>