<template>
 <NavBar class="nav-bar" >
   <template v-slot:left>
     <div class="left" @click="imgClick">
       <img src="@/assets/img/common/back.svg">
     </div>
   </template>
   <template v-slot:center>
     <div class="center">
     <div v-for="(item,index) in titles"
          class="item"
           :class="{activeColor:currentIndex === index}"
           @click="itemClick(index)">
       {{item}}
     </div>
     </div>
   </template>
 </NavBar>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  props:{
    currentIndex:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  data(){
    return {
      titles:['商品', '参数', '评论', '推荐'],

    }
  },
methods:{
  itemClick(index){
      this.currentIndex = index;
      this.$emit('navbarClick',this.currentIndex)
  },
  imgClick(){
    this.$router.go(-1);
  }
},
}
</script>

<style scoped>
.nav-bar{
  background-color: #fff;
}
.center{
  display: flex;
  text-align: center;
}
.item{
  flex: 1;
  font-size: 15px;
}
.left img{
  margin-top:12px;
}
.activeColor{
  color:var(--color-high-text);
}
</style>
