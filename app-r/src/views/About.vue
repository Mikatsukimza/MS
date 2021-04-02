<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted(){
    console.log('about');
    console.log(process.env.NODE_ENV);
  }
}
</script>
