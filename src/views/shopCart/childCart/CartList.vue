<template>
<div class="cart-list" >
<CartListItem v-for="item in cartList" :item-info="item"/>
</div>
</template>

<script>
import CartListItem from "views/shopCart/childCart/CartListItem";
export default {
name: "CartList",
  components:{
    CartListItem,
  },
  data(){
  return{
    cartList: this.$store.state.cartList
  }
  }
}
</script>

<style scoped>
.cart-list{

}
</style>
