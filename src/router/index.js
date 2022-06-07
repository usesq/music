import Vue from 'vue'
import VueRouter from 'vue-router'

const O_one = () => import('@/views/Discover_music/O_one')
const S_L_D = () => import('@/views/Song_list_Deta')
const S_S = () => import('@/views/Sou_so')
const Gsxx = () => import('@/views/Gsxix')
const MV = () => import('@/views/MV')
const Tisidl = () => import('@/views/Tisi')
const Clis = () => import('@/views/Zuijin')

const Spin = () => import('@/views/Discover_music/video/Sipin')

const Ros = () => import('@/views/Discover_music/Recommend/Rso')
const Hli = () => import('@/views/Discover_music/Recommend/hlist')
const Plistid = () => import('@/views/Discover_music/Recommend/playlistId')
const Gs = () => import('@/views/Discover_music/Recommend/Geso')

Vue.use(VueRouter)

//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '',
    redirect: '/O_one/Rso'
  },
  {
    path: '/O_one',
    component: O_one,
    children: [
      {
        path: 'Rso',
        component: Ros
      },
      {
        path: 'HList',
        component: Hli
      },
      {
        path: 'PLID',
        component: Plistid
      },
      {
        path: 'GCS',
        component: Gs
      }
    ]
  },
  {
    path: '/Song_list/:id',
    component: S_L_D
  },
  {
    path: '/MV/:id/:lx',
    component: MV
  },
  {
    path: '/Souso',
    component: S_S
  },
  {
    path: '/Gsxi/:id',
    component: Gsxx
  },
  {
    path: '/Sip',
    component: Spin
  },
  {
    path: '/denglu',
    component: Tisidl
  },
  {
    path: '/lis',
    component: Clis
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
