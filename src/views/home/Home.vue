<template>
  <div id="home">
    <NavBar class="nav-bar" ref="scroll">
    <template v-slot:center>购物街</template>
  </NavBar>
    <TabControl :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                class="tab-control"
                ref="tab-control2"
                v-show="isTabFixed">
    </TabControl>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @imagePosition="contentPosition"
            :pull-up-load="true"
            @pullingUp="loadMore">
    <Home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'/>
    <ReCommendView :recommends="recommends"></ReCommendView>
    <FeatrueView></FeatrueView>
    <TabControl :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                 class="tab-control"
                ref="tab-control1">
    </TabControl>
    <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @backTop="backTop" v-show="showBackTop"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import ReCommendView from "@/views/home/childComps/ReCommendView";
import FeatrueView from "@/views/home/childComps/FeatrueView";

import NavBar from "@/components/common/navBar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from "@/network/home"

import {backTopmixin,imageLoad} from "common/mixin";

import {BACKTOP_DISTANCE} from 'common/const'
export default {
  name: "Home",
  components: {
    HomeSwiper,
    ReCommendView,
    FeatrueView,

    NavBar,
    TabControl,
    GoodsList,
    BackTop,

    Scroll,
  },
  mixins:[backTopmixin,imageLoad],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',

      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },


  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
    // showGoods() {
    //   return this.goods[this.currentType].list
    // }
  },

  destroyed() {
    //console.log('home destroyed');
  },


  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh()
  },


  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    // this.$bus.$of('imageLoad',)
  },


  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },


  mounted() {
    // 1.图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 50)
    // this.$bus.$on('itemImageLoad', () => {
    //   refresh()
    // })
  //  监听图片加载之后刷新scroll里面的高度，页面不会卡顿

  },
  methods: {
    /**
     * 事件监听相关的方法
     */
      tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      },


     //决定是否返回顶部
    contentPosition(position){
        //第一种要获取位置的  向上图标什么时候出现
        this.showBackTop= (-position.y) > BACKTOP_DISTANCE;
        // 第二种要位置的，决定是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
     },
    //向上提拉加载更多数据
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    // contentScroll(position) {
    //   // 1.判断BackTop是否显示
    //   this.isShowBackTop = (-position.y) > 1000
    //
    //   // 2.决定tabControl是否吸顶(position: fixed)
    //   this.isTabFixed = (-position.y) > this.tabOffsetTop
    // },

    swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;

      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //当完成向上提拉加载更多数据之后，刷新pullup，不然只能向上提拉一次
        this.$refs.scroll.finishPullUp()
      })
    },
  }
}
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
.nav-bar{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: var(--color-tint);
  text-align: center;
  color:#ffffff;
  height: 44px;
  z-index: 9;
}
.tab-control{
  z-index: 9;
  background-color: #fff;
}
.content{
  position: absolute;
  left: 0px;
  right: 0px;
  top: 44px;
  bottom: 49px;
  overflow: hidden;

}
</style>
