import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 请求到的推荐歌单
    Boutique_song_list:[],
    // 请求到的推荐歌单(需要登录)
    Boutique_list:[],
    // 推荐歌单10-20
    right_arr:[],
    // 是否展示登录页面
    Login:false,
    // 登录方式 2是手机验证码登录 1是二维码登录 3是邮箱登录
    Login_sin:2,
    // 失败提示
    Login_err:'',
    // 二维码
    QR_code:'',
    // 二维码key
    QR_code_key:'',
    // 登录用户的信息
    information:'',
    // 收藏歌单数量/创建歌单数量
    Number_of_songs:'',
    // cookie
    cookie:"",
    // 歌单详情
    Song_list_details:[],
    // 侧边栏内容
    one:[
      {
        name:'发现音乐',
        obm:'/'
      },
      {
        name:'视频',
        obm:'/Sip'
      }
    ],
    two:[
      {
        name:'最近播放',
        value:false,
        obm:'/lis'
      }
    ],
    // 侧边栏长度
    Zlength:'',
    // 左侧列表点谁改谁---true/false
    list_open:[],
    // 每日推荐歌曲
    Recommended_songs:'',
    // 推荐新音乐(无需登录)
    New_music:'',
    // 推荐MV
    TJ_MV:'',
    // 歌单id
    GE_id:'',

    // 在播放列表里的歌曲
    bo_Ge:[],
    // 正在播放的歌曲
    mirou:{},
    // 上一首正在播的歌曲(audio)
    top_music:'',
    // 正在播放的歌曲(audio)
    top_music_two:'',
    // 判断此次在哪个数组
    _mis:1,

    // 播放列表歌曲的名称，作者，id
    _lb:[],
    // 播放状态
    zt:0,

    // 历史播放歌曲
    lishi:[],
    // 上一首key
    lishi_key:0,

    // 进度条计数
    InTime:undefined,
    // 分
    minin:0,
    // 秒
    csi:0,

    // 进度条的走动判断
    zoudong:1,

    // 歌词
    Ciju:'',
    // 控制歌词状态
    cizt:'',

    // 判断暂停
    kaomao:0,

    // 要搜索的内容
    Soscontent:'',
    // 搜索结果
    SosJg:[],

    // 排行榜单
    Bdan:[],

    // 歌手页信息
    Gxxh:{},
    // 歌手最热50首
    Gzr:[],

    // 我喜欢里的歌曲
    Woxihuan:[],

    // 历史路由
    lisluy:[],
    // 所在的路由key
    luykey:-1
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
