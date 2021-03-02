<template>
<div class="wrapper" ref="wrapper">
  <div class="contend">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  data(){
    return {
      scroll: null,
    }
  },
  props:{
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default: false,
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
      mouseWheel: true,
    })
    if(this.probeType === 2 || this.probeType === 3){
    this.scroll.on('scroll',(position)=>{
      this.$emit('imagePosition',position)})
    }
    if(this.pullUpLoad === true){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')}
        )
    }
  },
  methods:{
    scrollTo(x,y,time=3000){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
