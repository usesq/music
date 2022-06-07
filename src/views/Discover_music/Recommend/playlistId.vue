<template>
  <Scoll class="zt">
    <liBar :qb="'全部歌单'" :tag='tag' @ClickXi='Shuju'></liBar>
    <div class="xf">
      <template v-for="(item,key) in Gdc">
        <template v-if="(key+1)%5==0">
          <div class="ll" @click="T_huan(item.id)">
            <img :src="item.coverImgUrl" alt="">
            <p>{{item.name}}</p>
            <p class="b_f">
              <span class="iconfont icon-bofang"></span>{{ item.playCount }}
            </p>
          </div>
        </template>
        <template v-else>
          <div class="gt" @click="T_huan(item.id)">
            <img :src="item.coverImgUrl" alt="">
            <p>{{item.name}}</p>
            <p class="b_f">
              <span class="iconfont icon-bofang"></span>{{ item.playCount }}
            </p>
          </div>
        </template>
      </template>
    </div>
  </Scoll>
</template>

<script>

import Scoll from "@/components/Scoll";
import liBar from "@/components/listbar";

import { xubosong , FilterCategory } from "@/network/Bar";

export default {
  components: {
    Scoll,
    liBar
  },
  data(){
    return {
      // 类别
      tag:[],

      // 当前所在分类
      fl:'全部歌单',

      // 歌单
      Gdc:[]
    }
  },
  methods:{
    // 判断是否在当前位置
    pd(x){
      if(this.fl==x){
        return true
      }
    },

    // 改变
    gb(x){
      this.fl = x
    },

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

    Shuju(fc){
      // 当数据更新时，请求歌单
      FilterCategory(fc)
        .then(res=>{
          this.Gdc = res.data.playlists
        })
      // console.log('曹尼玛的')
    }
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

    // 请求歌单类目，获取类型歌单
    this.$axios.all([xubosong(),FilterCategory(this.fl)])
      .then(res=>{
        this.tag = res[0].data.tags
        this.tag.push({name:'全部歌单'})
        
        this.Gdc = res[1].data.playlists
        console.log(this.Gdc)
      })
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

.zt{
  width: 970px;
  height: 600px;
  padding: 5px 30px;
  background: rgba(15, 44, 88, 0.192)
}

.asi{
  /* width: auto; */
  height: 20px;
  padding: 5px 15px;
  /* margin-bottom: 5px; */
  border: 1px solid rgba(131, 131, 131, 0.514);
  border-radius: 25px;
  background: white;
}

.div-asi{
  width: auto;
  margin-top: 10px;
  display: inline-block;
  margin-bottom: 6px;
  position: relative;
}

.div-asi:hover .asi{
  background: rgb(219, 219, 219);
}

.yans{
  width: 530px;
  height: auto;
  z-index: 5;
  position: absolute;
  margin-top: 6px;
  border-radius: 10px;
  /* padding: 0 15px; */
  background: white;
  visibility: hidden;
}

.div-asi:hover .yans{
  visibility: inherit;
}

.fgx{
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background: rgba(85, 85, 85, 0.445);
}

.kaobei{
  margin: 0 15px;
  padding-top: 5px;
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  /* background: maroon; */
  list-style: none;
}

.mc{
  width: 500px;
  margin: 0 15px;
  padding-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

li{
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  /* background: maroon; */
  list-style: none;
}

li:hover,.kaobei:hover{
  color: rgba(255, 253, 253, 0.534);
}

.wenzi{
  padding: 3px 10px;
  /* border: 1px solid red; */
  border-radius: 25px;
}

.bianse{
  color: rgb(252, 252, 252);
  background: rgb(255, 173, 173 ,0.5);
}

.xf{
  width: 970px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.gt{
  width: 180px;
  height: 230px;
  position: relative;
  margin: 10px 0;
  margin-right: 17.5px;
  /* background: white; */
  display: inline-block;
}

.ll{
  width: 180px;
  height: 230px;
  position: relative;
  /* background: white; */
  display: inline-block;
}

.ll img,.gt img{
  width: 180px;
  border-radius: 10px;
}

.b_f {
  position: absolute;
  font-size: 12px;
  color: rgb(218, 218, 218);
  top: 5px;
  right: 5px;
}

</style>