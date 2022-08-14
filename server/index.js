//搭建express服务
const express = require('express')
const app = express()
// post请求表单数据
app.use(express.urlencoded({ extended: true }))
//静态文件托管---访问：http:localhost：8989/图片.jpg可以看到图片
app.use(express.static('upload'))


//路由
const router = require('./router')

app.use('/api',router)

app.listen(8989,()=>{
    console.log(8989)
})