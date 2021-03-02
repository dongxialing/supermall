<template>
<div class="back-top" @click="backTop">
  <img src="~assets/img/common/top.png">
</div>
</template>

<script>
export default {
  name: "BackTop",
  methods:{
    backTop(){
      this.$emit('backTop')
    }
  }
}
</script>

<style scoped>
.back-top{
  position: fixed;
  right: 10px;
  bottom: 50px;
  z-index: 9;
}
.back-top img{
  width: 43px;
  height: 43px;
}
</style>
