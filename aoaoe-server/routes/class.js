var express = require('express');
var router = express.Router();
const Classlist = require("../models/Class"); //引入模块模型
//请求方式 GET , 请求分类列表 , 接口为 http://localhost:5000/api/class
router.get("/class", (req, res) => {
  Classlist.find().then((classlist) => {
    if (classlist == "") {
      return res.status(404).json("没有任何信息");
    } else {
      res.json(classlist)
    }
  }).catch(err => res.status(400).json(err))
});
//请求方式 GET , 请求分类列表 , 接口为 http://localhost:5000/api/v1.0/admin/class
router.get("/v1.0/admin/class", (req, res) => {
  Classlist.aggregate([{
    $lookup: {
      from: "shoplists", //discounts的shop_id与Shoplist的_id关联
      localField: "shop_id",
      foreignField: "_id",
      as: "shop"
    }
  },
  {
    $project: {
      "_id": 1,
      "name": 1,
      "date": 1,
      "icon": 1,
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

//请求方式 GET ，请求分类列表并包含所属店铺 接口为http://localhost:3000/api/class/shop
router.get("/class/shop", (req, res) => {
  Classlist.aggregate([{
    $lookup: {
      from: "shoplists", //discounts的shop_id与Shoplist的_id关联
      localField: "shop_id",
      foreignField: "_id",
      as: "shop"
    }
  },
  {
    $project: {
      "icon": 1,
      "name": 1,
      "_id": 1,
      "date": 1,
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

//请求方式 GET , 指定店铺的分类 , 接口为 http://localhost:3000/api/class/:id
router.get("/class/:id", (req, res) => {
  Classlist.find({ shop_id: req.params.id }).then((classlist) => {
    if (classlist == "") {
      return res.status(404).json("没有任何信息");
    } else {
      res.json(classlist)
    }
  }).catch(err => res.status(400).json(err))
});


//请求方式 POST , 添加class分类 , 接口为 http://localhost:3000/api/v1.0/admin/class/add/:id
router.post('/v1.0/admin/class/add/:id', (req, res) => {
  const classlists = {}
  if (req.params.id) classlists.shop_id = req.params.id;
  if (req.body.name) classlists.name = req.body.name;
  if (req.body.icon) classlists.icon = req.body.icon;

  new Classlist(classlists).save().then((classlists) => {
    // console.log(classlists)
    res.json({
      msg: '添加成功', status: 200
    });
  })


});


//请求方式 delete ,删除店铺分类，接口为http://localhost:3000/api/class/delete/:id

router.delete("/class/delete/:id", (req, res) => {
  Classlist.findOneAndRemove({ _id: req.params.id }).then((shopclass) => {
    shopclass.save().then(shopclass => { res.json("删除成功") })
  }).catch((err) => {
    res.status(404).json("删除失败！")
  });
})

//请求方式 post ,编辑店铺分类，接口为http://localhost:5000/api/v1.0/admin/class/edit/:id
router.post("/v1.0/admin/class/edit/:id",(req,res)=>{
  const classes = {}
  if (req.body.name) classes.name = req.body.name; //名字
  if (req.body.icon) classes.icon = req.body.icon;   //描述
  // console.log(food)
  Classlist.findOneAndUpdate({
    _id: req.params.id
  },
    { $set: classes }, { new: true }).then(classes => res.json({status:200,msg:"修改成功"}))
})
module.exports = router;
