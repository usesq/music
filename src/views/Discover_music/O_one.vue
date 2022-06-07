<template>
  <div class="ztbf">
    <div class="top">
      <router-link v-for="(item,key) in lbw" @click.native="MeSilt(key)" :class="{djh:cssys(item.obm)}" :to="item.obm" tag="li">{{item.name}}</router-link>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: "O_one",
  data(){
    return {
      lbw:[
        {
          name:'个性推荐',
          obm:'/O_one/Rso'
        },
        {
          name:'歌单',
          obm:'/O_one/PLID'
        },
        {
          name:'排行榜',
          obm:'/O_one/HList'
        },
        {
          name:'歌手',
          obm:'/O_one/Gcs'
        }
      ]
    }
  },
  methods:{
    // 样式
    cssys(x){
      if(this.$route.path.indexOf(x)==0){
        return true
      }
    },

    // 响应式修改数组内容
    MeSilt(x){
      // 历史路由操作
      let c = 0
      let arr = []
      for(c;c<=this.$store.state.luykey;c++){
        arr.push(this.$store.state.lisluy[c])
      }
      this.$store.state.lisluy = arr
      
      console.log('>>>>>>>>>>>>头部点谁改谁>>>>>>>>>>')
      let item
      let Honame
      let sos
      // 响应式修改数组内容
      for(item in this.lbw){
        if(item==x){
          Honame = this.lbw[item].name
          sos = this.lbw[item].obm
          this.lbw.splice(item,1,{name:Honame,value:true,obm:sos})
        }else{
          Honame = this.lbw[item].name
          sos = this.lbw[item].obm
          this.lbw.splice(item,1,{name:Honame,value:false,obm:sos})
        }
      }
      console.log('>>>>>>>>>>>>结束点谁改谁>>>>>>>>>>')
    }
  }
}
</script>

<style scoped>
/* 整体 */
.ztbf{
  width: 100%;
  height: 100%;
}

/*.content{*/
/*  border-radius: 0 0 10px 0;*/
/*}*/
/*----------------------头部导航------------------------*/
.top{
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
li{
  width: 100px;
  height: 30px;
  float: left;
  font-size: 18px;
  text-align: center;
  list-style: none;
}
li:hover{
  color: white;
}
.djh{
  color: white;
  box-sizing: border-box;
  border-bottom: solid 2px red;
}
</style>