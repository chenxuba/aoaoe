var express = require('express');
var router = express.Router();
const Menu = require("../models/Menu"); //引入模块模型



//请求方式 GET , 请求menu列表 , 接口为 http://localhost:5000/api/menu
router.get("/menu", (req, res) => {
    Menu.find().then((menu) => {
      if (menu == "") {
        return res.status(404).json("没有任何信息");
      } else {
        res.json(menu)
      }
    }).catch(err => res.status(400).json(err))
  });

//请求方式 POST , 添加menu列表 , 接口为 http://localhost:5000/api/menu/add
router.post('/v1.0/admin/menu/add', (req, res) => {
    const menus = {}
    if (req.body.title) menus.title = req.body.title;
    if (req.body.img_url) menus.img_url = req.body.img_url;
    // if (req.body.img_link) menus.img_link = req.body.img_link;
    new Menu(menus).save().then((menus) => {
      res.json({
        data: menus
      });
    })
  });
//请求方式 POST , 编辑menu列表 , 接口为 http://localhost:5000/api/v1.0/admin/menu/edit/:id
router.post('/v1.0/admin/menu/edit/:id', (req, res) => {
  const menus = {}
  if (req.body.title) menus.title = req.body.title; //名字
  if (req.body.img_url) menus.img_url = req.body.img_url;   //描述
  // if (req.body.img_link) menus.img_link = req.body.img_link;
  // console.log(food)
  Menu.findOneAndUpdate({
    _id: req.params.id
  },
    { $set: menus }, { new: true }).then(menus => res.json({status:200,msg:"修改成功"}))
});

//请求方式 DELECT , 删除menu列表 , 接口为 http://localhost:5000/api/v1.0/admin/menu/delect/:id
router.delete("/v1.0/admin/menu/delect/:id", (req, res) => {
  Menu.findOneAndRemove({ _id: req.params.id }).then((shopmenu) => {
    shopmenu.save().then(shopmenu => { res.json("删除成功") })
  }).catch((err) => {
    res.status(404).json("删除失败！")
  });
})








module.exports = router;
