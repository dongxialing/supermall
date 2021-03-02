export const backTopmixin = {
  data() {
    return {
      showBackTop:false,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}

export const imageLoad= {
  mounted(){
      this.$bus.$on('ItemImageLoad',()=>{
        this.$refs.scroll.refresh()
      })
    },
}


