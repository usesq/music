<template>
  <Scoll class="Scoll">
    <!-- 头部信息简介 -->
    <div class="E_one">
      <!-- 左侧歌单封面 -->
      <div class="one_one">
        <img class="img_one" :src="smixx.coverImgUrl" alt="" />
      </div>
      <!-- 歌单信息 -->
      <div>
        <!-- 歌单名称 -->
        <h2>{{ smixx.name }}</h2>
        <!-- 歌单发布者的头像，名字，创建时间 -->
        <div class="o_t_T" style="margin: 11px 0">
          <img class="img_two" :src="this.mosl.avatarUrl" alt="" />
          <span style="margin: 0 10px">{{ this.mosl.nickname }}</span>
          <span>{{ Time }}创建</span>
        </div>
        <!-- 播放，分享，下载，收藏 -->
        <div class="Click_ii" style="margin: 17px 0">
          <div style="width: 140px">
            <span class="Span_i" @click="msk()">
              <span class="iconfont icon-bofang Bz"></span>
              播放全部
            </span>
            <div class="Jia" @click="jialb()">十</div>
          </div>
          <div>
            <span class="Span_i">
              <span class="iconfont icon-shoucang1 Bz"></span>
              收藏({{ jian_hua(smixx.subscribedCount) }})
            </span>
          </div>
          <div>
            <span class="Span_i">
              <span class="iconfont icon-fenxiang Bz"></span>
              分享({{ jian_hua(smixx.shareCount) }})
            </span>
          </div>
          <div @click="chufa">
            <span class="Span_i">
              <span class="iconfont icon-xiazai Bz"></span>
              下载全部
            </span>
          </div>
        </div>
        <!-- 歌单标签 -->
        <div style="margin: 5px 0">
          标签：
          <span v-for="(item, key) in smixx.tags">
            {{ item }}
            <span v-if="key+1<smixx.tags.length">/</span>
          </span>
        </div>
        <!-- 歌曲数量，播放量 -->
        <div style="margin-bottom: 5px">
          <span style="margin-right: 10px">歌曲：{{ smixx.trackCount }}</span>
          <span>播放：{{ jian_hua(smixx.playCount) }}</span>
        </div>
        <!-- 歌单介绍 -->
        <div class="dw">
          <p class="jj" id="jianjie">简介：{{ smixx.description }}</p>
          <!-- <div class="sjx"></div> -->
        </div>
        <!-- {{ smixx.description }} -->
      </div>
    </div>
    <!-- 歌曲部分 -->
    <div class="cont">
      <div class="Taber">
        <li class="emos" :class="{ djh: Pan_duan[0] }" @click="Gai_b(0)">
          歌曲列表
        </li>
        <li class="emos" :class="{ djh: Pan_duan[1] }" @click="Gai_b(1)">
          评论({{ smixx.commentCount }})
        </li>
        <!-- <li class="emos" :class="{djh:Pan_duan[2]}" @click="Gai_b(2)">
          收藏者
        </li> -->
      </div>
      <template v-if="Pan_duan[0] == true">
        <Gequ :momsan="music"></Gequ>
      </template>
      <template v-else-if="Pan_duan[1] == true">
        <Pl :Sto="Sto.playlist" :Panduanx="1"></Pl>
      </template>
    </div>
  </Scoll>
</template>

<script>
import { S_L_D, Ge_qu ,comment} from "@/network/Song_list_data";

import Scoll from "@/components/Scoll";
import Gequ from "@/views/Song_d_list/Ge_qu";
import Pl from "@/views/Song_d_list/Pin_lun";

export default {
  name: "Song_list_Deta",
  components: {
    Scoll,
    Gequ,
    Pl,
  },
  data() {
    return {
      // 歌单的信息
      Sto: "",
      // 时间
      Time: "",
      // 歌曲数量
      Shu_l: "",
      // 歌单的歌曲
      music: "",
      // 判断现在在哪，评论/收藏者/歌曲列表
      Pan_duan: [true, false],
      // 当前所在页
      loos: true,

      // 临时容器
      smixx: "",
      mosl: "",
    };
  },
  methods: {
    // 把所有歌曲加入播放列表
    jialb(){
      let i = 0
      let list = []
      // console.log(this.music[0])
      for(i;i<this.music.length;i++){
        list.push(this.PaDuan(this.music[i].id))
        if(list[i].bool==1){
          this.$store.state._lb.push({ 
            id: this.music[i].id, 
            name: this.music[i].name, 
            gesou: this.music[i].ar, 
            img: this.music[i].al.picUrl,
            time: this.music[i].dt
          });
        }
      }
    },
    // 播放全部
    msk(){
      this.$store.state.zt=0
      this.$store.state.lishi_key=0
      this.$store.state.minin = 0
      this.$store.state.csi = 0
      this.$store.state.zoudong=0
      this.$store.state.kaomao = 0

      // console.log('清除')
      clearInterval(this.$store.state.cizt)
      clearInterval(this.$store.state.InTime)

      let i = 0
      let list = []
      // console.log(this.music[0])
      for(i;i<this.music.length;i++){
        list.push(this.PaDuan(this.music[i].id))
        if(list[i].bool==1){
          this.$store.state._lb.push({ 
            id: this.music[i].id, 
            name: this.music[i].name, 
            gesou: this.music[i].ar, 
            img: this.music[i].al.picUrl,
            time: this.music[i].dt
          });
        }
      }
      console.log(list[0])
      this.$store.state.mirou = { 
        id: this.music[0].id, 
        name: this.music[0].name, 
        gesou: this.music[0].ar, 
        img: this.music[0].al.picUrl,
        time: this.music[0].dt
      };
    
      this.$store.state.lishi.push({ 
        id: this.music[0].id, 
        name: this.music[0].name, 
        gesou: this.music[0].ar, 
        img: this.music[0].al.picUrl,
        time: this.music[0].dt
      })

      
    },
    // 判断在当前播放列表中是否存在该歌曲
    PaDuan(x){
      let i = 0
      let cool = 1
      let ios = ''
      for (i; i < this.$store.state._lb.length; i++) {
        // 遍历播放列表判断是否有该歌曲
        if (this.$store.state._lb[i].id == x) {
          // 把该歌曲的下标赋值
          ios = i;
          cool = 2
        }
      }
      return {bool:cool,key:ios}
    },
    // 下载全部
    chufa(){
      
    },

    // 请求评论
    Qin_qiu(x) {
      comment(this.$route.params.id, x)
        .then((res) => {
          // console.log(res);
          // 最新评论
          this.xi = res.data.comments;
          // console.log(this.xi)
        })
        .catch((jet) => {
          console.log(jet);
        });
    },

    // 点谁改谁
    Gai_b(x) {
      // x为该元素的下标
      let spur = this.Pan_duan.indexOf(true);
      // 把数组中为true的替换为false
      this.Pan_duan.splice(spur, 1, false);
      // 找到点击元素的下标，并替换为true
      this.Pan_duan.splice(x, 1, true);
    },
    // 简化数量
    jian_hua(x) {
      // console.log(x)
      let mos = String(x);
      let m = mos.length;
      // console.log(m)
      if (x > 100000000) {
        let kc = mos.substr(0, m - 8);
        return kc + "亿";
      } else if (x > 10000) {
        let kc = mos.substr(0, m - 4);
        return kc + "万";
      } else {
        return x;
      }
    },
  },
  created() {
    if(this.$store.state.lisluy[this.$store.state.luykey]!=this.$route.path){
      console.log('添加路由')
      this.$store.state.lisluy.push(this.$route.path)
      this.$store.state.luykey++
    }else{
      console.log('你正在初始位置')
      console.log(this.$store.state.lisluy[this.$store.state.luykey])
    }
    
    // 请求歌单信息
    S_L_D(this.$route.params.id)
      .then((res) => {
        this.Sto = res.data;
        console.log(this.Sto)

        this.smixx = this.Sto.playlist;
        this.mosl = this.smixx.creator;
        // console.log(this.smixx);

        // 歌曲数量
        this.Shu_l = this.Sto.playlist.trackCount;
        // console.log(this.Shu_l);
        // 请求歌单所有歌曲
        Ge_qu(this.$route.params.id, this.Shu_l)
          .then((res) => {
            // console.log(res);
            this.music = res.data.songs;
            // console.log(this.music);

            // 计算歌曲时间
            let i = 0;
            for (; i < this.music.length; i++) {
              let pms = parseInt(this.music[i].dt / 1000 / 60);
              let pmop = parseInt((this.music[i].dt / 1000) % 60);
              if (pms < 10) {
                pms = "0" + pms;
              }
              if (pmop < 10) {
                pmop = "0" + pmop;
              }
              this.music[i].dt = pms + ":" + pmop;
              // console.log(pms+':'+pmop)
            }
          })
          .catch((jet) => {
            console.log(jet);
          });

        // console.log(this.Sto.playlist);

        // 创建歌单的时间转换
        let date = new Date(this.Sto.playlist.createTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        this.Time = y + "-" + m + "-" + d;
      })
      .catch((jet) => {
        console.log(jet);
      });
  },
  mounted() {},
};
</script>

<style scoped>
@import url("../../public/css/font.css");

/* --------------------------滚轮样式------------------ */
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

.Scoll {
  height: 650px;
  width: 100%;
  background: rgba(15, 44, 88, 0.192);
  overflow-x: hidden;
  border-radius: 0 0 10px 0;
}

/* --------------------------------------- */

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

.img_two {
  width: 30px;
  height: 30px;
  /* border: 1px solid black; */
  border-radius: 25px;
}

.o_t_T {
  display: flex;
  align-items: center;
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
  border-left: 1px solid rgba(34, 34, 34, 0.219);
  border-radius: 0 25px 25px 0;
}

.Span_i {
  display: inline-block;
  margin: 5px 15px;
}

.Bz {
  margin-right: 5px;
}

.jj {
  width: 690px;
  margin-bottom: 5px;
}

.sjx {
  height: 0;
  width: 0;
  position: absolute;
  top: 0;
  right: -40px;
  border-top: black 10px solid;
  border-left: rgba(0, 0, 0, 0) 10px solid;
  border-right: rgba(0, 0, 0, 0) 10px solid;
  border-bottom: rgba(0, 0, 0, 0) 10px solid;
}

/* ----------------歌曲部分------------------ */
.cont {
  width: 100%;
  /* height: 150px; */
}

/* --------------------歌曲列表------------- */
.Taber {
  height: 40px;
  /* margin-bottom: 15px; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgba(181, 185, 185, 0.322);
  /* background: salmon; */
}

.emos {
  list-style: none;
  font-size: 16px;
}

.djh {
  font-weight: bold;
  font-size: 18px;
}
</style>