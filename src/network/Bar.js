import axios from './axios'

// 搜索功能
export function Search(x,page){
  return axios({
    url:'/cloudsearch',
    params:{
      keywords:x,
      limit:100,
      offset:(page - 1) * 100
    }
  })
}

// 获取榜单
export function arrayToList(){
  return axios({
    url:'/toplist'
  })
}

// 热门歌单分类
export function xubosong(){
  return axios({
    url:"/playlist/highquality/tags"
  })
}

// 获取类目歌单
export function FilterCategory(x){
  return axios({
    url:'/top/playlist/highquality',
    params:{
      cat:x,
      limit:50,
    }
  })
}

// 获取歌手
export function Singer(a,b,c){
  return axios({
    url:'/artist/list',
    params:{
      area:a,
      type:b,
      initial:c,
      limit:100
    }
  })
}

// 获取歌手信息
export function Gxi(x){
  return axios({
    url:'/artist/detail',
    params:{
      id:x
    }
  })
}

// 获取歌手最热50
export function Gsong(x){
  return axios({
    url:'/artist/top/song',
    params:{
      id:x
    }
  })
}

// 获取MV信息
export function Mvxi(x){
  return axios({
    url:'/mv/detail',
    params:{
      mvid:x
    }
  })
}

// 获取MV播放地址
export function Mvurl(x){
  return axios({
    url:'/mv/url',
    params:{
      id:x
    }
  })
}

// 获取MV评论
export function Mvpl(x,page){
  return axios({
    url:'/comment/mv',
    params:{
      id:x,
      offset:(page - 1) * 20,
      limit:20
    }
  })
}

// 获取视频标签列表
export function Splb(){
  return axios({
    url:'/video/group/list'
  })
}

// 获取视频标签/分类下的视频
export function Bqsp(x,page){
  return axios({
    url:'/video/group',
    params:{
      id:x,
      offset:(page-1) * 8
    }
  })
}

// 获取视频ulr
export function Spurl(x){
  return axios({
    url:'/video/url',
    params:{
      id:x
    }
  })
}

// 获取视频详情
export function Spxq(x){
  return axios({
    url:'/video/detail',
    params:{
      id:x
    }
  })
}

// 获取视频评论
export function Sppl(x,page){
  return axios({
    url:'/comment/video',
    params:{
      id:x,
      offset:(page - 1) * 20,
      limit:20
    }
  })
}