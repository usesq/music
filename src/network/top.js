import axios from "./axios";

// 获取歌词
export function Ci_yu(x){
  return axios({
    url:'/lyric',
    params:{
      id:x
    }
  })
}