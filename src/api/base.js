/**
 * 接口路径配置：
 * 一般文件目录：base.js  index.js 
 * 但是公司不一定
 *      config
 *          login  index.js config.js 
 *       index.js 
 *       xxxx.js 
 */

const base ={
    host:'http://localhost:8989/',//基础路径
    goodsList:'/api/projectList',//商品列表
    search:'/api/search',//查询列表
    SelectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    UploadUrl:'/api/upload',//图片上传post请求
    AddGoods:'/api/backend/item/insertTbItem',//添加商品
    DeleteGoods:'/api/backend/item/deleteItemById',//删除商品
    UpdataGoods:'/api/backend/item/updateTbItem',//修改、编辑商品
    Login:'api/login',//登陆接口
    Params:'api/backend/itemParam/selectItemParamAll',//规格参数
    SearchParams:'api/params/search',//模糊查询规格参数
    AddParams:'api/backend/itemParam/insertItemParam',//添加规格参数
    DeleteParams:'api/params/delete',//删除规格参数
    Statisticaldata:'api/statistical',//统计数据--销售信息
    SellTotal:'api/sellTotal',//统计销售比
}

export default base;