<template>
<div class="goods-list-item" @click='goodsItemClick' :key="goodsItem.image">
  <img :src="goodsItem.image||goodsItem.show.img"
       @load="imageLoad"
       key="getImg">
  <div class="goods-info">
    <p class="pp">{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
  </div>
</div>
</template>

<script>

export default {
name: "GoodsListItem",
  props:{
  goodsItem:{
    type: Object,
      default(){
      return {}
  }
},
  },
  methods:{
  imageLoad(){
    this.$bus.$emit('itemImageLoad')
  },
    goodsItemClick(){
      let iid = this.goodsItem.iid
      this.$router.push({path: '/detail', query: {iid}})
    }
    },
}

</script>

<style scoped>
.goods-list-item {
  padding-bottom: 40px;
  width: 48%;
  position:relative;
}
.goods-list-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-info{
  position: absolute;
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  bottom: 5px;
  left: 0;
  right: 0;
}
.goods-info .pp{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
  position: relative;
}
.goods-info .collect::before{
  content:'';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background-image: url("~assets/img/common/collect.svg");
  background-size: contain;
}

</style>
