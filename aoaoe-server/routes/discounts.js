var express = require('express');
var router = express.Router();
const Discount = require("../models/Discount"); //引入模块模型

//请求方式 GET , 请求shoplist店铺列表 , 接口为 http://localhost:3000/api/discount
router.get("/discount", (req, res) => {
    Discount.find().then((discount) => {
        if (discount == "") {
            return res.status(404).json("没有任何活动");
        } else {
            res.json(discount)
        }
    }).catch(err => res.status(400).json(err))
});

//请求方式 POST , 添加discount活动 , 接口为 http://localhost:3000/api/discount/add:id
router.post('/discount/add/:id', (req, res) => {
    const discounts = {}
    if (req.body.icon_url) discounts.icon_url = req.body.icon_url;
    if (req.body.info) discounts.info = req.body.info;
    if (req.params.id) discounts.shop_id = req.params.id;
    if (req.body.name) discounts.name = req.body.name;
    new Discount(discounts).save().then((discount) => {
        res.json(discount)
    })
});
//聚合查询活动表和店铺表.接口为 http://localhost:3000/api/discount/shop

router.get("/discount/shop", (req, res) => {
    Discount.aggregate([{
            $lookup: {
                from: "shoplists", //discounts的shop_id与Shoplist的_id关联
                localField: "shop_id",
                foreignField: "_id",
                as: "shop"
            }
        },
        {
            $project: {
                "icon_url": 1,
                "info": 1,
                "name":1,
                "_id":1,
                "date":1,
                "shop": {
                    "_id": 1,
                    "name": 1
                }
            }
        }
    ], (err, alldisAndshop) => {
        res.json(alldisAndshop)
    })
})



//删除活动  接口 http://localhost:3000/api/discount/delete/:id
router.delete("/discount/delete/:id",(req,res)=>{
    Discount.findOneAndRemove({_id:req.params.id}).then((discount) => {
        discount.save().then(discount =>{res.json(discount)})
    }).catch((err) => {
      res.status(404).json("删除失败！")
    });
  })


//编辑活动 接口 http://localhost:3000/api/discount/edit/:id

router.post("/discount/edit/:id",(req,res)=>{
    const discount = {}
  if (req.body.name) discount.name = req.body.name; //名字
  if (req.body.info) discount.info = req.body.info;   //描述
  if (req.body.icon_url) discount.icon_url = req.body.icon_url; //图片
  // console.log(food)
  Discount.findOneAndUpdate({
    _id: req.params.id
  },
    { $set: discount }, { new: true }).then(discount => res.json({status:200,msg:"修改成功"}))
})




module.exports = router;