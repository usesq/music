<template>
  <Scoll class='zt'>
    <!-- 头部信息简介 -->
    <div class="E_one">
      <!-- 左侧歌单封面 -->
      <div class="one_one">
        <img class="img_one" :src="$store.state.Gxxh.cover" alt="" />
      </div>
      <!-- 歌单信息 -->
      <div>
        <!-- 歌单名称 -->
        <h2>{{ $store.state.Gxxh.name }}</h2>
        <!-- 播放，分享，下载，收藏 -->
        <div class="Click_ii" style="margin: 17px 0">
          <div style="width: 140px">
            <span class="Span_i">
              <span class="iconfont icon-bofang Bz"></span>
              播放全部
            </span>
            <div class="Jia">十</div>
          </div>
          <div>
            <span class="Span_i">
              <span class="iconfont icon-xiazai Bz"></span>
              下载全部
            </span>
          </div>
        </div>
        <!-- 歌曲数量，播放量 -->
        <div style="margin-bottom: 5px">
          <span style="margin-right: 10px">单曲数：{{ $store.state.Gxxh.musicSize }}</span>
          <span>MV数：{{ $store.state.Gxxh.mvSize }}</span>
        </div>
      </div>
    </div>
    <Gequ :momsan='$store.state.Gzr'></Gequ>
  </Scoll>
</template>

<script>
import Scoll from "@/components/Scoll";

import Gequ from '@/views/Song_d_list/Ge_qu'

export default {
  components: {
    Scoll,
    Gequ
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

.zt{
  height: 100%;
  border-radius: 0 0 10px 0;
  background: rgba(15, 44, 88, 0.192);
}

.E_one {
  width: 1000px;
  /* height: 210px; */
  display: flex;
  justify-content: left;
  margin: 15px auto;
  border-radius: 15px;
  background: rgba(15, 44, 88, 0.192);
}

.img_one {
  width: 200px;
  height: 200px;
  border-radius: 15px;
  margin: 7px 7px 5px 7px;
}

.one_one {
  margin-right: 15px;
  /* background: #42b983; */
}

.Click_ii div {
  display: inline-block;
  position: relative;
  border-radius: 25px;
  background: white;
  margin-right: 10px;
}

.Click_ii .Jia {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 0;
  padding: 0;
  margin-right: 0;
  border-left: 1px solid red;
  border-radius: 0 25px 25px 0;
}

.Span_i {
  display: inline-block;
  margin: 5px 15px;
}
</style>