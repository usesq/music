<template>
  <div class="n-top">
    <audio id="muic" :src="url"></audio>
    <div class="cimg">
      <template v-if="$store.state.mirou.id != null">
        <img id="xzc" class="xuanz" :src="$store.state.mirou.img" alt="" />
      </template>
      <template v-else>
        <img src="../../../public/img/碟片.jpeg" alt="" />
      </template>
    </div>
    <div class="Ge_qu">
      <div class="Ge_q_jdt">
        <template v-if="$store.state.mirou.id != null">
          <p class="ziti">
            {{ this.$store.state.mirou.name }}
          </p>
          <p class="ziti">
            <template v-for="(cos, losf) in $store.state.mirou.gesou">
              <template v-if="losf + 1 < $store.state.mirou.gesou.length">
                {{ cos.name }}
                <span> / </span>
              </template>
              <template v-else>
                {{ cos.name }}
              </template>
            </template>
          </p>
        </template>
        <template v-else> &nbsp; </template>
      </div>
      <div class="jdtzz">
        <div class="tiaozi" @click="dj($event)">
          <div id="redcolr" class="redcolor"></div>
          <div id="yxq" class="yuanq"></div>
        </div>
        <p class="bof_time">
          {{ bTime }}
          <span style="margin: 0 5px">/</span>
          <template v-if="$store.state.mirou.id != null">
            {{ this.$store.state.mirou.time }}
          </template>
          <template v-else>
            {{ bTime }}
          </template>
        </p>
      </div>
    </div>
    <div class="bo_fmos">
      <template v-if="moshi == 0">
        <span class="iconfont icon-whiter-shunxubofang" @click="moshi++"></span>
      </template>
      <template v-else-if="moshi == 1">
        <span class="iconfont icon-liebiaoxunhuan" @click="moshi++"></span>
      </template>
      <template v-else-if="moshi == 2">
        <span class="iconfont icon-danquxunhuan" @click="moshi++"></span>
      </template>
      <template v-else-if="moshi == 3">
        <span class="iconfont icon-suijibofang" @click="moshi = 0"></span>
      </template>
    </div>
    <div class="yinl">
      <div class="njx">
        <template v-if="yl == 0">
          <span class="aaxs iconfont icon-24gf-volumeZero"></span>
        </template>
        <template v-else-if="yl < 50">
          <span class="aaxs iconfont icon-24gf-volumeLow"></span>
        </template>
        <template v-else-if="yl >= 50 && yl < 100">
          <span class="aaxs iconfont icon-24gf-volumeMiddle"></span>
        </template>
        <template v-else-if="yl == 100">
          <span @click="cesi()" class="aaxs iconfont icon-24gf-volumeHigh"></span>
        </template>
      </div>
      <div class="yin_ns">
        <input id="yl" type="range" min="0" max="100" v-model="yl" />
      </div>
    </div>
    <div class="bo_fzt">
      <template v-if="$store.state.mirou.id != null">
        <span @click="Sys()" class="iconfont icon-shangyishou"></span>

        <div>
          <template v-if="$store.state.zt == 1">
            <span
              @click="bf_yinyue()"
              class="iconfont icon-bofang"
              style="font-size: 40px"
            ></span>
          </template>

          <template v-else>
            <span
              @click="tz_yinyue()"
              class="iconfont icon-zanting"
              style="font-size: 40px"
            ></span>
          </template>
        </div>

        <span @click="xia_ys()" class="iconfont icon-xiayishou"></span>
      </template>
      <template v-else>
        <span
          class="iconfont icon-shangyishou"
          style="color: rgb(139, 137, 137)"
        ></span>
        <span
          class="iconfont icon-bofang"
          style="font-size: 40px; color: rgb(139, 137, 137)"
        ></span>
        <span
          class="iconfont icon-xiayishou"
          style="color: rgb(139, 137, 137)"
        ></span>
      </template>
    </div>
    <div class="Ge_ci">
      <div id="ci" class="ci" style="font-size:20px;color:white">
        <p>如果有一天你会来看一看我吗</p>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import { misir } from "@/network/Song_list_data";

import {Ci_yu} from "@/network/top"

export default {
  name: "Top",
  data() {
    return {
      // 播放模式
      moshi: 0,
      // 歌曲key
      keysi: 0,
      // 音量
      yl: 100,
      // 播放的时间
      bTime: "00:00",

      // 左移动
      let: -3,

      // 毫秒
      hmiao:0,
      // 歌词滚动
      gunci:0,
      // 歌词key
      cikey:0,
      // 歌词相关
      lois:0,

      // 歌词定位
      dingweikey:0,

      // 音乐url
      url:'',

      duoyu:0
    };
  },
  methods: {
    // cesi(){
    //   console.log(this.gunci)
    // },

    // 播放时间
    dj(e) {
      let s1 = (window.innerWidth - 1300) / 2;
      let s2 = (1300 - 600 - 200 - 40 - 50 - 200 - 154) / 7;
      let s3 = s1 + s2 * 2 + 50 + 5;
      let s4 = e.x - s3;
      let si = document.getElementById("yxq");
      let sp = document.getElementById("redcolr");
      if (s4 < 189) {
        si.style.left = s4 + "px";
        sp.style.width = s4 + "px";

        this.let = s4;

        let timeone = this.$store.state.mirou.time;
        let arr = timeone.split(":");
        let setTime = Number(arr[0]) * 60;
        let miaoTime = setTime + Number(arr[1]);
        let mcpx = 190 / miaoTime;

        let i = 0;
        // 几分几秒才到点击位置
        let cis = 0;
        // 分
        let mic = 0;
        // 秒
        let pos = 0;
        for (i; i < miaoTime; i++) {
          cis += mcpx;
          pos++;
          if (pos == 60) {
            mic++;
            pos = 0;
          }
          if (cis >= s4) {
            this.$store.state.csi = pos;
            this.$store.state.minin = mic;
            if (pos < 10) {
              pos = "0" + pos;
            } else {
              pos;
            }
            if (mic < 10) {
              mic = "0" + mic;
            } else {
              mic;
            }

            let kpx = Number(mic) * 60
            let kpc = (Number(pos) + kpx) * 1000 + this.hmiao
            // console.log(kpc)
            
            // console.log(kpx+'---'+Number(pos)+'---'+kpc+'---'+this.hmiao)
            // 让歌词到对应位置
            for(let i = 0;i<this.dingweikey.length;i++){
              if(kpc>=this.dingweikey[i]&&kpc<this.dingweikey[i+1]){
                this.cikey = i
                // console.log(this.cikey)
                let xki = document.getElementById('ci')
                let mxpz = 60 * (i - 1)
                // xki.style.top = 0 + 'px'
                xki.style.top = '-' + mxpz + 'px'
                this.gunci = mxpz
                // console.log(mxpz)
                // console.log(xki.style.top)
              }else if(kpc>=this.dingweikey[this.dingweikey.length-1]){
                let xki = document.getElementById('ci')
                let mxpz = 60 * (this.dingweikey.length - 1)
                xki.style.top = '-' + mxpz + 'px'
                this.gunci = mxpz
              }
            }

            this.bTime = mic + ":" + pos;
            let mics = document.getElementById("muic")
            let lingshi = ''
            if(this.cikey<100&&this.cikey>=10){
              lingshi = '0.0'+this.cikey
            }else if(this.cikey<10){
              lingshi = '0.00'+this.cikey
            }else{
              lingshi = '0.'+this.cikey
            }
            let xis = Number(mic) * 60 + Number(pos) + Number(lingshi);
            // console.log(Number(mic)*60+Number(pos))
            // console.log(pos)
            // 设置播放时间（秒）
            // console.log(mic+":"+pos+':'+lingshi)
            // console.log(xis)
            mics.currentTime = xis;
            break;
          }
        }
      }
    },

    // 播放音乐
    bf_yinyue() {
      let mics = document.getElementById("muic");
      this.$store.state.zt = 0;
      this.$store.state.zoudong = 0;
      console.log(this.duoyu)
      if(this.duoyu==1){
        this.$store.state.minin = 0
        this.$store.state.csi = 0
      }
      console.log(this.bTime)
      mics.play();
    },

    // 暂停音乐
    tz_yinyue() {
      let mics = document.getElementById("muic");
      this.$store.state.zt = 1;
      clearInterval(this.$store.state.InTime);
      clearInterval(this.$store.state.cizt);
      this.$store.state.zoudong = 1;
      this.$store.state.kaomao = 1
      mics.pause();
    },

    // 上一首
    Sys() {
      if (this.$store.state._lb.length > 1) {
        this.$store.state.lishi_key++;
        let bhs =
          this.$store.state.lishi.length - 1 - this.$store.state.lishi_key;
        if (this.$store.state.lishi[bhs] != undefined) {
          // console.log(this.$store.state.lishi)
          // console.log(bhs)
          this.$store.state.mirou = {
            id: this.$store.state.lishi[bhs].id,
            name: this.$store.state.lishi[bhs].name,
            gesou: this.$store.state.lishi[bhs].gesou,
            img: this.$store.state.lishi[bhs].img,
            time: this.$store.state.lishi[bhs].time,
          };
          clearInterval(this.$store.state.InTime);
          clearInterval(this.$store.state.cizt)
          let mics = document.getElementById("muic");
          mics.play();

          this.$store.state.minin = 0;
          this.$store.state.csi = 0;
          this.$store.state.zoudong = 0;
          this.$store.state.zt = 0;
        } else {
          alert("没有了");
        }
      } else {
        alert("没有上一首");
      }
    },

    // 下一首
    xia_ys() {
      if (this.$store.state._lb.length > 1) {
        if (this.moshi == 3) {
          console.log("az");
          this.Random();
        } else {
          let i = 0;
          // 找到正在播放的歌曲在播放列表中的位置
          for (i; i < this.$store.state._lb.length; i++) {
            if (this.$store.state._lb[i].id == this.$store.state.mirou.id) {
              this.keysi = i;
            }
          }
          if (this.keysi < this.$store.state._lb.length - 1) {
            this.keysi++;
          } else {
            this.keysi = 0;
          }
          this.$store.state.mirou = {
            id: this.$store.state._lb[this.keysi].id,
            name: this.$store.state._lb[this.keysi].name,
            gesou: this.$store.state._lb[this.keysi].gesou,
            img: this.$store.state._lb[this.keysi].img,
            time: this.$store.state._lb[this.keysi].time,
          };
          clearInterval(this.$store.state.InTime);
          clearInterval(this.$store.state.cizt)
          let mics = document.getElementById("muic");
          mics.play();

          this.$store.state.minin = 0;
          this.$store.state.csi = 0;
          this.$store.state.zoudong = 0;
          this.$store.state.zt = 0;
        }
      }
    },

    // 顺序播放
    Order() {
      console.log("顺序播放");
      // 判断播放列表中是否有歌曲
      if (
        this.$store.state._lb.length > 1 &&
        this.keysi != this.$store.state._lb.length
      ) {
        let i = 0;
        // 找到正在播放的歌曲在播放列表中的位置
        for (i; i < this.$store.state._lb.length; i++) {
          if (this.$store.state._lb[i].id == this.$store.state.mirou.id) {
            this.keysi = i;
          }
        }
        this.keysi++;
        console.log('在这')
        if (this.$store.state._lb[this.keysi] != undefined) {
          this.$store.state.mirou = {
            id: this.$store.state._lb[this.keysi].id,
            name: this.$store.state._lb[this.keysi].name,
            gesou: this.$store.state._lb[this.keysi].gesou,
            img: this.$store.state._lb[this.keysi].img,
            time: this.$store.state._lb[this.keysi].time,
          };
          this.$store.state.zoudong = 0
          this.$store.state.minin = 0;
          this.$store.state.csi = 0;
        } else {
          this.$store.state.zt = 1;
          this.$store.state.zoudong = 1;
          this.duoyu = 1
        }
      } else {
        // console.log("222");
        // console.log(this.$store.state._lb.length+'----'+this.keysi)
        this.duoyu = 1
        this.$store.state.zt = 1;
        this.$store.state.zoudong = 1;
      }
      console.log(this.duoyu)
    },

    // 列表循环
    List_loop() {
      console.log("列表循环");
      // 判断播放列表中是否有歌曲
      if (
        this.$store.state._lb.length > 1 &&
        this.keysi != this.$store.state._lb.length
      ) {
        let i = 0;
        // 找到正在播放的歌曲在播放列表中的位置
        for (i; i < this.$store.state._lb.length; i++) {
          if (this.$store.state._lb[i].id == this.$store.state.mirou.id) {
            this.keysi = i;
          }
        }
        this.keysi++;
        console.log(this.$store.state._lb[this.keysi]);
        if (this.$store.state._lb[this.keysi] == undefined) {
          this.keysi = 0;
        }
        // console.log(this.keysi)
        this.$store.state.mirou = {
          id: this.$store.state._lb[this.keysi].id,
          name: this.$store.state._lb[this.keysi].name,
          gesou: this.$store.state._lb[this.keysi].gesou,
          img: this.$store.state._lb[this.keysi].img,
          time: this.$store.state._lb[this.keysi].time,
        };
      }
      this.$store.state.minin = 0;
      this.$store.state.csi = 0;
      this.$store.state.zoudong = 0;
    },

    // 单曲循环
    Single() {
      console.log("单曲循环");
      this.$store.state.minin = 0;
      this.$store.state.csi = 0;
      this.$store.state.zoudong = 0;
      this.bTime = '00:00'
      this.let = 0
      this.gunci = 0
      // this.$store.state.zoudong = 1
      let mics = document.getElementById("muic");
      mics.play();
    },

    // 随机
    Random() {
      console.log("随机播放");
      // 判断播放列表中是否有歌曲
      if (this.$store.state._lb.length > 1) {
        // 0-播放列表长度 的随机数
        let az = parseInt(Math.random() * this.$store.state._lb.length);
        if (az == this.keysi) {
          az++;
          if (az >= this.$store.state._lb.length - 1) {
            az -= 2;
          }
          console.log(az);
          console.log(this.keysi);
          this.keysi = az;
        } else {
          this.keysi = az;
        }
        console.log(this.keysi);
        this.$store.state.mirou = {
          id: this.$store.state._lb[this.keysi].id,
          name: this.$store.state._lb[this.keysi].name,
          gesou: this.$store.state._lb[this.keysi].gesou,
          img: this.$store.state._lb[this.keysi].img,
          time: this.$store.state._lb[this.keysi].time,
        };
        this.$store.state.minin = 0;
        this.$store.state.csi = 0;
        this.$store.state.zoudong = 0;
        this.bTime = '00:00'
        this.let = 0
        this.gunci = 0
      }
    },
  },
  updated() {
    

    let mics = document.getElementById("muic");
    // 添加事件
    if (this.moshi == 0) {
      mics.addEventListener("ended", this.Order);

      // 删除之前添加的事件
      mics.removeEventListener("ended", this.List_loop);
      mics.removeEventListener("ended", this.Single);
      mics.removeEventListener("ended", this.Random);
    } else if (this.moshi == 1) {
      mics.addEventListener("ended", this.List_loop);

      mics.removeEventListener("ended", this.Order);
      mics.removeEventListener("ended", this.Single);
      mics.removeEventListener("ended", this.Random);
    } else if (this.moshi == 2) {
      mics.addEventListener("ended", this.Single);

      mics.removeEventListener("ended", this.List_loop);
      mics.removeEventListener("ended", this.Order);
      mics.removeEventListener("ended", this.Random);
    } else if (this.moshi == 3) {
      mics.addEventListener("ended", this.Random);

      mics.removeEventListener("ended", this.List_loop);
      mics.removeEventListener("ended", this.Single);
      mics.removeEventListener("ended", this.Order);
    }

    

    // 调节音量
    mics.volume = this.yl / 100;

    // 暂停计时
    if (this.bTime == this.$store.state.mirou.time) {
      clearInterval(this.$store.state.InTime);
      // clearInterval(this.$store.state.cizt)
    }

    // 判断并停止
    if (this.$store.state.zoudong == 0) {
      console.log(this.$store.state.csi)
      console.log(this.$store.state.minin)
      misir(this.$store.state.mirou.id)
        .then(res=>{
          this.url = res.data.data[0].url
        })
      if(this.$store.state.kaomao == 1){
        this.$store.state.kaomao = 0
        // this.url = ''
      }else{
        this.cikey = 0
        this.gunci = 0
        this.hmiao = 0
        this.let = 0;
        this.bTime = '00:00'
        // console.log('进来了')
      }
      let cixi = document.getElementById('ci')
      // cixi.style.transition = 0 + 's'
      cixi.style.top = '-' + this.gunci + 'px'
      // console.log(this.bTime);
      this.$store.state.zoudong++;  
      // console.log('进来了')
      let timeone = this.$store.state.mirou.time;
      let arr = timeone.split(":");
      let setTime = Number(arr[0]) * 60;
      let miaoTime = setTime + Number(arr[1]);
      let mcpx = 190 / miaoTime;

      let si = document.getElementById("yxq");
      let sp = document.getElementById("redcolr");
      // si.style.left = 7.11934156378600858 + '%'

      let micos = Date.now()

      this.$store.state.InTime = setInterval(() => {
        // 秒
        let klo = "";
        // 分
        let ysi = "";

          this.$store.state.csi++;

          // 移动进度条
          this.let = this.let + mcpx;
          si.style.left = this.let + "px";
          sp.style.width = this.let + "px";

        if (this.$store.state.csi == 60) {
          this.$store.state.minin++;
          this.$store.state.csi = 0;
        }
        if (this.$store.state.csi < 10) {
          klo = "0" + this.$store.state.csi;
        } else {
          klo = this.$store.state.csi;
        }
        if (this.$store.state.minin < 10) {
          ysi = "0" + this.$store.state.minin;
        } else {
          ysi = this.$store.state.minin;
        }
        this.bTime = ysi + ":" + klo;

        // console.log(this.let)
        // console.log(Date.now() - micos)
      }, 1000);
      // console.log(miaoTime)

      // console.log(this.$store.state.ciju)
      // 获取歌词
        Ci_yu(this.$store.state.mirou.id).then(res=>{
          let stu = res.data.lrc.lyric
          // console.log(stu)
          let fg1 = stu.split('[')
          let fg2 = []
          for(let xc = 0;xc<fg1.length;xc++){
            if(fg1[xc]!=''){
              if(fg1[xc].split(']')[1]!='\n'){
                fg2.push(fg1[xc].split(']'))
              }
            }
          }

          let mxi = []
          for(let bci = 0;bci<fg2.length;bci++){
            let kofo = fg2[bci][0].split(':')[0]
            let kofo1 = fg2[bci][0].split(':')[1]
            kofo = (Number(kofo) * 60 + Number(kofo1)) * 1000
            mxi.push(kofo)
          }
          this.dingweikey = mxi

          console.log(this.dingweikey)

          this.$store.state.ciju = fg2
          let Sci = ''
          for(let nc = 0;nc<fg2.length;nc++){
            Sci += "<p style='width:600px;height:60px;text-align:center;line-height:60px;overflow: hidden'>"+ fg2[nc][1] +'</p>'
          }
          if(Sci=="<p class='yijuci'>undefined</p>"){
            Sci = '<p>暂无歌词</p>'
          }
          document.getElementById('ci').innerHTML = Sci
          // console.log(Sci)
        }).catch(jet=>{
          console.log(jet)
        })
      
      // 控制歌词滚动
      this.$store.state.cizt = setInterval(()=>{
        this.hmiao += 10
        if(this.hmiao==1000){
          this.hmiao = 0
        }
        let miko = this.$store.state.ciju

        let xhmiao = this.bTime.split(':')
        // console.log(xhmiao[0]+'---'+xhmiao[1]+'---'+this.hmiao)
        let cps = (xhmiao[0] * 60 + xhmiao[1]) * 1000 + this.hmiao
        let xhmiao1 = ''
        let cps1 = ''
        if(miko[this.cikey] != undefined){
          xhmiao1 = miko[this.cikey][0].split(':')
          // console.log(xhmiao1)
          cps1 = (xhmiao1[0] * 60 + xhmiao1[1]) * 1000
        }

        let xhmiao2 = ''
        let cps2 = ''
        if(miko[this.cikey+1] != undefined){
          xhmiao2 = miko[this.cikey+1][0].split(':')
          cps2 = (xhmiao2[0] * 60 + xhmiao2[1]) * 1000
          // console.log(cps2)
        }else{
          xhmiao2 = miko[this.cikey][0].split(':')
          cps2 = (xhmiao2[0] * 60 + xhmiao2[1]) * 1000
          // console.log(cps2)
        }

        // let xhmiao3 = miko[miko.length-1][0].split(':')
        // let cps3 = (xhmiao3[0] * 60 + xhmiao3[1]) * 1000
        // console.log(miko)
        // console.log(cps+'---'+cps1+'---'+cps2)
        // console.log(this.bTime+'-----'+cps)
        if(this.cikey==0){
          if(cps > cps2){
            console.log('1')
            // console.log(this.cikey)
            // console.log(cps+'---'+cps1+'---'+cps2)
            this.cikey++
            // this.gunci += 60
            let cixi = document.getElementById('ci')
            cixi.style.top = '-' + this.gunci + 'px'
          }
        }else if(this.cikey==miko.length-1){
          console.log('最后')
          if(cps >= cps2){
            console.log('2')
            this.gunci += 60
            let cixi = document.getElementById('ci')
            cixi.style.top = '-' + this.gunci + 'px'
            clearInterval(this.$store.state.cizt)
            this.$store.state.zoudong = 1
          }
          // console.log(this.cikey)
          // this.gunci = 60 * (miko.length-1)
          // let cixi = document.getElementById('ci')
          // cixi.style.top = '-' + this.gunci + 'px'
          // clearInterval(this.$store.state.cizt)
        }else{
          if(cps > cps1 && cps < cps2){
            console.log('3')
            this.cikey++
            this.gunci += 60
            let cixi = document.getElementById('ci')
            cixi.style.top = '-' + this.gunci + 'px'
          }
        }

        // if(this.hmiao==500){
        //   console.log(xhmiao)
        //   console.log(cps+'---'+cps1+'---'+cps2)
        // }
        // console.log(this.cikey)
      },10)
    }

    // 判断播放状态和播放的歌
    if (this.url != null && this.$store.state.zt != 1) {
      mics.play();
    }
    // let xki = document.getElementById('ci')
    // console.log(xki.style.top)
  },
};
</script>

<style scoped>
@import url("../../../public/css/font.css");

.n-top {
  width: 1300px;
  height: 60px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-evenly;
  /* align-items: center; */
  background: rgb(2, 30, 71,0.3);
}

.cimg {
  display: flex;
  align-items: center;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}

@keyframes mois {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.xuanz {
  animation: mois 7s 0s linear infinite;
}

.bo_fmos {
  width: 40px;
  text-align: center;
  line-height: 60px;
  /* background: seagreen; */
}

.bo_fmos span {
  font-size: 25px;
}

.Ge_qu {
  width: 200px;
  /* background: mediumslateblue; */
}

.bo_fzt {
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: salmon; */
}

.bo_fzt span {
  font-size: 50px;
  /* color: rgb(139, 137, 137); */
}

.Ge_ci {
  width: 600px;
  overflow: hidden;
  /* background: maroon; */
}

/* 音量 */
.yinl {
  width: 154px;
  display: flex;
  justify-content: space-between;
  /* background: silver; */
}

.aaxs {
  font-size: 30px;
  line-height: 60px;
}

.njx {
  width: 30px;
  /* background: seashell; */
}

.yin_ns {
  /* 136 */
  width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  /* background: sienna; */
}

#yl {
  width: 120px;
}

/* range控件 */

input[type="range"] {
  display: block;
  position: relative;
  width: 480px;
  height: 48px;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}

/*range中心圆点*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 18px;
  width: 18px;
  border-radius: 100%;
  background-color: #fff;
  cursor: pointer;
  margin-top: -7px;
  -webkit-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

/*range轨道*/
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background-color: rgb(228, 61, 139);
  border-radius: 4px;
  cursor: pointer;
}

/* 音乐进度条 */

.Ge_q_jdt {
  display: flex;
  justify-content: space-between;
}

.ziti {
  width: 80px;
  height: 20px;
  display: -webkit-box;
  /* 从顶部向底部垂直布置子元素 */
  -webkit-box-orient: vertical;
  /* 第三行后开始省略 */
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.jdtzz {
  width: 100%;
  height: 30px;
  padding-top: 10px;
  /* background: salmon; */
}

.tiaozi {
  width: 190px;
  height: 3px;
  margin: 0 auto;
  position: relative;
  border-radius: 10px;
  background: white;
}

.yuanq {
  width: 10px;
  height: 10px;
  border-radius: 25px;
  position: absolute;
  top: -3px;
  /* -3% 至 97% */
  left: 0px;
  background: rgb(248, 151, 252);
}

.bof_time {
  margin-top: 5px;
  text-align: center;
}

.redcolor {
  width: 0px;
  height: 3px;
  position: relative;
  border-radius: 10px;
  background: rgb(248, 142, 142);
}

/* 滚动歌词 */
.ci{
  width: 100%;
  height: 60px;
  position: relative;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  transition: 1.5s;
  /* background: yellowgreen; */
}

</style>