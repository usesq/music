<template>
  <Scoll class="zt">
    <div>
      <div style="height:32px" class="mcx">
        <div class="t-one linglei">语种：</div>
        <div class="t-two">
          <template v-for="(item,key) in yz">
            <template v-if="key!=0">
              <span class="cif-c">
                <span @click="lx.yz=item.name;his=0" class="cit" :class="{sz:yzpd(item.name)}">
                  {{item.name}}
                </span>
              </span>
            </template>
            <template v-else>
              <span class="cif">
                <span @click="lx.yz=item.name;his=0" class="cit" :class="{sz:yzpd(item.name)}">
                  {{item.name}}
                </span>
              </span>
            </template>
          </template>
        </div>
      </div>
      <div class="mcx">
        <div class="t-one linglei">分类：</div>
        <div class="t-two">
          <template v-for="(item,key) in fl">
            <template v-if="key!=0">
              <span class="cif-c">
                <span @click="lx.fl=item.name;his=0" class="cit" :class="{sz:flpd(item.name)}">
                  {{item.name}}
                </span>
              </span>
            </template>
            <template v-else>
              <span class="cif">
                <span @click="lx.fl=item.name;his=0" class="cit" :class="{sz:flpd(item.name)}">
                  {{item.name}}
                </span>
              </span>
            </template>
          </template>
        </div>
      </div>   
      <div class="mcx">
        <div class="t-one saixuan">筛选：</div>
        <div class="t-two">
          <span v-for="item in zm" class="cif">
            <span @click="lx.zm=item;his=0" class="cit" :class="{sz:sxpd(item)}">
              {{item}}
            </span>
          </span>
        </div>
      </div>
      <div class="pb">
        <template v-for="item in listc">
          <div class="ls-c" @click="kk(item.id)">
            <img :src="item.img1v1Url" alt="">
            <p>{{item.name}}</p>
          </div>
        </template>
      </div>
    </div>
  </Scoll>
</template>

<script>
import Scoll from "@/components/Scoll";

import { Singer,Gxi,Gsong } from "@/network/Bar"

export default {
  components: {
    Scoll
  },
  data(){
    return {
      // 当前所在分类
      lx:{
        yz:'全部',
        fl:'全部',
        zm:'热门'
      },
      // 语种
      yz:[
        {
          name:'全部',
          value:-1
        },
        {
          name:'华语',
          value:7
        },
        {
          name:'欧美',
          value:96
        },
        {
          name:'日本',
          value:8
        },
        {
          name:'韩国',
          value:16
        },
        {
          name:'其他',
          value:0
        }
      ],
      // 分类
      fl:[
        {
          name:'全部',
          value:-1
        },
        {
          name:'男歌手',
          value:1
        },
        {
          name:'女歌手',
          value:2
        },
        {
          name:'乐队组合',
          value:3
        }
      ],
      // 字母
      zm:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      // 歌手数据
      listc:[],

      his:1
    }
  },
  methods:{
    // 获取歌手信息
    // 获取歌手最热门的50首音乐
    kk(x){
      // 历史路由操作
      let c = 0
      let arr = []
      for(c;c<=this.$store.state.luykey;c++){
        arr.push(this.$store.state.lisluy[c])
      }
      this.$store.state.lisluy = arr
      
      this.$axios.all([Gxi(x),Gsong(x)]).then(res=>{
        this.$store.state.Gxxh = res[0].data.data.artist
        // 计算歌曲时间
        let i = 0;
        for (; i < res[1].data.songs.length; i++) {
          let pms = parseInt(res[1].data.songs[i].dt / 1000 / 60);
          let pmop = parseInt((res[1].data.songs[i].dt / 1000) % 60);
          if (pms < 10) {
            pms = "0" + pms;
          }
          if (pmop < 10) {
            pmop = "0" + pmop;
          }
          res[1].data.songs[i].dt = pms + ":" + pmop;
          // console.log(pms+':'+pmop)
        }
        this.$store.state.Gzr = res[1].data.songs
      })
      this.$router.push('/Gsxi/'+ x)
    },

    // 判断语种
    yzpd(x){
      if(this.lx.yz==x){
        return true
      }
    },
    // 判断分类
    flpd(x){
      if(this.lx.fl==x){
        return true
      }
    },
    // 筛选判断
    sxpd(x){
      if(this.lx.zm==x){
        return true
      }
    },

    // 更新数据
    Sujugx(){
      let n = ''
      let l = ''
      let m = ''
      let i = 0
      for(i;i<this.yz.length;i++){
        if(this.yz[i].name == this.lx.yz){
          n = this.yz[i].value
        }
      }
      i = 0
      for(i;i<this.fl.length;i++){
        if(this.fl[i].name == this.lx.fl){
          l = this.fl[i].value
        }
      }
      if(this.lx.zm!='热门'){
        m = this.lx.zm
      }
       // 请求歌手
      Singer(n,l,m).then(res=>{
        // console.log(res.data.artists)
        this.listc = res.data.artists
      })
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
    // 请求歌手
    Singer(-1,-1).then(res=>{
      // console.log(res.data.artists)
      this.listc = res.data.artists
    })
  },
  updated(){
    // 更新时请求数据
    if(this.his == 0){
      this.Sujugx()
      this.his = 1
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
  width: 980px;
  height: 590px;
  border-radius: 0 0 10px 0;
  background: rgba(15, 44, 88, 0.192);
  padding: 0 25px;
  padding-bottom: 20px;
}

.t-one{
  width: 60px;
  /* margin-top: 10px; */
  /* background: darkcyan; */
  display: inline-block;
}

.t-two{
  width: 920px;
  /* background: rgba(15, 44, 88, 0.192); */
  display: inline-block;
}

.cif{
  width: 80px;
  margin: 6px 0;
  text-align: center;
  border-right: 1px solid rgba(146, 134, 134, 0.301);
  display: inline-block;
}

.cif-c{
  width: 80px;
  text-align: center;
  padding: 0 8px;
  border-right: 1px solid rgba(146, 134, 134, 0.301);
  display: inline-block;
}

.cit{
  border-radius: 15px;
  padding: 3px 10px;
  /* background: red; */
}

.mcx{
  margin-top: 10px;
  display: flex;
  flex: 1;
}

.linglei{
  display: flex;
  align-items: center;
}

.saixuan{
  position: relative;
  top: 5px;
}

.sz{
  color: rgb(245, 224, 224);
  background: rgba(255, 255, 255, 0.26);
}

.pb{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.ls-c{
  /* width: 150px; */
  margin-top: 15px;
  display: inline-block;
  /* flex: 1; */
}

.ls-c img{
  width: 170px;
  height: 170px;
  border-radius: 10px;
}

.ls-c p{
  text-align: center;
}
</style>