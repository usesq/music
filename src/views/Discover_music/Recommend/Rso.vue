<template>
  <!--<div class="content">-->
  <Scoll :key="new Date().getTime()">
    <p class="tjgd">推荐歌单</p>
    <div class="gedan">
      <template v-for="(item, key) in $store.state.Boutique_song_list">
        <div
          class="card"
          v-if="key < 5 && $store.state.cookie == ''"
          @click="T_huan(item.id)"
        >
          <img :src="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
          <p class="b_f">
            <span class="iconfont icon-bofang"></span>{{ item.playCount }}
          </p>
        </div>
      </template>
      <div class="card" v-for="(item, key) in $store.state.Boutique_list" @click="T_huan(item.id)">
        <template v-if="key < 5 && $store.state.cookie != ''">
          <img :src="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
          <p class="b_f">
            <span class="iconfont icon-bofang"></span>{{ item.playcount }}
          </p>
        </template>
      </div>
    </div>

    <p v-if="$store.state.cookie != ''" class="tjgd">推荐音乐</p>
    <div class="zxyy" v-if="$store.state.cookie != ''">
      <template v-for="(item, key) in $store.state.Recommended_songs">
        <div class="G_q" v-if="key < 10">
          <img :src="item.al.picUrl" alt="" />
          <p class="G_one">{{ item.name }}</p>
          <p class="G_two">
            <template v-for="(cos, losf) in item.ar">
              <template v-if="losf + 1 < item.ar.length">
                {{ cos.name }}
                <span> / </span>
              </template>
              <template v-else>
                {{ cos.name }}
              </template>
            </template>
          </p>
          <template v-if="$store.state.mirou.id != item.id">
            <div class="Bo_F" @click="djxmc(item.id)"></div>
          </template>
          <template v-else>
            <template v-if="$store.state.zt == 1">
              <div class="Bo_F" @click="djxmc(item.id)"></div>
            </template>
            <template v-else>
              <div>
                <span class="iconfont icon-zanting bofangzhong"></span>
              </div>
            </template>
          </template>
        </div>
      </template>
    </div>

    <p class="tjgd">推荐新音乐</p>
    <div class="zxyy">
      <div class="G_q" v-for="(item, key) in $store.state.New_music">
        <template v-if="key < 10">
          <img :src="item.picUrl" alt="" />
          <p class="G_one">{{ item.name }}</p>
          <p class="G_two">
            <template v-for="(cos, losf) in item.song.artists">
              <template v-if="losf + 1 < item.song.artists.length">
                {{ cos.name }}
                <span> / </span>
              </template>
              <template v-else>
                {{ cos.name }}
              </template>
            </template>
          </p>
          <template v-if="$store.state.mirou.id != item.id">
            <div class="Bo_F" @click="djxmc(item.id)"></div>
          </template>
          <template v-else>
            <template v-if="$store.state.zt == 1">
              <div class="Bo_F" @click="djxmc(item.id)"></div>
            </template>
            <template v-else>
              <div>
                <span class="iconfont icon-zanting bofangzhong"></span>
              </div>
            </template>
          </template>
        </template>
      </div>
    </div>
    <p class="tjgd">推荐MV</p>
    <div class="TjMV">
      <template v-for="(item, key) in $store.state.TJ_MV">
        <div v-if="key < 3" class="MV_one" @click="dy(item)">
          <img :src="item.picUrl" alt="" />
          <p class="faS">{{ item.name }}</p>
          <p style="font-size: 12px; color: white">
            {{ item.artists[0].name }}
          </p>
          <p class="P_SM">
            <span class="iconfont icon-bofang"></span>{{ item.playCount }}
          </p>
        </div>
      </template>
    </div>
  </Scoll>
  <!--</div>-->
</template>

<script>
import Scoll from "@/components/Scoll";
import { misir, subsong } from "@/network/Song_list_data";

export default {
  name: "Rso",
  components: {
    Scoll,
  },
  data() {
    return {
      csx:1
    };
  },
  methods: {
    mcs(x){
      console.log(x)
    },
    // 跳转mv页面
    dy(x){
      // 历史路由操作
      let c = 0
      let arr = []
      for(c;c<=this.$store.state.luykey;c++){
        arr.push(this.$store.state.lisluy[c])
      }
      this.$store.state.lisluy = arr
      // console.log(this.$store.state.lisluy)
      // console.log(this.$store.state.luykey)
      this.$router.push('/MV/'+x.id+'/'+this.csx)
    },

    // 替换
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

    djxmc(x) {
      // 播放url，详情
      this.$axios.all([misir(x), subsong(x)]).then((res) => {
        let pms = parseInt(res[1].data.songs[0].dt / 1000 / 60);
        let pmop = parseInt((res[1].data.songs[0].dt / 1000) % 60);
        if (pms < 10) {
          pms = "0" + pms;
        }
        if (pmop < 10) {
          pmop = "0" + pmop;
        }
        res[1].data.songs[0].dt = pms + ":" + pmop;

        // 判断点击的歌曲是否是正在播放的歌曲
        let vio = false;
        if (x == this.$store.state.mirou.id) {
          vio = true;
          // console.log('fuck')
        }

        // 歌曲数据
        let piu = res[0].data.data[0];
        console.log(res[0].data.data[0].url);
        let mi = 0;
        // 已存在的歌曲
        let ios = "";
        let bool = true;
        // 判断是否是第一次
        if (
          this.$store.state.bo_Ge.length != 0 ||
          this.$store.state.top_music != ""
        ) {
          for (mi; mi < this.$store.state.bo_Ge.length; mi++) {
            // 遍历播放列表判断是否有该歌曲
            if (this.$store.state.bo_Ge[mi].id == x) {
              bool = false;
              // 把该歌曲的下标赋值
              ios = mi;
              this.$store.state.mirou = {
                id: this.$store.state._lb[ios].id,
                name: this.$store.state._lb[ios].name,
                gesou: this.$store.state._lb[ios].gesou,
                img: this.$store.state._lb[ios].img,
                url: this.$store.state._lb[ios].url,
                time: this.$store.state._lb[ios].time,
              };

              this.$store.state.lishi.push({
                id: this.$store.state._lb[ios].id,
                name: this.$store.state._lb[ios].name,
                gesou: this.$store.state._lb[ios].gesou,
                img: this.$store.state._lb[ios].img,
                url: this.$store.state._lb[ios].url,
                time: this.$store.state._lb[ios].time,
              });
            }
          }
          if (bool) {
            this.$store.state.bo_Ge.push(piu);
            // console.log(piu)
            this.$store.state._lb.push({
              id: x,
              name: res[1].data.songs[0].al.name,
              gesou: res[1].data.songs[0].ar,
              img: res[1].data.songs[0].al.picUrl,
              url: res[0].data.data[0].url,
              time: res[1].data.songs[0].dt,
            });
            this.$store.state.mirou = {
              id: x,
              name: res[1].data.songs[0].al.name,
              gesou: res[1].data.songs[0].ar,
              img: res[1].data.songs[0].al.picUrl,
              url: res[0].data.data[0].url,
              time: res[1].data.songs[0].dt,
            };

            this.$store.state.lishi.push(this.$store.state.mirou);
            console.log(this.$store.state.lishi);
          }
        } else {
          // 往播放列表添加歌曲
          this.$store.state.bo_Ge.push(piu);
          this.$store.state._lb.push({
            id: x,
            name: res[1].data.songs[0].al.name,
            gesou: res[1].data.songs[0].ar,
            img: res[1].data.songs[0].al.picUrl,
            url: res[0].data.data[0].url,
            time: res[1].data.songs[0].dt,
          });
          // 正在播放的歌曲
          this.$store.state.mirou = {
            id: x,
            name: res[1].data.songs[0].al.name,
            gesou: res[1].data.songs[0].ar,
            img: res[1].data.songs[0].al.picUrl,
            url: res[0].data.data[0].url,
            time: res[1].data.songs[0].dt,
          };

          this.$store.state.lishi.push(this.$store.state.mirou);
        }
        // console.log(x)

        // console.log(this.$store.state.lishi)
        // console.log(b)
        if (vio) {
          console.log("这首歌正在播放");
        } else {
          this.$store.state.zt = 0;
          this.$store.state.lishi_key = 0;
          this.$store.state.minin = 0;
          this.$store.state.csi = 0;
          this.$store.state.zoudong = 0;

          // console.log('清除')
          clearInterval(this.$store.state.cizt);
          clearInterval(this.$store.state.InTime);
        }
      });
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
    // console.log(this.$route.path)
  }
};
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
.Scoll {
  height: 610px;
  background: rgba(15, 44, 88, 0.192);
  border-radius: 0 0 10px 0;
  /*overflow: scroll;*/
}

.tjgd {
  margin: 5px 20px 0 20px;
  padding-top: 5px;
}

/*------------------推荐歌单----------------------*/

.gedan {
  width: 950px;
  height: 210px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: auto;
  padding: 10px 5px;
  justify-content: space-between;
  overflow: hidden;
  /*background: rgba(0,0,156);*/
}

.card:hover {
  bottom: 5px;
  box-shadow: 0px 0px 5px;
}

.card {
  width: 170px;
  height: 220px;
  position: relative;
  bottom: 0;
  transition: 0.1s;
  border-radius: 15px 15px 15px 15px;
  /*background: #8c30be;*/
}

.card p {
  margin: 0 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.gedan img {
  border-radius: 15px;
  width: 170px;
  height: 170px;
}

.b_f {
  position: absolute;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.747);
  top: 5px;
  right: 5px;
}

.icon-bofang {
  margin-right: 5px;
}
/*--------------------推荐音乐------------------------*/

.zxyy {
  width: 950px;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: auto;
  /*padding-top: 10px;*/
  padding: 10px 5px;
  justify-content: space-between;
  overflow: hidden;
  /*background: rgba(0,0,0);*/
}

.G_q {
  width: 170px;
  height: 50px;
  font-size: 12px;
  display: flex;
  position: relative;
  bottom: 0;
  transition: 0.1s;
  border-radius: 25px;
  background: white;
}

.G_q:hover {
  bottom: 5px;
  box-shadow: 0px 0px 5px;
}

.G_q:hover .Bo_F {
  visibility: visible;
}

.G_q img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
}

.G_one {
  height: 17px;
  width: 100px;
  position: absolute;
  top: 5px;
  left: 60px;
  /*background: red;*/
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.G_two {
  height: 17px;
  position: absolute;
  bottom: 5px;
  left: 60px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.Bo_F {
  height: 0;
  width: 0;
  position: absolute;
  visibility: hidden;
  top: 15px;
  left: 20px;
  border-top: solid 10px rgba(0, 0, 0, 0);
  border-bottom: solid 10px rgba(0, 0, 0, 0);
  border-right: solid 10px rgba(0, 0, 0, 0);
  border-left: solid 15px rgba(255, 255, 255, 1);
  z-index: 555;
}

/*----------------推荐mv-----------------*/
.TjMV {
  width: 950px;
  height: 220px;
  margin: auto;
  margin-bottom: 15px;
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
}

.TjMV img {
  width: 300px;
  height: 180px;
  border-radius: 5px;
}

.MV_one {
  position: relative;
  width: 300px;
}

.faS {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.P_SM {
  position: absolute;
  color: rgba(255, 255, 255, 0.747);
  top: 0;
  right: 5px;
}

.bofangzhong {
  font-size: 25px;
  color: white;
  position: absolute;
  visibility: hidden;
  top: 12px;
  left: 13px;
}

.G_q:hover .bofangzhong {
  visibility: visible;
}
</style>