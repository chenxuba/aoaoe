var express = require('express');
var router = express.Router();
const Dianziping = require("../models/Dianziping"); //引入模块模型

//请求方式 GET , 请求banner列表 , 接口为 http://localhost:3000/api/banner
router.get("/dianziping", (req, res) => {
    Dianziping.find().then((dianziping) => {
        if (dianziping == "") {
            return res.status(404).json("没有任何信息");
        } else {
            res.json(dianziping)
        }
    }).catch(err => res.status(400).json(err))
});

//请求方式 POST , 添加banner列表 , 接口为 http://localhost:3000/api/banner/add
router.post('/dianziping/add', (req, res) => {
    const dianzipings = {}
    if (req.body.url) dianzipings.url = req.body.url;
    if (req.body.title) dianzipings.title = req.body.title;
    new Dianziping(dianzipings).save().then((dianzipings) => {
        res.json({
            data: dianzipings
        });
    })
});

//删除  接口 http://localhost:3000/api/discount/delete/:id
router.delete("/dianziping/delete/:id", (req, res) => {
    Dianziping.findOneAndRemove({ _id: req.params.id }).then((dianziping) => {
        dianziping.save().then(dianziping => { res.json(dianziping) })
    }).catch((err) => {
        res.status(404).json("删除失败！")
    });
})

//编辑
router.post("/dianziping/edit/:id", (req, res) => {
    const dianziping = {}
    if (req.body.url) dianziping.url = req.body.url;
    if (req.body.title) dianziping.title = req.body.title;
    // console.log(shop)
    Dianziping.findOneAndUpdate({
        _id: req.params.id
    },
        { $set: dianziping }, { new: true }).then(dianziping => res.json(dianziping))
})




module.exports = router;
