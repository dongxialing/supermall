<template>
<div class="detail" :key="iid">
  <DetailNavBar @navbarClick="titleClick" :current-index="currentIndex"></DetailNavBar>
  <Scroll ref="scroll"
          class="content"
          :probe-type=3
          @imagePosition='contentPosition'>
  <detail-swiper :images="topImage"> </detail-swiper>
 <DetailBaseInfo :goods="goods" ref="base"/>
  <DetailShopInfo :shop="shop"/>
  <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
  <DetailParamsInfo :param-info="paramsInfo" ref="param"/>
    <DetailCommentInfo :comment-info='commentInfo' ref="comment"/>
    <DetailRecommendInfo :recommend-list="recommendList" ref="recommend"/>
  </Scroll>
  <BackTop @backTop="backTop"
           class='back-top'
           v-show="showBackTop"/>
  <DetailButtomBar @addToCart="addToCart"/>
  <Toast :message="toastMessage" :is-toast-show="isToastShow"/>
</div>
</template>

<script>
import DetailNavBar from "@/views/detail/childDetails/DetailNavBar";
import DetailSwiper from "@/views/detail/childDetails/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childDetails/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childDetails/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childDetails/DetailGoodsInfo";
import DetailParamsInfo from "@/views/detail/childDetails/DetailParamsInfo";
import DetailCommentInfo from "views/detail/childDetails/DetailCommentInfo";
import DetailRecommendInfo from "views/detail/childDetails/DetailRecommendInfo";
import DetailButtomBar from "views/detail/childDetails/DetailButtomBar";
import Scroll from "@/components/common/scroll/Scroll";
import Toast from "components/common/toast/Toast";

import BackTop from "components/content/backTop/BackTop";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import {backTopmixin} from "common/mixin";
import {imageLoad} from "common/mixin";
import {BACKTOP_DISTANCE} from 'common/const'


export default {
  name: "Detail",
  components: {
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailButtomBar,

    DetailNavBar,
    DetailSwiper,
    Scroll,
    BackTop,
    Toast,

  },
  mixins: [backTopmixin, imageLoad],
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTops: [],
      currentIndex: 0,
      toastMessage:'',
      isToastShow: false,
    }
  },
  created() {
    this.getDetail()
    this.getRecommend()
    this.iid = this.$route.query.iid
  },
  mounted() {

  },
  updated() {
    this.getOffsetTops()
  },
  methods: {
    //监听图片加载器完成之后刷新高度
    imageLoad() {
      this.$refs.scroll.refresh()
    },
    //  获取数据
    getDetail() {
      this.iid = this.$route.query.iid
      //取得当前组件的数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        //1.取swiper的数据
        this.topImage = data.itemInfo.topImages;

        //  2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //    3.创建店铺信息
        this.shop = new Shop(data.shopInfo);

        //    4.获取保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //    5.获取参数的数据
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //6.获取评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })
    },
    //  7.获取推荐的信息
    getRecommend() {
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
      })

    },
    getOffsetTops() {
      this.themeTops = []
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE)
    },

    /*
    监听事件
    */

    //点击navbar跳转到相应的位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)
    },
    //获取当前滚动位置
    contentPosition(position) {
      //1.判断位置是否显示backtop
      this.showBackTop = (-position.y) > BACKTOP_DISTANCE
      //2.当滚动到某个位置时，nav-bar显示相应的标题
      //
      //   this._listenScrollTheme(-position.y)
      // },
      // _listenScrollTheme(position) {
      //   let length = this.themeTops.length;
      //   for (let i = 0; i < length; i++) {
      //     let iPos = this.themeTops[i];
      this.listenScrollTheme(-position.y)
    },
    listenScrollTheme(position) {
      const length = this.themeTops.length
      for (let i = 0; i < length; i++) {
        if (position >= this.themeTops[i] && position < this.themeTops[i + 1]) {
          this.currentIndex = i;

        }
      }
    },
    addToCart() {
      const obj = {}
      obj.iid = this.iid;
      obj.imgUrl = this.topImage[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.nowPrice;
      this.$store.dispatch('addCart', obj).then(res => {this.toastMessage = res})
      this.isToastShow = true
      setTimeout(()=>{
        this.isToastShow = false
      },1000)
    },
  },



}

</script>

<style scoped>
.detail{
  height:100vh;
  position: relative;
  z-index:9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}

</style>
