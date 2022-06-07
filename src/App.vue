<template>
  <div id="app">
    <!-- 判断登录状态 -->
    <div class="ym" v-if="this.$store.state.Login == true">
      <div class="jie_mian">
        <div class="xxx" @click="Qux">
          <span class="iconfont icon-quxiao"></span>
        </div>
        <div class="clsb" v-if="this.$store.state.Login_err == 1">
          手机号或验证码错误!
        </div>
        <div class="clsb" v-if="this.$store.state.Login_err == 2">
          手机号或验证码不能为空!
        </div>
        <div class="clsb" v-if="this.$store.state.Login_err == 3">
          邮箱或密码错误!
        </div>
        <div class="clsb" v-if="this.$store.state.Login_err == 4">
          邮箱或密码不能为空!
        </div>
        <!-- 判断登录方式 -->
        <div class="jm_nr" v-if="this.$store.state.Login_sin == 2">
          <h1>手机验证码登录</h1>
          <div class="sjhm sj_one">
            <span class="iconfont icon-shouji wusl"></span
            ><input v-model="Ii" type="text" placeholder="输入手机号码" />
          </div>
          <div class="sjyzm sj_two">
            <span class="iconfont icon-jiesuo wusl"></span
            ><input
              v-model="Li"
              style="width: 120px"
              type="text"
              placeholder="输入验证码"
            />
            <button @click="Yzm" class="fsyzm enjoy-css">发送</button>
          </div>
          <button @click="O_lin" class="an_niu">登录</button>
        </div>
        <div class="jm_nr" v-if="this.$store.state.Login_sin == 3">
          <h1>邮箱登录</h1>
          <div class="sjhm sj_one">
            <span class="iconfont icon-youxiang wusl"></span
            ><input v-model="Ii" type="text" placeholder="输入邮箱" />
          </div>
          <div class="sjyzm sj_two">
            <span class="iconfont icon-jiesuo wusl"></span
            ><input v-model="Li" type="password" placeholder="输入邮箱密码" />
          </div>
          <button @click="Emil" class="an_niu">登录</button>
        </div>
        <div class="jm_nr" v-if="this.$store.state.Login_sin == 1">
          <p>
            推荐使用<span style="color: red; margin: 0 5px">网易云音乐APP</span
            >扫码
          </p>
          <img class="E_W_M" :src="this.$store.state.QR_code" alt="" />
          <p class="shua_x" @click="Sua_X">刷新二维码</p>
        </div>
        <div class="wuf">
          <span
            @click="
              qiehuan(1);
              Ewm();
            "
            >二维码登录</span
          >
          <span class="zj" @click="qiehuan(2)">手机登录</span>
          <span @click="qiehuan(3)">邮箱登录</span>
        </div>
      </div>
    </div>
    <Top></Top>
    <Bar @DL="dlym"></Bar>
    <sidebar></sidebar>
  </div>
</template>

<script>
import Bar from "@/views/Status_Bar/Bar";
import Top from "@/views/Top_Bar/Top";
import sidebar from "@/views/sidebar";

import { G_dan, TJ_gedan, TJ_gequ, X_music, Quantity, Song_sheet, MV} from "@/network/Rso";
import { S_L_D } from "@/network/Song_list_data";
import {
  YaZ,
  Slo,
  Eso,
  QR_code_img,
  kiy,
  C_X_Z_T,
  Z_T,
} from "@/network/Sign_in";
import { arrayToList } from "@/network/Bar";

export default {
  name: "app",
  components: {
    Bar,
    Top,
    sidebar,
  },
  computed: {},
  data() {
    return {
      // 邮箱/手机号
      Ii: "",
      // 密码/验证码
      Li: "",
      // 定时器
      misp: "",
      // 二维码状态
      ScpM: "",
    };
  },
  methods:{
    // 登录成功后的一系列操作和请求
    Zonghe(){
      this.$axios.all([
        TJ_gedan(this.$store.state.cookie),
        TJ_gequ(this.$store.state.cookie),
        Quantity(Date.now(), this.$store.state.cookie),
        Z_T(this.$store.state.cookie, Date.now()),
        TJ_gedan(this.$store.state.cookie)
      ]).then(res=>{
        this.$store.state.Boutique_list = res[0].data.recommend

        this.$store.state.Recommended_songs = res[1].data.data.dailySongs

        this.$store.state.Number_of_songs = res[2].data

        this.$store.state.information= res[3].data.data
        console.log(res[3].data.data)

        this.$store.state.Boutique_song_list = res[4].data.result

        Song_sheet(res[3].data.data.account.id).then(res=>{
          this.$store.state.Song_list_details = res.data.playlist;
          S_L_D(this.$store.state.Song_list_details[0].id).then(res=>{
            this.$store.state.Woxihuan = res.data.privileges
          })
        })

        // this.csjs()

        this.$router.push("/O_one/Rso");
      })
    },

    // 把请求的歌单内容10-20的内容存放到另一个数组，方便遍历显示
    ems() {
      // console.log('>>>>>>>>>歌单10-20分割中>>>>>>>>>>');
      const mos = this.$store.state.Boutique_song_list;
      let xsz = [];
      for (let i = 10; i < 20; i++) {
        xsz.push(mos[i]);
      }
      this.$store.state.right_arr = xsz;
      // console.log('>>>>>>>>>歌单10-20分割结束>>>>>>>>>>');
    },

    // 是否显示登录界面
    dlym() {
      console.log(">>>>>>>>>>显示登录页面>>>>>>>>>>");
      this.$store.state.Login = true;
      console.log(">>>>>>>>>>结束显示页面>>>>>>>>>>");
    },

    // 切换登录方式
    qiehuan(x) {
      clearInterval(this.misp);
      this.$store.state.Login_sin = x;
      this.$store.state.Login_err = false;
    },

    // 发送验证码
    Yzm() {
      console.log(">>>>>>>>>>发送验证码>>>>>>>>>>");
      YaZ(this.Ii);
      console.log(">>>>>>>>>>结束发送验证码>>>>>>>>>>");
    },

    // 手机登录
    O_lin() {
      console.log(">>>>>>>>>>登录手机进行中>>>>>>>>>>");
      Slo(this.Ii, this.Li)
        .then((res) => {
          // 关闭登录页面
          this.$store.state.Login = false;
          // 登录后获取到的账号信息
          this.$store.state.information = res;
          // 获取账号cookie
          this.$store.state.cookie = res.data.cookie;
          // console.log(res.data.cookie);

          this.Zonghe()
        })
        .catch(ops => {
          // 展示错误信息
          if (this.Ii == "" || this.Li == "") {
            this.$store.state.Login_err = 2;
          } else {
            this.$store.state.Login_err = 1;
          }
          // console.log(ops);
        });
      console.log(">>>>>>>>>>手机登录结束>>>>>>>>>>");
    },

    // 邮箱登录
    Emil() {
      console.log(">>>>>>>>>>邮箱登录中>>>>>>>>>>");
      Eso(this.Ii, this.Li).then((res) => {
        console.log(res);
        if (res.code == 502) {
          // 展示错误信息
          if (this.Ii == "" || this.Li == "") {
            this.$store.state.Login_err = 4;
          } else {
            this.$store.state.Login_err = 3;
          }
        } else {
          this.$store.state.Login = true;
          this.Zonghe()
        }
      });
      console.log(">>>>>>>>>>邮箱登录结束>>>>>>>>>>");
    },

    // 二维码
    Ewm() {
      console.log(">>>>>>>>>>生成二维码>>>>>>>>>>");
      kiy(Date.now()).then((res) => {
        this.$store.state.QR_code_key = res.data.data.unikey;
        // console.log(this.$store.state.QR_code_key);
        QR_code_img(this.$store.state.QR_code_key, Date.now()).then((res) => {
          this.$store.state.QR_code = res.data.data.qrimg;
        });
      });
      // 检测二维码状态
      this.misp = setInterval(() => {
        C_X_Z_T(this.$store.state.QR_code_key).then((res) => {
          // this.ScpM = res.data.code;
          console.log(res.data)
          // console.log(this.ScpM);
          if (res.data.code == 800) {
            alert("二维码过期");
            clearInterval(this.misp);
          }
          if (res.data.code == 803) {
            alert("授权登录成功");
            this.$store.state.Login == false;
            this.Zonghe()
            clearInterval(this.misp);
          }
        });
      }, 3000);
      console.log(">>>>>>>>>>结束生成二维码>>>>>>>>>>");
    },

    // 刷新二维码
    Sua_X() {
      this.Ewm();
    },

    // 退出登录页面
    Qux() {
      console.log(">>>>>>>>>>进行退出页面>>>>>>>>>>");
      clearInterval(this.misp);
      this.$store.state.Login = false;
      this.$store.state.Login_err = false;
      console.log(">>>>>>>>>>结束退出页面>>>>>>>>>>");
    },

    csjs() {
      // 收藏的歌单
      console.log(this.$store.state.Number_of_songs.subPlaylistCount);
      // 自己创建的歌单
      console.log(this.$store.state.Number_of_songs.createdPlaylistCount);
      this.$store.state.list_open = [];
    }
  },
  created() {
    // 获取榜单
    arrayToList().then(res=>{
      this.$store.state.Bdan = res.data.list
      // console.log(res.data.list)
    })

    MV()
      .then((res) => {
        this.$store.state.TJ_MV = res.data.result;
        // console.log(res);
      })
      .catch((jet) => {
        console.log(jet);
      });
    // console.log('>>>>>>>结束推荐MV中>>>>>>>');

    // 推荐新音乐
    // console.log('>>>>>>>请求新音乐中>>>>>>>');
    X_music()
      .then((res) => {
        this.$store.state.New_music = res.data.result;
        // console.log(res);
      })
      .catch((jet) => {
        console.log(jet);
      });
    // console.log('>>>>>>>结束请求新音乐>>>>>>>');

    // 请求推荐歌单
    // console.log('>>>>>>>请求推荐歌单中>>>>>>>');
    G_dan().then((res) => {
      // 请求来的数据赋值
      this.$store.state.Boutique_song_list = res.data.result;
      // console.log(this.$store.state.Boutique_song_list);
      // 请求成功时，进行存放
      this.ems();
    });
    // console.log('>>>>>>>请求结束>>>>>>>');
  }
};
</script>


<style>
@import url("../public/css/normalize.css");
@import url("../public/css/font.css");

#app {
  height: 973.4999px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FC354C;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0ABFBC, #FC354C);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0ABFBC, #FC354C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

* {
  margin: 0;
  padding: 0;
}

/*-----------------------------*/

.ym {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
}

.jie_mian {
  width: 400px;
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: white;
}
.jm_nr {
  text-align: center;
}
input {
  outline: none;
  border: none;
}
.sjhm {
  width: 220px;
  height: 50px;
  display: flex;
  text-align: center;
  align-items: center;
  padding-right: 5px;
  /*background: red;*/
}
.sjyzm {
  width: 220px;
  height: 50px;
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  padding-right: 5px;
  /*background: red;*/
}
/*.sjyzm input{*/
/*  width: 120px;*/
/*}*/
.sj_one {
  border-radius: 10px 10px 0 0;
  border: silver solid 1px;
}
.sj_two {
  border-radius: 0 0 10px 10px;
  border: silver solid 1px;
  border-top: none;
}
.wusl {
  font-size: 25px;
  margin: 0 5px;
}
.fsyzm {
  margin-left: 5px;
  width: 53px;
}
/*------------------登录按钮---------------*/
.an_niu {
  margin-top: 20px;
  width: 100px;
  display: inline-block;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  -webkit-border-radius: 9px;
  border-radius: 9px;
  font: normal 16px / normal "Times New Roman", Times, serif;
  color: rgba(255, 255, 255, 0.9);
  -o-text-overflow: clip;
  text-overflow: clip;
  background: -webkit-linear-gradient(
    -45deg,
    rgba(211, 65, 68, 1) 0,
    rgba(255, 73, 73, 1) 100%
  );
  background: -moz-linear-gradient(
    135deg,
    rgba(211, 65, 68, 1) 0,
    rgba(255, 73, 73, 1) 100%
  );
  background: linear-gradient(
    135deg,
    rgba(211, 65, 68, 1) 0,
    rgba(255, 73, 73, 1) 100%
  );
  background-position: 50% 50%;
  -webkit-background-origin: padding-box;
  background-origin: padding-box;
  -webkit-background-clip: border-box;
  background-clip: border-box;
  -webkit-background-size: auto auto;
  background-size: auto auto;
  -webkit-box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  text-shadow: -1px -1px 0 rgba(15, 73, 168, 0.66);
  -webkit-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
  transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
}
/*---------------------------------------*/
.wuf {
  position: absolute;
  bottom: 50px;
}
.zj {
  margin: 0 25px;
}

/*---------退出---------------*/
.xxx {
  position: absolute;
  right: 20px;
  top: 15px;
}

/*---------失败-------------*/
.clsb {
  position: absolute;
  top: 100px;
  color: red;
}
/*-------二维码---------*/
.E_W_M {
  width: 300px;
  height: 300px;
}
.shua_x {
  position: relative;
  top: -15px;
}
</style>
