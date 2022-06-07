import noti from 'axios'

export default function axios(option){
  return new Promise((resolve,reject)=>{
    const instance = noti.create({
      baseURL:'http://localhost:3000',
      timeout:2000,
      withCredentials: true
    })
    
    instance.interceptors.response.use(res=>{
      return res
    })
    
    instance(option).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}