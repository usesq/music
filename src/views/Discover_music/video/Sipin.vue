<template>
  <Scoll class="zt">
    <liBar class="lbnr" :qb="'ACG音乐'" :tag='tag' @ClickXi='Panduan'></liBar>
    <div class="zhengge">
      <template v-for="(item,key) in list">
        <template v-if="(key+1)%3==0">
          <div class="canti" @click="jinru(item)">
            <img :src="item.coverUrl" alt="">
            <p class="wben">{{item.title}}</p>
            <p class="zuoze">by&nbsp;{{item.creator.nickname}}</p>
          </div>
        </template>
        <template v-else>
          <div class="danti" @click="jinru(item)">
            <img :src="item.coverUrl" alt="">
            <p class="wben">{{item.title}}</p>
            <p class="zuoze">by&nbsp;{{item.creator.nickname}}</p>
          </div>
        </template>
      </template>
    </div>
  </Scoll>
</template>

<script>
import Scoll from "@/components/Scoll";
import liBar from "@/components/listbar";

import {Bqsp,Splb} from "@/network/Bar"

export default {
  components: {
    Scoll,
    liBar
  },
  data(){
    return {
      // 视频类型
      tag:'',
      list:[],
      // 用来请求多次
      cx:0,
      mio:0,
      // 用来判断是mv还是视频
      csx:2,
      // 请求的类型
      qqlx:'',
      pms:[]
    }
  },
  methods:{
    jinru(x){
      // 历史路由操作
      let c = 0
      let arr = []
      for(c;c<=this.$store.state.luykey;c++){
        arr.push(this.$store.state.lisluy[c])
      }
      this.$store.state.lisluy = arr

      this.$router.push('/MV/'+x.vid+'/'+this.csx)
    },

    Panduan(x){
      console.log(x)
      let item
      for(item in this.tag){
        if(this.tag[item].name==x){
          this.qqlx = this.tag[item].id
          // console.log(this.qqlx)
        }
        // console.log(this.tag[item])
      }
      this.cx = 0
      this.pms = []
      this.mio = 0
      this.Shuju()
    },

    Shuju(){
      Bqsp(this.qqlx,this.cx).then(res=>{
        let c = 0
        if(this.mio%2!=0){
          for(c;c<res.data.datas.length;c++){
            this.pms.push(res.data.datas[c].data)
          }
        }
        if(this.mio!=17){
          this.mio++
          this.cx += 8
          this.Shuju()
        }else{
          this.list = this.pms
          console.log(this.list)
        }
      })
    },
    dyc(){
      Bqsp(this.qqlx,this.cx).then(res=>{
        let c = 0
        if(this.mio%2!=0){
          for(c;c<res.data.datas.length;c++){
            this.pms.push(res.data.datas[c].data)
          }
        }
        if(this.mio!=15){
          this.mio++
          this.cx += 8
          this.Shuju()
        }else{
          this.list = this.pms
          console.log(this.list)
        }
        // console.log(this.list)
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

    Splb().then(res=>{
      this.tag = res.data.data
      console.log(res.data.data)
    })
    this.qqlx = 57104
    this.dyc()
  }
}
</script>

<style scoped>
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

.zt{
  width: 990px;
  height: 620px;
  padding: 15px 20px;
  border-radius: 0 0 10px 0;
  background: rgba(15, 44, 88, 0.192);
}

.danti{
  width: 315px;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
  /* overflow: hidden; */
}

.canti{
  /* width: 315px; */
  display: inline-block;
}

.zhengge img{
  width: 315px;
  height: 200px;
  border-radius: 8px;
  width: 315px;
  overflow: hidden;
}

.wben{
  width: 315px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.zuoze{
  color: white;
}

.lbnr{
  margin-bottom: 20px;
}
</style>