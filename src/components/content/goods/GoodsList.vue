<template>
<div class="goods-list">
  <GoodsListItem v-for="item in goods"
                 :goodsItem="item">
  </GoodsListItem>
</div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
name: "GoodsList",
  components:{
  GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    },
  },
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap:wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
