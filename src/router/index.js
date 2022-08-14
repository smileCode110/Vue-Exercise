import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from '../views/Login/Login.vue'
import Home from '../views/Home/Home.vue'


// 异步导入
const Goods = ()=>import('../views/Goods/Goods.vue')
const Params = ()=>import('../views/Params/Params.vue')
const Order = ()=>import('../views/Order/Order.vue')
const Advent = ()=>import('../views/Advent/Advent.vue')
const Orderlist =()=>import('../views/Order/OrderList/Orderlist.vue')
const Orderback =()=>import('../views/Order/OrderBack/Orderback.vue')

// 二级路由
const Addgoods =()=>import('../views/Goods/Addgoods.vue')
const Specifications =()=>import('../views/Params/Paramsinfo/Specifications.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    component:Layout,
    //路由元信息——用于路由拦截
    // 只有经过身份验证的用户才能创建帖子
    meta: { 
      isLogin: true 
    },
    children:[
      {
        path:'/',
        name:'Home',
        component:Home
      },
      {
        path:'/goods',
        name:'Goods',
        component:Goods
      },
      {
        path:'/addgoods',
        name:'Add-goods',
        component:Addgoods
      },
      {
        path:'/params',
        name:'Params',
        component:Params,
        redirect:'/params/specifications',
        children:[
          {
            path:'specifications',
            component:Specifications

          }
        ]
      }
      ,
      {
        path:'/order',
        name:'Order',
        component:Order,

        redirect:'/order/orderlist',
        children:[
          {
            path:'orderlist',
            component:Orderlist
          },
          {
            path:'orderback',
            component:Orderback
          }
        ]
      },
      {
        path:'/advent',
        name:'Advent',
        component:Advent
      }
    ]
   
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
 
]

const router = new VueRouter({
  routes
})



export default router
