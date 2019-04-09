var express = require('express');
var router = express.Router();
const Foodlist = require("../models/Food"); //引入模块模型



//请求方式 GET , 请求商品列表 , 接口为 http://localhost:3000/api/food
router.get("/food", (req, res) => {
  Foodlist.find().then((foodlist) => {
    if (foodlist == "") {
      return res.status(404).json("没有任何信息");
    } else {
      res.json(foodlist)
    }
  }).catch(err => res.status(400).json(err))
});

//请求方式 POST , 添加商品 , 接口为 http://localhost:3000/api/food/add/:id
router.post('/food/add/:id', (req, res) => {
  const foodlists = {}
  if (req.params.id) foodlists.class_id = req.params.id;
  if (req.body.name) foodlists.name = req.body.name;
  if (req.body.min_price) foodlists.min_price = req.body.min_price;
  if (req.body.month_saled_content) foodlists.month_saled_content = req.body.month_saled_content;
  if (req.body.praise_content) foodlists.praise_content = req.body.praise_content;
  if (req.body.unit) foodlists.unit = req.body.unit;
  if (req.body.picture) foodlists.picture = req.body.picture;
  if (req.body.product_label_picture) foodlists.product_label_picture = req.body.product_label_picture;
  if (req.body.description) foodlists.description = req.body.description;
  if (req.body.shop_id) foodlists.shop_id = req.body.shop_id;
  new Foodlist(foodlists).save().then((foodlists) => {
    res.json({
      data: foodlists
    });
  })
});


//联合查询  food表关联分类表，分类表关联店铺表  接口 http://localhost:3000/api/food/allmsg

router.get("/food/allmsg", (req, res) => {
  Foodlist.aggregate([{
    $lookup: {
      from: "classes",
      localField: "class_id",
      foreignField: "_id",
      as: "classes"
    }
  },
  {
    $unwind: {
      path: "$classes",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $lookup: {
      from: "shoplists",
      localField: "classes.shop_id",
      foreignField: "_id",
      as: "classes.shop",
    }
  }, {
    $group: {
      _id: "$_id",
      name: {
        $first: "$name"
      },
      picture: {
        $first: "$picture"
      },
      description: {
        $first: "$description"
      },
      month_saled_content: {
        $first: "$month_saled_content"
      },
      praise_content: {
        $first: "$praise_content"
      },
      date: {
        $first: "$date"
      },
      classes: {
        $push: "$classes"
      }
    }
  }
  ], (err, allshopmsg) => {
    res.json(allshopmsg)
  })
})


//删除    接口 http://localhost:3000/api/food/delete/:id
router.delete("/food/delete/:id", (req, res) => {
  Foodlist.findOneAndRemove({ _id: req.params.id }).then((food) => {
    food.save().then(food => { res.json(food) })
  }).catch((err) => {
    res.status(404).json("删除失败！")
  });
})

//请求方式 post ,编辑商品，接口为http://localhost:3000/api/food/edit/:id

router.post("/food/edit/:id", (req, res) => {
  const food = {}
  if (req.body.name) food.name = req.body.name; //名字
  if (req.body.description) food.description = req.body.description;   //描述
  if (req.body.picture) food.picture = req.body.picture; //图片
  if (req.body.praise_content) food.praise_content = req.body.praise_content; //图片
  // console.log(food)
  Foodlist.findOneAndUpdate({
    _id: req.params.id
  },
    { $set: food }, { new: true }).then(food => res.json({status:200,msg:"修改成功"}))
})

module.exports = router;
