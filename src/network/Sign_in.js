import axios from './axios'

// 手机验证码登录
export function Slo(x,y){
  return axios({
    url:'/login/cellphone',
    params:{
      phone:x,
      captcha:y
    }
  })
}

// 获取手机验证码
export function YaZ(x){
  return axios({
    url:'/captcha/sent',
    params:{
      phone:x
    }
  })
}

// 邮箱登录
export function Eso(x,y){
  return axios({
    url:'/login',
    params:{
      email:x,
      password:y
    }
  })
}

// 生成二维码的key
export function kiy(x){
  return axios({
    url:'/login/qr/key',
    params:{
      timerstamp:x
    }
  })
}

// 生成二维码图片
export function QR_code_img(x,y){
  return axios({
    url:'/login/qr/create',
    params:{
      key:x,
      qrimg:'base64',
      timerstamp:y
    }
  })
}

// 检测二维码状态
export function C_X_Z_T(x){
  return axios({
    url:'/login/qr/check',
    params:{
      key:x
    }
  })
}

// 登录状态
export function Z_T(x,y){
  return axios({
    url:'/login/status',
    params:{
      timestamp:y,
      cookie:x
    }
  })
}

