## 如何启动后台项目
1. 安装xampp软件 （创建本地的服务-集成工具）如果安装中mysql-关闭服务mysql
2. 启动xampp文件：apache mysql打开：浏览器输入https://localhost/phpmyadmin/
3. 导入sql文件（后台项目需要的数据库文件） ego.sql （注意：数据库名称ego）
4. 启动vue项目:  vue-ego 
	a:打开文件夹：vscode 
	b:安装依赖：cnpm i / npm i 
	c: 启动项目 npm run serve 
## 后台管理系统
 某个个后台管理系统，包含商品管理 用户管理 订单等等信息。 

前后端分离：
    用户 --- >前端-视图-数据---->后台-提供接口 ---> 数据库  

## 技术点
    Vue + Vue-router  + Vuex + Element-ui + Axios  + Echarts + 其他三方库
