# 本作品仿美团饿了么
#### 导语
>本人是半路出家半年经验前端狗，前段时间一直想一个人单独开发一个较为完整的项目，在众多应用中，考虑之后选择了美团外卖饿了吗来模仿，这段时间就利用工作之余时间进行开发，前端用vue+vuex+vue-router+axios，因为需要用到定位和接口等功能，需要后端配合，而且想要做真正数据交互，所以我买了阿里云1G服务器，用express(基于nodejs的框架)做后台，数据库用NOSQL的mongodb。 前端项目包含20多个路由，涉及到vue文件有40个，功能设计手机号码登录，账号密码登录，定位，浏览商品，图片路由懒加载，加购物车等，是一个逐渐趋于完整的项目。

#### 注意：此项目为个人开发实践练习，不作为任何商业用途，会不断进行更新，感谢每一位点赞的小伙伴，共勉！
[前端Demo地址](http://aoaoe.chenruisheng.info)
[后台管理Demo地址](http://www.chenruisheng.info/aoaoe/admin)
#### ps：克隆下来后，安装依赖后，前端npm run dev 后台npm run serve 后端 nodemon 启动后直接可以链上本人的数据库。
## 前端功能
* 登录/注销
* IP定位
* 搜索地址
* 后端获取商店(暂未实现计算当前位置和商店的距离)
* 加购物车
* 图片懒加载
* 路由懒加载
* 动态底部导航
## 后台管理功能
* 登录/注册/注销
* Token验证
* 请求拦截/响应拦截
* 路由守卫
* 店铺信息的增删改查
* 登录用户权限
## 技术栈
* Webpack-cli搭建项目（vue2.0/vue-cli3.0）
* Vue全家桶(vue+vuex+vue-router)
* CSS预处理器less
* axios与后端进行请求数据
* 网络服务器存储图片
* 使用better-scroll滚动
* Express搭建后端服务
* Mongoose对MongoDB进行便捷操作
## 效果演示
![avatar](http://wx1.sinaimg.cn/mw690/006JrQflly1g1wnd7lp7pg30a90hn4qp.gif)
