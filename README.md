# music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 该项目依赖
网易云接口 [Configuration Reference](https://neteasecloudmusicapi.vercel.app/#/).

```
！！！！！！！！！！！！！没有兼容！！！！！！！！！！！！！
当前项目有些瑕疵，还有很多功能没完成(要么没接口，要么看不懂文档)
如：
  1.加载页面时间过长
  2.请求视频时偶尔请求不成功，并且请求时间较长
  3.播放几秒的歌曲，会出现歌词跟不上
  4.播放vip歌曲没有提示，不会提示只能听6秒
```

```
网易云音乐项目
|
├-dist--打包后的文件
|
├-public--公共文件(css文件和图片)
|
├-src--项目代码
|  ├-common--能在所有项目中使用的组件
|  |   ├-listbar.vue--歌单和视频的通用组件
|  |   └-scoll.vue--滚动
|  ├-network--接口调用
|  ├-router--路由配置
|  ├-store--全局属性
|  ├-views--模块内容
|  |   ├-Discover_music
|  |   |    ├-Recommend
|  |   |    |    ├-Geso.vue(歌手)
|  |   |    |    ├-hlist.vue(排行榜)
|  |   |    |    ├-playlistId.vue(歌单)
|  |   |    |    └-Rso.vue(个性推荐)
|  |   |    ├-video
|  |   |    |   └-Sipin.vue(视频页面)
|  |   |    └-O_one.vue
|  |   ├-Song_d_list
|  |   |    ├-Ge_qu.vue(显示歌单中所有歌曲的组件)
|  |   |    └-Pin_lun.vue(歌单/视频通用组件)
|  |   ├-Status_Bar
|  |   |    └-Bar.vue(左侧边栏)
|  |   ├-Top_Bar
|  |   |    └-Top.vue(页面顶部的播放栏)
|  |   ├-Gsxix.vue(歌手信息页面)
|  |   ├-MV.vue(视频播放页面)
|  |   ├-sidebar.vue(左侧隐藏的播放列表)
|  |   ├-Song_list_Deta.vue(歌单信息页面)
|  |   ├-Sou_so.vue(搜索页面)
|  |   ├-Tisi.vue(没登录时点击喜欢，提示登录的页面)
|  |   └-Zuijin.vue(最近播放页面)
|  ├-App.vue--应用的主页面
|  └-main.js--注册vue实例和插件
|
└-package--插件信息
```