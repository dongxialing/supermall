<template>
  <div class="cart">
   <NavBar class="nav-bar"><template v-slot:center>购物车({{count}})</template></NavBar>
  <Scroll class="content" ref="scroll">
  <CartList/>
  </Scroll>
  <CartBottomBar/>

  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import CartList from "views/shopCart/childCart/CartList";
import CartBottomBar from "views/shopCart/childCart/CartBottomBar";
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "ShopCart",
  data(){
    return{
      count:this.$store.state.cartList.length,
    }
  },
  components:{
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,

},
}
</script>

<style scoped>
.cart{
  text-align: center;
  height:100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color:#fff;

}
.content{
  height:calc(100% - 44px - 49px - 44px)
}
</style>
