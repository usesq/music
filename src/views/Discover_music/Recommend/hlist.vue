<template>
  <Scoll class="gundongjm" style="height:610px">
    <template v-for="item in $store.state.Bdan">
      <div class="zhengti" @click="T_huan(item.id)">
        <img class="tp" :src="item.coverImgUrl" alt="">
        <p>{{item.name}}</p>
      </div>
    </template>
  </Scoll>
</template>

<script>
import Scoll from "@/components/Scoll";

export default {
  components: {
    Scoll
  },
  data(){
    return {

    }
  },
  methods:{
    // 替换url
    T_huan(x) {
      // 历史路由操作
      let c = 0
      let arr = []
      for(c;c<=this.$store.state.luykey;c++){
        arr.push(this.$store.state.lisluy[c])
      }
      this.$store.state.lisluy = arr

      this.$router.replace("/Song_list/" + x);
      // console.log(this.$route.path);
    },
  },
  created(){
    if(this.$store.state.lisluy[this.$store.state.luykey]!=this.$route.path){
      console.log('添加路由')
      this.$store.state.lisluy.push(this.$route.path)
      this.$store.state.luykey++
    }else{
      console.log('你正在初始位置')
      console.log(this.$store.state.lisluy[this.$store.state.luykey])
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
  display: block;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 20px;
  background: white;
}

.gundongjm{
  width: 1030px;
  height: 580px;
  background: rgba(15, 44, 88, 0.192);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.zhengti{
  height: 210px;
  padding: 5px 0;
  display: inline-block;
}

.tp{
  width: 180px;
}

p{
  text-align: center;
}
</style>