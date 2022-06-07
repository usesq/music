<template>
  <div class="tui">
    <!-- 精选评论 -->
    <template v-if="ri == 0 && this.mop.length != 0">
      <p class="bt">精选评论</p>
      <div class="pin" v-for="(item, key) in mop">
        <div class="devs losdev">
          <img class="tou_xiang" :src="item.user.avatarUrl" alt="" />
        </div>
        <div class="devs modev">
          <p>
            <a href="">{{ item.user.nickname }}</a
            >：{{ item.content }}
          </p>
          <!-- 回复部分 -->
          <div :class="{ hui_fu: ooo(item.beReplied) }">
            <a href=""
              ><span v-if="ooo(item.beReplied)">@</span
              >{{ ppp(item.beReplied, 1) }}</a
            ><span v-if="ooo(item.beReplied)">：</span
            >{{ ppp(item.beReplied, 2) }}
          </div>
          <p class="p_bq">
            <span style="color: rgba(175, 172, 172, 0.884)">{{
              limi(item.time, 1)
            }}</span>
            <span style="margin: 0 5px; color: rgba(175, 172, 172, 0.884)">{{
              limi(item.time, 2)
            }}</span>
            <span class="dian_zan iconfont icon-icon">{{
              item.likedCount
            }}</span>
          </p>
        </div>
      </div>
    </template>

    <!-- 最新评论 -->
    <p v-if="xi.length!=0" class="bt">最新评论</p>
    <div class="pin" v-for="(item, key) in xi">
      <div class="devs losdev">
        <img class="tou_xiang" :src="item.user.avatarUrl" alt="" />
      </div>
      <div class="devs modev">
        <p>
          <a href="">{{ item.user.nickname }}</a
          >：{{ item.content }}
        </p>
        <!-- 回复部分 -->
        <div :class="{ hui_fu: ooo(item.beReplied) }">
          <a href=""
            ><span v-if="ooo(item.beReplied)">@</span
            >{{ ppp(item.beReplied, 1) }}</a
          ><span v-if="ooo(item.beReplied)">：</span
          >{{ ppp(item.beReplied, 2) }}
        </div>
        <p class="p_bq">
          <span style="color: rgba(175, 172, 172, 0.884)">{{
            limi(item.time, 1)
          }}</span>
          <span style="margin: 0 5px; color: rgba(175, 172, 172, 0.884)">{{
            limi(item.time, 2)
          }}</span>
          <span class="dian_zan iconfont icon-icon">{{
            di_zan(item.likedCount)
          }}</span>
        </p>
      </div>
    </div>
    <!-- 分页 -->
    <div class="F_ye_G">
      <div class="G_so">

        <template v-if="Pl_yes>9">
          <template v-if="Pl_yes>1">
            <div class="F_ye F_ye_hov" @click="jia_jian(0)"><</div>
          </template>

          <template v-if="ri < 5">
            <template v-for="(item, key) in 10">
              <template v-if="Pl_yes < 10 && key < Pl_yes">
                <div
                  class="F_ye"
                  v-if="ri == 0 && key < 1"
                  style="background: red; color: white"
                >
                  {{ key + 1 }}
                </div>
                <div class="F_ye" v-else @click="gaibian(key)">
                  {{ key + 1 }}
                </div>
              </template>

              <template v-else-if="Pl_yes > 10">
                <template v-if="key < 8">
                  <div
                    class="F_ye"
                    v-if="ri == 0 && key < 1"
                    style="background: red; color: white"
                  >
                    {{ key + 1 }}
                  </div>
                  <div class="F_ye F_ye_hov" v-else-if="key < 5" @click="mt(key)">
                    {{ key + 1 }}
                  </div>
                  <div class="F_ye F_ye_hov" v-else @click="aha(key)">
                    {{ key + 1 }}
                  </div>
                </template>
                <div class="F_ye" v-if="key == 8">...</div>
                <div
                  class="F_ye F_ye_hov"
                  v-if="key == 9"
                  @click="gaibian(Pl_yes - 1)"
                >
                  {{ Pl_yes }}
                </div>
              </template>
            </template>
          </template>

          <template v-else-if="Pl_yes - ri <= 5">
            <div class="F_ye F_ye_hov" @click="gaibian(0)">1</div>
            <div class="F_ye">...</div>
            <template v-for="(item, key) in 8">
              <div
                v-if="key < 3"
                class="F_ye F_ye_hov"
                @click="enheng(Pl_yes - 7 + key)"
              >
                {{ Pl_yes - 7 + key }}
              </div>
              <div v-else class="F_ye F_ye_hov" @click="mosi(Pl_yes - 7 + key)">
                {{ Pl_yes - 7 + key }}
              </div>
            </template>
          </template>

          <template v-else>
            <div class="F_ye F_ye_hov" @click="gaibian(0)">1</div>
            <div class="F_ye">...</div>
            <template v-for="(item, key) in 7">
              <div class="F_ye F_ye_hov" @click="fuck(key - 3)">
                {{ ri - 2 + key }}
              </div>
            </template>
            <div class="F_ye">...</div>
            <div class="F_ye F_ye_hov" @click="gaibian(Pl_yes - 1)">
              {{ Pl_yes }}
            </div>
          </template>

          <template v-if="Pl_yes>1">
            <div class="F_ye F_ye_hov" @click="jia_jian(1)">></div>
          </template>
        </template>

        <template v-else>
          <template v-if="Pl_yes>1">
            <div class="F_ye F_ye_hov" @click="jia_jian(0)"><</div>
          </template>

          <template v-if="Pl_yes >= 2">
            <template v-for="item in Pl_yes">
              <template v-if="ri==0&&item==ri+1">
                <div class="F_ye F_ye_hov" @click="mosi(item)" style="background: red; color: white">
                  {{ item }}
                </div>
              </template>

              <template v-else>
                <div class="F_ye F_ye_hov" @click="mosi(item)">
                  {{ item }}
                </div>
              </template>
            </template>
          </template>
          
          <template v-if="Pl_yes>1">
            <div class="F_ye F_ye_hov" @click="jia_jian(1)">></div>
          </template>
        </template>
        
      </div>
    </div>
  </div>
</template>

<script>
import { comment } from "@/network/Song_list_data";

import {Mvpl,Sppl} from "@/network/Bar"

export default {
  name: "Pin_lun",
  props: ["Sto","Panduanx"],
  data() {
    return {
      // 评论页数
      Pl_yes: "",
      // 当前页数
      ri: 0,
      // 当前页面的评论
      xi: [],
      // 精选评论
      mop: [],
    };
  },
  methods: {
    // 计算时间
    limi(x, ppc) {
      // 计算时间戳时间
      let ti = new Date(x);
      let y = ti.getFullYear();
      let m = ti.getMonth() + 1;
      let d = ti.getDate();
      let io = ti.getHours();
      let ts = ti.getMinutes();
      // 查看当前时间
      let gio = new Date();
      let a = gio.getFullYear();
      let b = gio.getMonth() + 1;
      let c = gio.getDate();

      if (ppc == 1) {
        if (a != y) {
          return y + "年" + m + "月" + d + "日";
        } else if (m != b || (m == b && d != c)) {
          return m + "月" + d + "日";
        } else if (d == c) {
          return "今天";
        }
      } else {
        if (io < 10) {
          io = "0" + io;
        }
        if (ts < 10) {
          ts = "0" + ts;
        }
        return io + ":" + ts;
      }
    },
    // 回复样式
    ooo(xi) {
      if (xi.length != 0) {
        return true;
      }
    },
    // 评论昵称和内容
    ppp(xi, o) {
      if (xi.length != 0) {
        if (o == 1) {
          return xi[0].user.nickname;
        } else {
          return xi[0].content;
        }
      }
      // console.log(xi)
    },

    // 请求评论
    Qin_qiu(x) {
      if(this.Panduanx==1){
        // console.log('mmmm')
        // 歌单评论
        comment(this.$route.params.id, x)
          .then(res => {
            // 最新评论
            this.xi = res.data.comments;
          })
      }else{
        console.log('ccc')
        let cx = this.$route.params.lx
        if(cx==2){
          console.log('xxx')
          // 视频评论
          Sppl(this.$route.params.id,x)
            .then(res=>{
              // 最新评论
              this.xi = res.data.comments;
            })
        }else{
          // MV评论
          Mvpl(this.$route.params.id, x)
            .then(res=>{
              // 最新评论
              this.xi = res.data.comments;
              console.log(res)
            })
        }
      }
    },

    // 简化数量
    jian_hua(x) {
      let mos = String(x);
      let m = mos.length;
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

    // 判断点赞数量
    di_zan(x) {
      if (x != 0) {
        return x;
      }
    },
    // 第四种状态
    mosi(x) {
      this.ri = x - 1;
      this.lpsi();
      this.Qin_qiu(this.ri + 1);
      // console.log(this.ri+'----'+x)
    },
    enheng(x) {
      this.ri = x - 1;
      this.Qin_qiu(this.ri + 1);
      this.kimoji();
    },
    // 点击页数
    // 第一种状态
    mt(x) {
      this.ri = x;
      this.lpsi();
      this.Qin_qiu(this.ri + 1);
    },
    // 第二种状态
    aha(x) {
      this.ri = x;
      this.kimoji();
      this.Qin_qiu(this.ri + 1);
    },
    // 第三种状态
    fuck(x) {
      this.ri += x;
      // 设置了延迟，防止渲染前修改
      setTimeout(() => {
        let i = 0;
        let pso = document.getElementsByClassName("F_ye");
        for (i; i < pso.length; i++) {
          if (pso[i].innerText == this.ri + 1) {
            pso[i].style.background = "red";
            pso[i].style.color = "white";
          } else {
            pso[i].style.background = "white";
            pso[i].style.color = "black";
          }
          // console.log(pso[i].innerText+'-----'+i)
        }
      }, 10);
      this.Qin_qiu(this.ri + 1);
    },
    // 前进一页后退一页
    jia_jian(x) {
      if (x == 0 && this.ri - 1 >= 0) {
        this.ri -= 1;
        if (this.ri < 5 || this.ri > this.Pl_yes - 5) {
          this.lpsi();
        } else {
          this.kimoji();
        }
      } else if (x == 1 && this.ri + 1 < this.Pl_yes) {
        this.ri += 1;
        if (this.ri < 5 || this.ri > this.Pl_yes - 5) {
          // console.log(this.ri+'-'+this.Pl_yes)
          this.lpsi();
        } else {
          this.kimoji();
        }
      }
      // console.log(this.ri)
      this.Qin_qiu(this.ri + 1);
      // console.log(this.ri)
    },
    gaibian(x) {
      // console.log('eeeee')
      // console.log(this.Pl_yes)
      this.ri = x;
      // console.log(this.ri)
      setTimeout(() => {
        let i = 0;
        let pso = document.getElementsByClassName("F_ye");
        for (i; i < pso.length; i++) {
          if (pso[i].innerText == this.ri + 1) {
            pso[i].style.background = "red";
            pso[i].style.color = "white";
          } else {
            pso[i].style.background = "white";
            pso[i].style.color = "black";
          }
          // console.log(pso[i].innerText+'-----'+i)
        }
      }, 10);
      console.log(this.ri)
      this.Qin_qiu(this.ri + 1);
    },

    // 遍历更改
    // 根据内容改变颜色
    lpsi() {
      // console.log('lpsi')
      let i = 0;
      let moxs = document.getElementsByClassName("F_ye");
      for (i; i < moxs.length; i++) {
        if (moxs[i].innerText == this.ri + 1) {
          moxs[i].style.background = "red";
          moxs[i].style.color = "white";
        } else {
          moxs[i].style.background = "white";
          moxs[i].style.color = "black";
        }
        // console.log(moxs[i].innerText+'-----'+i)
      }
    },
    // 把遍历出来的按钮下标为6的背景改变为红色
    kimoji() {
      // console.log('kimoji')
      let i = 0;
      let moxs = document.getElementsByClassName("F_ye");
      for (i; i < moxs.length; i++) {
        if (i == 6) {
          moxs[i].style.background = "red";
          moxs[i].style.color = "white";
        } else {
          moxs[i].style.background = "white";
          moxs[i].style.color = "black";
        }
      }
    },
  },
  created() {
    // 评论页数
    let Ye = this.Sto.commentCount / 20;
    // console.log(Ye)
    let pos = String(Ye).indexOf(".");
    if (pos == -1) {
      this.Pl_yes = Ye;
      // console.log(this.Pl_yes)
    } else {
      this.Pl_yes = parseInt(Ye);
      if (this.Pl_yes == Math.round(Ye)) {
        this.Pl_yes += 1;
      }
      // console.log(this.Pl_yes)
    }

    if(this.Panduanx==1){
      // 歌单评论
      comment(this.$route.params.id, this.ri + 1)
        .then(res => {
          // console.log(res);
          // 最新评论
          this.xi = res.data.comments;
          // 精选评论
          this.mop = res.data.hotComments;
        })
    }else{
      let cx = this.$route.params.lx
      if(cx==2){
        Sppl(this.$route.params.id,this.ri + 1)
          .then(res=>{
             // 最新评论
            this.xi = res.data.comments;
            // 精选评论
            this.mop = res.data.hotComments;
            console.log(res)
            
            Ye = res.data.total / 20;
            // console.log(Ye)
            pos = String(Ye).indexOf(".");
            if (pos == -1) {
              this.Pl_yes = Ye;
              // console.log(this.Pl_yes)
            } else {
              this.Pl_yes = parseInt(Ye);
              if (this.Pl_yes == Math.round(Ye)) {
                this.Pl_yes += 1;
              }
              // console.log(this.Pl_yes)
            }
          })
      }else{
        // MV评论
        Mvpl(this.$route.params.id, this.ri + 1)
          .then(res=>{
            // 最新评论
            this.xi = res.data.comments;
            // 精选评论
            this.mop = res.data.hotComments;
            console.log(res)
          })
      }
    }
    // console.log(this.Panduanx)
  },
};
</script>

<style scoped>
/* 标题 */
.bt {
  font-weight: bold;
  font-size: 19px;
  margin: 10px 15px;
}

/* ----------------评论设置----------------- */
.pin {
  /* width: 100%; */
  /* height: 100px; */
  padding: 10px 15px;
  margin: 0 20px;
  margin-bottom: 3px;
  display: flex;
  align-items: flex-start;
  position: relative;
  box-sizing: border-box;
  /* border-top: 1px solid black; */
  border-bottom: 1px solid rgba(189, 189, 189, 0.247);
}

.p_bq {
  margin-top: 10px;
  position: relative;
}
.dian_zan {
  position: absolute;
  right: 0;
}

.tou_xiang {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: solid 1px rgb(189, 189, 189);
  border-radius: 25px;
}

.devs {
  display: inline-block;
}

.modev {
  width: 890px;
  margin-left: 15px;
}

.hui_fu {
  padding: 5px 15px;
  margin: 5px 0;
  background: rgba(190, 190, 190, 0.192);
}

/* ---------分页按钮----------- */
.F_ye_G {
  width: 100%;
  /* background: #535353; */
  margin: 20px 0;
  display: flex;
  justify-items: center;
}

.G_so {
  width: auto;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* background: sandybrown; */
}

.F_ye {
  width: 30px;
  height: 30px;
  /* background: yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0 3px;
  border: rgb(51, 43, 43, 0.5) 1px solid;
}

/* 超链接 */
a {
  text-decoration: none;
  color: #96aeee83;
}
a:hover {
  color: #96aeee83;
}
</style>