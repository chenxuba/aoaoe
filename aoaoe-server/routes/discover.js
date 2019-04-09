var express = require('express');
var router = express.Router();
const Discover = require("../models/Discover"); //引入模块模型


//发现页面增加妹纸照片的接口
//请求方式 POST , 增加妹纸照片 , 接口为 http://localhost:3000/api/meizi/add
router.post('/meizi/add', (req, res) => {
    const meizis = {}
    if (req.body.images) meizis.images = req.body.images;
    new Discover(meizis).save().then((meizis) => {
        res.json({
            data: meizis
        });
    })
});

//发现页面下拉刷新接口
//请求方式 GET , 接口为 http://localhost:3000/api/meizi

router.get("/meizi", (req, res) => {
    Discover.find().sort({ date: -1 }).then(meizi => {
        if (meizi == "") {
            res.status(404).json('没有任何妹纸');
        } else {
            let newMeizi = [];
            for (let i = 0; i < 3; i++) {
                if (meizi[i] != null) {
                    newMeizi.push(meizi[i]);
                }
            }
            res.json(newMeizi)

        }
    })
});

//发现页面上拉加载接口
//请求方式 GET , 接口为 http://localhost:3000/api/meizi/up
router.get("/meizi/up/:page/:size", (req, res) => {
    Discover.find().sort({ date: -1 }).then(meizi => {
        if (meizi == "") {
            res.status(404).json('没有任何妹纸');
        } else {
            let size = req.params.size;
            let page = req.params.page;
            let index = size * (page -1);
            let newMeizi = [];
            for(let i =index;i < size * page;i++){
                if(meizi[i] != null){
                    newMeizi.unshift(meizi[i]);
                }
            }
            res.json(newMeizi)

        }
    })
});











module.exports = router;
