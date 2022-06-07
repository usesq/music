<template>
  <div>
    <table>
      <tr class="flex_on">
        <td class="Tab_o">&nbsp;</td>
        <td class="Tab_t">操作</td>
        <td class="Tab_s">标题</td>
        <td class="Tab_vip">&nbsp;</td>
        <td class="Tab_f">歌手</td>
        <td class="Tab_fw">专辑</td>
        <td class="Tab_mv">&nbsp;</td>
        <td class="Tab_n">时间</td>
      </tr>
      <tr
        class="flex_on oon"
        v-for="(item, key) in momsan"
        :class="{ dcc: navman(key) }"
        @dblclick="bo_Ge(item.id, item.name, item.ar, item.al.picUrl, item.dt)"
      >
        <!-- 列 -->
        <td class="Tab_o">
          <template v-if="key < 9"> 0{{ key + 1 }} </template>
          <template v-else>
            {{ key + 1 }}
          </template>
        </td>
        <!-- 操作 -->
        <td class="Tab_t">
          <template v-if="$store.state.cookie!=''">
            <template v-if="Panduan(item.id)">
              <span class="iconfont icon-xihuan" style="margin: 7px;color:red"></span>
            </template>
            <template v-else>
              <span class="iconfont icon-xihuan1" style="margin: 7px"></span>
            </template>
          </template>
          <template v-else>
            <span class="iconfont icon-xihuan1" style="margin: 7px"></span>
          </template>
          <span class="iconfont icon-xiazai" @click="xiazai(item.id)">
            <a id="xzgq" :href="url" target="_blank"></a>
          </span>
        </td>
        <!-- 标题 -->
        <td class="Tab_s">
          <p class="p_dq" style="display:inline-block">
            {{ item.name }}
            <template v-if="item.alia != ''">
              <span style="color: white">（{{ item.alia[0] }}）</span>
            </template>
          </p>
        </td>
        <!-- VIP -->
        <td class="Tab_vip">
          <template v-if="item.fee==1">
            <span class="vip iconfont icon-vip"></span>
          </template>
        </td>
        <!-- 歌手 -->
        <td class="Tab_f">
          <p class="p_dq">
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
        </td>
        <!-- 专辑 -->
        <td class="Tab_fw">
          <p class="p_dq">
            {{ item.al.name }}
          </p>
        </td>
        <!-- MV -->
        <td class="Tab_mv">
          <template v-if="item.mv!=0">
            <span class="iconfont icon-01"></span>
          </template>
        </td>
        <!-- 歌曲时间 -->
        <td class="Tab_n">
          {{ item.dt }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { misir,Xz } from "@/network/Song_list_data";

export default {
  name: "Ge_qu",
  props: ["momsan"],
  data() {
    return {
      url:''
    };
  },
  methods: {
    // 判断该歌曲是否在我喜欢里
    Panduan(x){
      // console.log(this.$store.state.Woxihuan)
      let i = 0
      let fuck = false
      for(i;i<this.$store.state.Woxihuan.length;i++){
        if(this.$store.state.Woxihuan[i].id==x){
          fuck = true
        }
      }
      return fuck
    },

    // 下载
    xiazai(x){
      Xz(x).then(res=>{
        console.log(res.data.data)
        if(res.data.data.url==null){
          console.log('抱歉，暂无资源')
        }else{
          // this.url=res.data.data.url
          // location.href = res.data.data.url
        }
      })
    },
    // 表格样式
    navman(x) {
      // console.log(x)
      if (x % 2 == 0) {
        return true;
      } else {
        return false;
      }
    },

    // 播放歌曲添加id
    bo_Ge(x, a, b, c, m) {
      // 请求歌曲数据
      misir(x).then((res) => {
        // 判断点击的歌曲是否是正在播放的歌曲
        let vio = false
        if(x==this.$store.state.mirou.id){
          vio=true
          // console.log('fuck')
        }
        if(vio){
          console.log('这首歌正在播放')
        }else{
          this.$store.state.zt=0
          this.$store.state.lishi_key=0
          this.$store.state.minin = 0
          this.$store.state.csi = 0
          this.$store.state.zoudong=0
          this.$store.state.kaomao = 0

          // console.log('清除')
          clearInterval(this.$store.state.cizt)
          clearInterval(this.$store.state.InTime)
        }

        // 歌曲数据
        let piu = res.data.data[0];
        // console.log(piu.url)
        let mi = 0;
        // 已存在的歌曲
        let ios = "";
        let bool = true;
        // 判断是否是第一次
        if (this.$store.state._lb.length != 0 || this.$store.state.top_music!='') {
          console.log('azzzz')
          for (mi; mi < this.$store.state._lb.length; mi++) {
            // 遍历播放列表判断是否有该歌曲
            if (this.$store.state._lb[mi].id == x) {
              bool = false;
              // 把该歌曲的下标赋值
              ios = mi;
              this.$store.state.mirou = { id: this.$store.state._lb[ios].id, name: this.$store.state._lb[ios].name, gesou: this.$store.state._lb[ios].gesou, img: this.$store.state._lb[ios].img , time: this.$store.state._lb[ios].time};
            
              this.$store.state.lishi.push({ id: this.$store.state._lb[ios].id, name: this.$store.state._lb[ios].name, gesou: this.$store.state._lb[ios].gesou, img: this.$store.state._lb[ios].img , time: this.$store.state._lb[ios].time})
            }
          }
          if(bool){
            this.$store.state.bo_Ge.push(piu);
            this.$store.state._lb.push({ id: x, name: a, gesou: b, img: c , time: m});
            this.$store.state.mirou = { id: x, name: a, gesou: b, img: c , time: m};

            this.$store.state.lishi.push({ id: x, name: a, gesou: b, img: c , time: m})
          }
          
        } else {
          console.log('akkk')
          // 往播放列表添加歌曲
          this.$store.state.bo_Ge.push(piu);
          this.$store.state._lb.push({ id: x, name: a, gesou: b, img: c , time: m});
          // 正在播放的歌曲
          this.$store.state.mirou = { id: x, name: a, gesou: b, img: c , time: m};

          this.$store.state.lishi.push({ id: x, name: a, gesou: b, img: c , time: m})
        }
        
      });
    },
  },
};
</script>

<style scoped>
@import url("../../../public/css/font.css");

/* ------------------表格部分--------------------- */
.flex_one {
  width: 100%;
  display: flex;
  /* flex: 1; */
}

.dcc {
  background: rgba(15, 44, 88, 0.192);
}

.flex_one tr {
  box-sizing: border-box;
}

.Tab_o {
  width: 50px;
  height: 30px;
  text-align: right;
  padding-right: 5px;
  /* background: white; */
  /* border-bottom: springgreen 1px solid; */
}

.Tab_t {
  width: 50px;
  height: 30px;
  padding: 0 5px;
  /* background: salmon; */
}

.Tab_s {
  width: 390px;
  height: 30px;
  padding: 0 5px;
  display: -webkit-box;
  line-height: 30px;
  /* 从顶部向底部垂直布置子元素 */
  -webkit-box-orient: vertical;
  /* 第三行后开始省略 */
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* background: lemonchiffon; */
}

.Tab_f {
  width: 180px;
  height: 30px;
  padding: 0 5px;
  /* background: forestgreen; */
}

.Tab_fw {
  width: 240px;
  height: 30px;
  padding: 0 5px;
  /* background: rebeccapurple; */
}

.Tab_n {
  width: 70px;
  height: 30px;
  padding: 0 5px;
  /* background: mediumaquamarine; */
}

.Tab_vip{
  width: 40px;
  text-align: center;
  /* background: red; */
}

.vip{
  color: red;
  border: 1px red solid;
  padding: 0 3px;
}

.Tab_mv{
  width: 40px;
  text-align: center;
  /* background: red; */
}

.icon-01{
  color: red;
}

.p_dq {
  display: -webkit-box;
  line-height: 30px;
  /* 从顶部向底部垂直布置子元素 */
  -webkit-box-orient: vertical;
  /* 第三行后开始省略 */
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.oon:hover {
  background: rgba(226, 224, 224, 0.897);
}
</style>