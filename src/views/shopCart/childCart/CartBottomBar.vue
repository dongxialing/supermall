<template>
<div class="bottom-bar">
  <CheckBottom class="select-all" :checked="isSelectAll" @click.native="selectAll"/>
  <span>全选</span>
  <span class="total-price">合计:￥{{totalPrice}}</span>
  <span class="buy-product">去计算({{goComputed}})</span>
  </div>
</template>

<script>
import CheckBottom from "views/shopCart/childCart/CheckBottom";
export default {
name: "CartBottomBar",
  components:{
    CheckBottom
  },
  computed:{
    totalPrice(){
      const cartList =this.$store.state.cartList;
      return cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item)=> {
        return preValue + item.newPrice * item.count
      },0).toFixed(2)
      },
    goComputed(){
      const cartList =this.$store.state.cartList;
      return cartList.filter(item =>{
        return item.checked
    }).length
    },
    isSelectAll(){
      const length = this.$store.state.cartList.length

      if(length){
        return !this.$store.state.cartList.find(item =>!item.checked)
      }else{
        return false
      }

    },
  },
  methods:{
    selectAll(){
    // 首先判断是否有未选中的按钮
      if(this.$store.state.cartList.find(item =>!item.checked)){
      //  有未选中的，把未选中的checked全部变为true
        this.$store.state.cartList.forEach(item=>item.checked=true)
      }else{
        this.$store.state.cartList.forEach(item=>item.checked=false)
      }
    }
  }
}

</script>

<style scoped>
.bottom-bar{
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.select-all {
  position: absolute;
  line-height: 0;
  left: 15px;
  top: 13px;
}

.total-price {
  margin-left: 9px;
  font-size: 14px;
  color: #666;
}

.buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}

</style>
