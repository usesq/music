<template>
  <div class="left_mosi">
    <div class="l_m_conter" id="conter">
      <Scoll>
        <table style="background: white">
          <tr class="l_mtr" v-for="(item, key) in $store.state._lb" :class="{djh:panding(item.id)}">
            <td class="l_mi">{{ key + 1 }}</td>
            <td class="l_mii">{{ item.name }}</td>
            <td class="l_miii">
              <p>
                <template v-for="(cos, losf) in item.gesou">
                  <template v-if="losf + 1 < item.gesou.length">
                    {{ cos.name }}
                    <span> / </span>
                  </template>
                  <template v-else>
                    {{ cos.name }}
                  </template>
                </template>
              </p>
            </td>
            <td
              style="border-left: solid 1px rgba(226, 224, 224, 0.897)"
              class="l_miiii"
            >
              <span class="iconfont icon-quxiao"
              @click="sancu(item.id)"></span>
            </td>
          </tr>
        </table>
      </Scoll>
    </div>
    <template v-if="cso == 0">
      <div id="con_right" class="l_m_right" @click="kili(0)">
        <span class="iconfont icon-xiayiye"></span>
      </div>
    </template>
    <template v-else>
      <div id="con_right" class="l_m_right" @click="kili(1)">
        <span class="iconfont icon-shangyiye"></span>
      </div>
    </template>
  </div>
</template>

<script>
import Scoll from "@/components/Scoll";

export default {
  components: {
    Scoll,
  },
  data() {
    return {
      cso: 0,
    };
  },
  methods: {
    kili(x) {
      let on = document.getElementById("conter");
      let sn = document.getElementById("con_right");
      if (x == 0) {
        on.style.left = "0px";
        sn.style.left = "0px";
        this.cso = 1;
      } else {
        on.style.left = "-280px";
        sn.style.left = "-280px";
        this.cso = 0;
      }
    },
    // 判断是否是正在听的歌
    panding(x){
      if(x==this.$store.state.mirou.id){
        return true
      }
    },
    // 删除
    sancu(x){
      let i = 0
      let arr = []
      // let arrtwo = []
      for(i;i<this.$store.state._lb.length;i++){
        if(this.$store.state._lb[i].id!=x){
          arr.push(this.$store.state._lb[i])
        }
      }
      this.$store.state._lb=arr
    }
  },
};
</script>

<style scoped>
/* 左侧显示播放列表的音乐 */
.left_mosi {
  width: 300px;
  height: 400px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
}
.left_mosi div {
  display: inline-block;
}
.l_m_conter {
  width: 280px;
  height: 400px;
  position: relative;
  left: -280px;
  transition: 3s;
  background: white;
}
.l_m_right {
  width: 20px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  position: relative;
  left: -280px;
  transition: left 3s;
  background: rgba(255, 255, 255, 0.87);
}
.l_m_right:hover {
  background: rgb(212, 212, 212);
}
.l_mtr {
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border-bottom: solid 1px rgba(226, 224, 224, 0.897);
}
.l_mtr:hover{
  background: rgba(226, 224, 224, 0.897);
}
.l_mi {
  text-align: center;
  width: 40px;
  /* background: yellow; */
}
.l_mii {
  width: 119px;
  padding-right: 10px;
  box-sizing: border-box;
  display: -webkit-box;
  line-height: 30px;
  /* 从顶部向底部垂直布置子元素 */
  -webkit-box-orient: vertical;
  /* 第三行后开始省略 */
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* background: mediumseagreen; */
}
.l_miii {
  width: 100px;
  display: -webkit-box;
  line-height: 30px;
  /* 从顶部向底部垂直布置子元素 */
  -webkit-box-orient: vertical;
  /* 第三行后开始省略 */
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* background: rgb(75, 192, 207); */
}
.l_miiii {
  text-align: center;
  width: 20px;
  /* background: rgb(223, 121, 54); */
}
.l_miiii:hover {
  border-radius: 25px;
  background: red;
  color: white;
}

/* 正在播放的歌曲 */
.djh{
  background: rgba(218, 214, 214, 0.897);
}
</style>