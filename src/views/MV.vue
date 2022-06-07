<template>
  <Scoll class="scol">
    <div class="tz">
      <div>
        <h1 class="wz">{{xinxi.name}}</h1>
      </div>
      <div id="sp">
        <video id="bfsp" height="500px" :src="url" controls></video>
      </div>
      <div class="wbtz">
        <span>作者：{{xinxi.artistName}}</span>
        <span>发布时间：{{xinxi.publishTime}}</span>
        <span>播放：{{xinxi.playCount}}</span>
      </div>
    </div>
    <Pl :Sto="Sto" :Panduanx='2'></Pl>
  </Scoll>
</template>

<script>
import {Mvxi,Mvurl,Spurl,Spxq} from '@/network/Bar'

import Scoll from "@/components/Scoll";
import Pl from "@/views/Song_d_list/Pin_lun";

export default {
  components: {
    Scoll,
    Pl
  },
  data(){
    return {
      // mvurl
      url:'',
      // mv信息
      xinxi:{},
      // 评论总数
      Sto:""
    }
  },
  methods:{
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
    
    // console.log('mv')
    let x = this.$route.params.id
    let lx = this.$route.params.lx
    // console.log(this.$route.params)
    // console.log(this.$route.path)
    // console.log('sss')
    if(lx==1){
      this.$axios.all([Mvxi(x),Mvurl(x)])
      .then(res=>{
        this.url = res[1].data.data.url
        this.xinxi = res[0].data.data
        this.Sto = res[0].data.data
        this.xinxi = {
          name:res[0].data.data.name,
          artistName:res[0].data.data.artistName,
          publishTime:res[0].data.data.publishTime,
          playCount:res[0].data.data.playCount
        }
      })
    }else if(lx==2){
      this.$axios.all([Spxq(x),Spurl(x)])
      .then(res=>{
        this.url = res[1].data.urls[0].url
        console.log(res[0])
        // this.xinxi = res[0].data.data
        // this.Sto = res[0].data.data
        let time = ''
        let cos = new Date(res[0].data.data.publishTime)
        time = cos.getFullYear()+'-'+cos.getMonth()+'-'+cos.getDate()
        this.xinxi = {
          name:res[0].data.data.title,
          artistName:res[0].data.data.creator.nickname,
          publishTime:time,
          playCount:res[0].data.data.playTime
        }
      })
    }
  },
  updated(){
    let c = document.getElementById('bfsp')
    c.play()
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

.scol{
  height: 650px;
  background: rgba(15, 44, 88, 0.192);
  border-radius: 0 0 10px 0;
}

#sp{
  width: 900px;
  height: 500px;
  margin: 0 auto;
  text-align: center;
  /* display: flex;
  justify-content: center; */
  background: black;
}

#bfsp{
  width: 900px;
}

.wz{
  width: 900px;
  height: 35px;
  display: -webkit-box;
  /* 从顶部向底部垂直布置子元素 */
  -webkit-box-orient: vertical;
  /* 第三行后开始省略 */
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.tz{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.wbtz{
  width: 900px;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
  justify-content:space-between;
}

</style>