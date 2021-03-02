<template>
  <div class="recommend-info">
    <div class="recommend-header">热门推荐</div>
    <GoodsList :goods="recommendList">
    </GoodsList>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
export default {
  name: "DetailRecommendInfo",
  props:{
    recommendList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsList,

  }
}
</script>

<style scoped>
.recommend-info {
  padding: 5px;
}
.recommend-header{
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>
