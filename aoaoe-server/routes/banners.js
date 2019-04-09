var express = require('express');
var router = express.Router();
const Banner = require("../models/Banner"); //引入模块模型

//请求方式 GET , 请求banner列表 , 接口为 http://localhost:3000/api/banner
router.get("/banner", (req, res) => {
    Banner.find().then((banner) => {
      if (banner == "") {
        return res.status(404).json("没有任何信息");
      } else {
        res.json(banner)
      }
    }).catch(err => res.status(400).json(err))
  });

//请求方式 POST , 添加banner列表 , 接口为 http://localhost:3000/api/banner/add
router.post('/banner/add', (req, res) => {
    const banners = {}
    if (req.body.banner) banners.banner = req.body.banner;
    if (req.body.banner_url) banners.banner_url = req.body.banner_url;
    new Banner(banners).save().then((banners) => {
      res.json({
        data: banners
      });
    })
  });







module.exports = router;
