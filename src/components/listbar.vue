<template>
<div class="div-asi">
  <span class="asi">{{this.fc}}&nbsp;&nbsp;></span>
  <div class="yans">
    <Scoll class="gundong">
      <div class="kaobei" @click="gb(qb)">
        <span class="wenzi" :class="{bianse:pd(qb)}">{{this.qb}}</span>
      </div>
      <div class="fgx"></div>
      <div>
        <ul class="mc">
          <template v-for="(item,key) in tag">
            <template v-if="key!=tag.length-1">
              <li @click="gb(item.name)"><span class="wenzi" :class="{bianse:pd(item.name)}">{{item.name}}</span></li>
            </template>
          </template>
        </ul>
      </div>
    </Scoll>
  </div>
</div>
</template>

<script>
import Scoll from "@/components/Scoll";

export default {
  props:['qb','tag'],
  components: {
    Scoll
  },
  data(){
    return {
      fc:this.qb
    }
  },
  methods:{
    // 判断是否在当前位置
    pd(x){
      if(this.fc==x){
        return true
      }
    },

    // 改变
    gb(x){
      this.fc = x
    },
  },
  updated(){
    this.$emit('ClickXi',this.fc)
  }
}
</script>

<style scoped>
.asi{
  /* width: auto; */
  height: 20px;
  padding: 5px 15px;
  /* margin-bottom: 5px; */
  border: 1px solid rgba(131, 131, 131, 0.514);
  border-radius: 25px;
  background: white;
}

.div-asi{
  width: auto;
  margin-top: 10px;
  display: inline-block;
  margin-bottom: 6px;
  position: relative;
}

.div-asi:hover .asi{
  background: rgb(219, 219, 219);
}

.yans{
  width: 530px;
  height: auto;
  z-index: 5;
  position: absolute;
  margin-top: 6px;
  border-radius: 10px;
  /* padding: 0 15px; */
  background: white;
  visibility: hidden;
}

.div-asi:hover .yans{
  visibility: inherit;
}

.fgx{
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background: rgba(85, 85, 85, 0.445);
}

.kaobei{
  margin: 0 15px;
  padding-top: 5px;
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  /* background: maroon; */
  list-style: none;
}

.mc{
  width: 500px;
  margin: 0 15px;
  padding-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

li{
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  /* background: maroon; */
  list-style: none;
}

li:hover,.kaobei:hover{
  color: red;
}

.wenzi{
  padding: 3px 10px;
  /* border: 1px solid red; */
  border-radius: 25px;
}

.bianse{
  color: red;
  background: rgb(255, 173, 173 ,0.5);
}

.gundong{
  height: 500px;
  border-radius: 10px;
  background: rgba(167, 230, 255, 0.486);
}
</style>