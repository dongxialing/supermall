<template>
<div class="toast" v-show="isToastShow">
  <div class="message">{{message}}</div>
</div>
</template>

<script>
export default {
name: "Toast",
  props:{
  message:{
    type:String,
    default:''
  },
    isToastShow:{
    type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>
.toast{
  position:fixed;
  left: 50%;
  top: 50%;
  color:#fff;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,0.6);
}
.message{
  margin:10px;
}
</style>
