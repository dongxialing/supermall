<template>
  <div>
    <div  class="icon-selector" :class="{'selectorActive':checked}"  @click="checkedChange">
      <img src="~assets/img/cart/tick.svg">
    </div>
  </div>

</template>

<script>
export default {
name: "CheckBottom",
  props:{
  checked:{
    type:Boolean,
    default:true,
  }
  },
  data(){
  return{
    check:''
  }
  },
  methods:{
    checkedChange(){
      this.$emit('checkBtnClick')

    }
  }


}
</script>

<style scoped>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}

.selectorActive {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>
