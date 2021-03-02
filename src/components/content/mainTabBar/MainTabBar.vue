<template>
  <TarBar>
    <TarBarItem path="/home">
      <template v-slot:item-active><img src="@/assets/img/tabBar/home.svg"></template>
      <template v-slot:item-active-icon><img src="@/assets/img/tabBar/home_active.svg"></template>
      <template v-slot:item-text><div>首页</div></template>
    </TarBarItem>
    <TarBarItem path="/category">
      <template v-slot:item-active><img src="@/assets/img/tabBar/category.svg"></template>
      <template v-slot:item-active-icon><img src="@/assets/img/tabBar/category_active.svg"></template>
      <template v-slot:item-text><div>分类</div></template>
    </TarBarItem>
    <TarBarItem path="/cart">
      <template v-slot:item-active><img src="@/assets/img/tabBar/shopCart.svg"></template>
      <template v-slot:item-active-icon><img src="@/assets/img/tabBar/shopCart_active.svg"></template>
      <template v-slot:item-text><div>购物车</div></template>
    </TarBarItem>
    <TarBarItem path="/profile">
      <template v-slot:item-active><img src="@/assets/img/tabBar/profile.svg"></template>
      <template v-slot:item-active-icon><img src="@/assets/img/tabBar/profile_active.svg"></template>
      <template v-slot:item-text><div>我的</div></template>
    </TarBarItem>
  </TarBar>
</template>

<script>
import TarBar from "@/components/common/tabbar/TarBar";
import TarBarItem from "@/components/common/tabbar/TarBarItem";

export default {
name: "MainTabBar",
  components:{
    TarBar,
    TarBarItem
  }
}
</script>

<style scoped>

</style>
