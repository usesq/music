<template>
  <Scoll id="zt">
    <template v-for="(item,key) in mocs">
      <tr class="dange">
        <td class="one">
          <img :src="mocs[mocs.length-1-key].img" alt="">
        </td>
        <td class="two">{{mocs[mocs.length-1-key].name}}</td>
        <td class="si">{{mocs[mocs.length-1-key].gesou[0].name}}</td>
        <td class="ssj">{{mocs[mocs.length-1-key].time}}</td>
      </tr>
    </template>
  </Scoll>
</template>

<script>
import Scoll from "@/components/Scoll";

export default {
  components:{
    Scoll
  },
  data(){
    return {
      mocs:[]
    }
  },
  methods:{
    Quc(){
      let mospc = this.$store.state.lishi
      let arr = []
      let i = 0
      for(i;i<mospc.length;i++){
        let c = i+1
        let bol = false
        for(c;c<mospc.length;c++){
          if(mospc[i].id==mospc[c].id){
            bol = true
          }
        }
        if(!bol){
          arr.push(mospc[i])
        }
      }
      this.mocs = arr
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
    
    this.Quc()
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

#zt{
  height: 650px;
}

img{
  width: 45px;
  border-radius: 25px;
}

.dange{
  width: 1010px;
  height: 50px;
  display: flex;
  padding: 0 10px;
  margin-bottom: 5px;
  justify-content: space-between;
  align-items: center;
  background: rgba(28, 58, 92, 0.507);
}

.one{
  width: 100px;
  display: flex;
  align-items: center;
}

.two{
  width: 700px;
  display: -webkit-box;
  /* 从顶部向底部垂直布置子元素 */
  -webkit-box-orient: vertical;
  /* 第三行后开始省略 */
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.si{
  width: 200px;
  display: -webkit-box;
  /* 从顶部向底部垂直布置子元素 */
  -webkit-box-orient: vertical;
  /* 第三行后开始省略 */
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.ssj{
  width: 50px;
}
</style>