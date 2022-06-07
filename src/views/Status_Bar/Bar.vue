<template>
  <div class="bar">
    <div class="Left-sidebar">
      <div class="dl">
        <div
          v-if="$store.state.information == ''"
          class="qiu"
          @click="$emit('DL')"
        ></div>
        <div v-if="$store.state.information != ''" class="Xin_Ci">
          <img
            :src="$store.state.information.profile.avatarUrl"
            alt=""
            class="T_x"
          />
        </div>
      </div>
      <!------------------------------------------------------------------------->
      <!--<div class="Scoll">-->
      <Scoll>

        <div v-for="item in $store.state.one" class="lb">
          <router-link
            :class="{ djh: cssys(item.obm) }"
            tag="li"
            :to="item.obm"
          >
            {{ item.name }}
          </router-link>
        </div>
        <p>我的音乐</p>
        <div v-for="item in $store.state.two" class="lb">
          <router-link
            :class="{ djh: cssys(item.obm) }"
            tag="li"
            :to="item.obm"
          >
            {{ item.name }}
          </router-link>
        </div>

        <p>创建的歌单</p>
        <template v-if="$store.state.cookie!=''">
          <div class="lb" @click="Click()">
            <router-link
              :class="{
                djh: cssys($store.state.Song_list_details[0].id)
              }"
              tag="li"
              :to="'/Song_list/' + $store.state.Song_list_details[0].id"
              ><span id="aixinxin" class="iconfont icon-xihuan1" style="margin: 7px"></span>我喜欢的音乐
            </router-link>
          </div>
        </template>
        <template v-else>
          <div class="lb">
            <router-link
              :class="{
                djh: cssys('/denglu')
              }"
              tag="li"
              to="/denglu"
              ><span id="aixin" class="iconfont icon-xihuan1"></span>我喜欢的音乐
            </router-link>
          </div>
        </template>

        <template v-for="item in $store.state.Number_of_songs.createdPlaylistCount">
          <div
            v-if="item<$store.state.Number_of_songs.createdPlaylistCount-1"
            class="lb"
            @click="Click($store.state.Song_list_details[item+1].id)"
          >
              <router-link
                :class="{
                  djh: cssys($store.state.Song_list_details[item+1].id),
                }"
                tag="li"
                :to="'/Song_list/' + $store.state.Song_list_details[item+1].id"
                >{{ $store.state.Song_list_details[item+1].name }}
              </router-link>
          </div>
        </template>

        <p>收藏的歌单</p>

        <template v-for="item in $store.state.Number_of_songs.subPlaylistCount">
          <div
            v-if="item<=$store.state.Number_of_songs.subPlaylistCount"
            class="lb"
            @click="Click($store.state.Song_list_details[item+$store.state.Number_of_songs.createdPlaylistCount-1].id)"
          >
              <router-link
                :class="{
                  djh: cssys($store.state.Song_list_details[item+$store.state.Number_of_songs.createdPlaylistCount-1].id),
                }"
                tag="li"
                :to="'/Song_list/' + $store.state.Song_list_details[item+$store.state.Number_of_songs.createdPlaylistCount-1].id"
                >{{ $store.state.Song_list_details[item+$store.state.Number_of_songs.createdPlaylistCount-1].name }}
              </router-link>
          </div>
        </template>
        
      </Scoll>
      <!--</div>-->
    </div>
    <div class="Stop">
      <div>
        <span @click="syy()" class="iconfont icon-shangyiyehoutuifanhui-yuankuang"></span>
        <span @click="xyy()"
          class="iconfont icon-xiayiyeqianjinchakangengduo-yuankuang"
        ></span>
      </div>
      <div class="srk">
        <span class="iconfont icon-sousuo" style="font-size: 20px"></span>
        <input id="wenben" type="text" @keyup.enter="Sr()" />
      </div>
      <span class="iconfont icon-jingzi"></span>
    </div>
    <div class="content">
      <router-view :key="accTime"></router-view>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
import Scoll from "@/components/Scoll";

import {Search} from "@/network/Bar"

export default {
  name: "Bar",
  components: {
    Scoll,
  },
  data() {
    return {
      accTime:'Time'
      // Time:''
    };
  },
  methods: {
    // 样式
    cssys(x){
      // console.log(this.$route.path)
      let c = x
      if(x=='/'){
        c = '/O_one'
      }
      // console.log(this.$route.path.indexOf(x))
      if(this.$route.path.indexOf(c)==0||this.$route.path.indexOf(c)==11){
        return true
      }
    },

    // 上一页与下一页
    syy(){
      if(this.$store.state.luykey>0){
        this.$store.state.luykey--
        this.$router.push(this.$store.state.lisluy[this.$store.state.luykey])
      }
    },
    xyy(){
      if(this.$store.state.luykey<this.$store.state.lisluy.length-1){
        this.$store.state.luykey++
        this.$router.push(this.$store.state.lisluy[this.$store.state.luykey])
      }
    },

    // 搜索
    Sr(){
      let mcs = document.getElementById('wenben')
      // 匹配正则表达式
      var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im; 
      if (!patrn.test(mcs.value)) {// 如果包含特殊字符返回false
        let x = mcs.value
        // console.log(x)
        Search(x,1)
          .then(res=>{
            this.$store.state.Soscontent = x
            // 计算歌曲时间
            let i = 0;
            for (; i < res.data.result.songs.length; i++) {
              let pms = parseInt(res.data.result.songs[i].dt / 1000 / 60);
              let pmop = parseInt((res.data.result.songs[i].dt / 1000) % 60);
              if (pms < 10) {
                pms = "0" + pms;
              }
              if (pmop < 10) {
                pmop = "0" + pmop;
              }
              res.data.result.songs[i].dt = pms + ":" + pmop;
              // console.log(pms + ":" + pmop)
            }
            this.$store.state.SosJg = res.data.result.songs
            this.$router.push('/Souso')
          }).catch(jet=>{
            console.log(jet)
          })
      }else{
        mcs.value = '包含了特殊字符导致无法搜索'
      }
    },

    Click(x){
      // 每次点击赋予新的时间戳新的key使他刷新
      let acio = new Date()
      let ki = acio.getSeconds()
      let mi = acio.getMilliseconds()
      this.accTime = ki+mi
    }

  },
  created(){
    let acio = new Date()
    let ki = acio.getSeconds()
    let mi = acio.getMilliseconds()
    this.accTime = ki+mi
  }
};
</script>

<style scoped>
@import url("../../../public/css/font.css");

#aixin{
  font-size: 20px;
}
#aixinxin{
  font-size: 20px;
}

.bar {
  width: 1300px;
  height: 700px;
  position: relative;
  border-radius: 10px;
  background: rgb(2, 30, 71,0.3);
}

/*-------------------左侧边栏-----------------------*/

.Left-sidebar {
  width: 270px;
  height: 100%;
  border-radius: 10px 0 0 10px;
  display: inline-block;
  background: rgb(2, 30, 71,0.3);
}

.Scoll {
  border-radius: 0 0 0 10px;
  height: calc(100% - 110px);
}

.dl {
  height: 100px;
  width: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 10px 0 0 0;
  /* background: rebeccapurple; */
}

.qiu {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgb(176, 226, 250);
  /* box-shadow: 1px 3px 14px #8c30be; */
}

li {
  list-style: none;
}

p {
  font-size: 14px;
  margin: 5px auto 5px 10px;
}

.lb li {
  line-height: 40px;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.lb li:hover {
  background: rgba(5, 24, 53, 0.8);
}

.djh {
  font-weight: bold;
  color: rgba(255, 255, 255, 0.829);
  background: rgba(5, 24, 53, 0.8);
}

/*----------------------搜索栏-----------------------------*/
.Stop {
  width: 1030px;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  position: absolute;
  border-radius: 0 10px 0 0;
  top: 0;
  left: 270px;
  right: 0;
  bottom: 0;
  background: rgba(33, 35, 78);
}

.iconfont {
  font-size: 30px;
  margin: 0 5px;
}

.iconfont:hover {
  color: rgba(82, 165, 212, 0.603);
}

.srk {
  width: 300px;
  height: 30px;
  line-height: 30px;
  border-radius: 25px;
  background: white;
}

/*去除input默认样式*/
input {
  width: 260px;
  outline: none;
  background: white;
  border: none;
  /*outline:medium;*/
}

/*----------------------内容-----------------------------*/

.content {
  width: 1030px;
  height: calc(100% - 50px);
  border-radius: 0 0 10px 0;
  display: inline-block;
  position: absolute;
  top: 50px;
  left: 270px;
  right: 0;
  bottom: 0;
  /*background: rgba(98, 188, 255);*/
}

/*----------登录后--------------*/

.Xin_Ci {
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 10px 0 0 0;
  align-items: center;
  justify-content: center;
}

.T_x {
  width: 70px;
  height: 70px;
  margin: 0 10px 0 15px;
  border-radius: 50%;
}
</style>