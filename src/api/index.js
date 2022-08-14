/**
 * 请求方法
 */


// import axios from 'axios'
import base from './base'
//导入二次封装的axios文件
import axios from "../utils/request"


//const qs = require('querystring')

const api ={

    /**
     * 登陆接口
     */
    getLogin(params){
        return axios.post(base.Login,params)
    },

    /***
     * 商品列表
     * goodlist
     */ 
    getGoodsList(params){//params={}
        return axios.get(base.goodsList,{
            params
        })
    },
    /***
     * 查询功能
     * search
     */
    getSearch(params){
        return axios.get(base.search,{
            params
        })
    },
    /***
     * 类目选择
     * {id:cid}
     */
    getSelectCategory(params){
        return axios.get(base.SelectCategory,{
            params
        })
    },

    /***
     * 添加商品
     * 参数： title cid  category sellPoint price num descs paramsInfo image
     */
    getAddGoods(params){//params是对象{}
        return axios.get(base.AddGoods,{
            params
        })
    },

    /**
     *商品删除接口 id
     */
    getDeleteGoods(params){
        return axios.get(base.DeleteGoods,{
            params
        })
    },
    /**
     * 修改商品
     */
    getUpdataGoods(params){
        return axios.get(base.UpdataGoods,{
            params
        })
    },

    /**
     * 规格参数列表  参数 page
     */
    getParams(params){
        return axios.get(base.Params,{
            params
        })
    },

    /**
     * 规格参数  模糊查询  参数：search
     */
    getSearchParams(params){
        return axios.get(base.SearchParams,{
            params
        })
    },
    /**
    * 规格参数 添加 
    * 参数：itemCatId,content,specsName
    */
   getAddParams(params){
        return axios.get(base.AddParams,{
            params
        })
   },
   //删除规格参数
   getDeleteParams(params){
       return axios.get(base.DeleteParams,{
           params
       })
   },
   //统计销售数据
   getStatisticaldata(params){
       return axios.get(base.Statisticaldata,{
           params
       })
   },
   //销售比
   getSellTotal(params){
    return axios.get(base.SellTotal,{
        params
    })
   }



}
export default api 