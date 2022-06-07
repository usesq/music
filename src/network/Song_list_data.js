import axios from './axios'

// 歌单详情
export function S_L_D(x){
  return axios({
    url:'/playlist/detail',
    params:{
      id:x
    }
  })
}

// 获取歌单所有歌曲
export function Ge_qu(x,c){
  return axios({
    url:'/playlist/track/all',
    params:{
      id:x,
      limit:c
    }
  })
}

// 获取歌单评论
export function comment(x,page){
  return axios({
    url:'/comment/playlist',
    params:{
      id:x,
      offset:(page - 1) * 20,
      limit:20
    }
  })
}

// 获取歌曲的播放url
export function misir(x){
  return axios({
    url:'/song/url',
    params:{
      id:x
    }
  })
}

// 获取歌曲详情
export function subsong(x){
  return axios({
    url:'/song/detail',
    params:{
      ids:x
    }
  })
}

// 获取歌曲下载地址
export function Xz(x){
  return axios({
    url:'/song/download/url',
    params:{
      id:x
    }
  })
}