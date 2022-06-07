import axios from './axios'

// 获取精品歌单(网友精选歌单无需登录)
export function Music(){
  return axios({
    url:'/top/playlist/highquality'
  })
}

// 获取歌单/mv数量
export function Quantity(x,y){
  return axios({
    url:'/user/subcount',
    params:{
      timestamp:x,
      cookie:y
    }
  })
}

// 获取用户歌单
export function Song_sheet(x){
  return axios({
    url:'/user/playlist',
    params:{
      uid:x,
      // offset:0
      limit:1000
    }
  })
}

// 推荐歌单(需要登录)
export function TJ_gedan(x){
  return axios({
    url:'/recommend/resource',
    params:{
      limit: 10,
      cookie: x
    }
  })
}

// 推荐歌曲(需要登录)
export function TJ_gequ(x){
  return axios({
    url:'/recommend/songs',
    params:{
      cookie:x
    }
  })
}

// 推荐歌单(无需登录)
export function G_dan(){
  return axios({
    url:'/personalized'
  })
}

// 推荐新音乐(无需登录)
export function X_music(){
  return axios({
    url:'/personalized/newsong'
  })
}

// 推荐mv(无需登录)
export function MV(){
  return axios({
    url:'/personalized/mv'
  })
}