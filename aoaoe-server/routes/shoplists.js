var express = require('express');
var router = express.Router();
const Shoplist = require("../models/Shoplist"); //引入模块模型
const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');

const Classlist = require("../models/Class"); //引入模块模型

const Discount = require("../models/Discount"); //引入模块模型

const Foodlist = require("../models/Food"); //引入模块模型




/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


//聚合查询店铺列表和店铺对应的活动
//请求方式 GET , 请求shoplist店铺列表和discount活动列表 , 接口为 http://localhost:3000/api/shoplist/all
//返回示例：[
//   {
//     "_id": "5c3de3b766aa42a862c55ece",
//     "name": "医佰康（杨浦区）",
//      .....
//     "discounts": [
//         {
//             "icon_url": "http://p0.meituan.net/xianfu/51639e2e7a51c71d967acc44a060e3092048.png",
//             "info": "由嗷嗷饿专送提供高品质送餐服务"
//         },
//         {
//             .......
//         }
//     ]
// },
//  {
//      .....
//  }
// ] 
//后台用的接口，请求店铺列表
router.get("/shoplist/all/admin", (req, res) => {
  // 拿取token 数据 按照自己传递方式写
  // console.log(req.headers)
  const token = req.headers.authorization.split(" ")[1];
  // console.log("0token:" + token)
  if (token) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, "chenruisheng", function (err, decoded) {
      // console.log(err)
      if (err) {
        // console.log("1" + err)
        return res.status(401).send({ success: false, message: '无效的token.' });
      } else {
        Shoplist.aggregate([
          // {
          //   $lookup: {
          //     from: "discounts", //discounts的shop_id与Shoplist的_id关联
          //     localField: "_id",
          //     foreignField: "shop_id",
          //     as: "discounts"
          //   }
          // },
          {
            $project: {
              "_id": 1,
              "name": 1,
              "poi_back_pic_url": 1,
              "pic_url": 1,
              "wm_poi_score": 1,
              // "month_sale_num": 1,
              // "distance": 1,
              // "mt_delivery_time": 1,
              // "min_price_tip": 1,
              // "shipping_fee_tip": 1,
              // "average_price_tip": 1,
              // "shipping_time_x": 1,
              "head_pic_url": 1,
              "address": 1,
              "tel": 1,
              "date": 1,
              // "discounts": {
              //   "icon_url": 1,
              //   "info": 1
              // }
            }
          }
        ], (err, allshoplist) => {
          res.json(allshoplist)
        })
      }
    });
  } else {
    // 没有拿到token 返回错误 
    // console.log("2 token" + token)
    return res.status(401).send({
      success: false,
      message: '没有找到token.'
    });
  }
  //以上是验证token

});
//聚合查询指定的店铺所有分类和商品的信息 //http://localhost:3000/api/shop/allmsg/:id
router.get("/shop/allmsg/:id", (req, res) => {

  Shoplist.aggregate([{
    $lookup: {
      from: "classes",
      localField: "_id",
      foreignField: "shop_id",
      as: "classes"
    }
  },
  {
    $lookup: {
      from: "discounts",
      localField: "_id",
      foreignField: "shop_id",
      as: "discounts"
    }
  },
  {
    $unwind: {
      path: "$classes",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $lookup: {
      from: "foods",
      localField: "classes._id",
      foreignField: "class_id",
      as: "classes.foods",
    }
  }, {
    $group: {
      _id: "$_id",
      name: {
        $first: "$name"
      },
      poi_back_pic_url: {
        $first: "$poi_back_pic_url"
      },
      head_pic_url: {
        $first: "$head_pic_url"
      },
      pic_url: {
        $first: "$pic_url"
      },
      wm_poi_score: {
        $first: "$wm_poi_score"
      },
      month_sale_num: {
        $first: "$month_sale_num"
      },
      distance: {
        $first: "$distance"
      },
      mt_delivery_time: {
        $first: "$mt_delivery_time"
      },
      min_price_tip: {
        $first: "$min_price_tip"
      },
      shipping_fee_tip: {
        $first: "$shipping_fee_tip"
      },
      average_price_tip: {
        $first: "$average_price_tip"
      },
      shipping_time_x: {
        $first: "$shipping_time_x"
      },
      discounts: {
        $first: "$discounts"
      },
      classes: {
        $push: "$classes"
      }
    }
  }, {
    $match: { _id: mongoose.Types.ObjectId(req.params.id) }
  }
  ], (err, allshopmsg) => {
    res.json(allshopmsg)
  })
})

//前端用的接口，获取店铺列表
router.get("/shoplist/all", (req, res) => {
  Shoplist.aggregate([
    {
      $lookup: {
        from: "discounts", //discounts的shop_id与Shoplist的_id关联
        localField: "_id",
        foreignField: "shop_id",
        as: "discounts"
      }
    },
    {
      $project: {
        "_id": 1,
        "name": 1,
        "poi_back_pic_url": 1,
        "pic_url": 1,
        "wm_poi_score": 1,
        "month_sale_num": 1,
        "distance": 1,
        "mt_delivery_time": 1,
        "min_price_tip": 1,
        "shipping_fee_tip": 1,
        "average_price_tip": 1,
        "shipping_time_x": 1,
        "address": 1,
        "tel": 1,
        "date": 1,
        "discounts": {
          "icon_url": 1,
          "info": 1
        }
      }
    }
  ], (err, allshoplist) => {
    res.json(allshoplist)
  })

});









//请求方式 GET , 请求shoplist店铺列表 , 接口为 http://localhost:3000/api/shoplist
// router.get("/shoplist", (req, res) => {
//   Shoplist.find().then((shoplist) => {
//     if (shoplist == "") {
//       return res.status(404).json("没有任何店铺");
//     } else {
//       res.json(shoplist)
//     }
//   }).catch(err => res.status(400).json(err))
// });
//请求方式 POST , 添加shoplist店铺 , 接口为 http://localhost:3000/api/shoplist/add
router.post('/shoplist/add', (req, res) => {
  const shoplists = {}
  if (req.body.name) shoplists.name = req.body.name;
  if (req.body.poi_back_pic_url) shoplists.poi_back_pic_url = req.body.poi_back_pic_url;
  if (req.body.head_pic_url) shoplists.head_pic_url = req.body.head_pic_url;
  if (req.body.pic_url) shoplists.pic_url = req.body.pic_url;
  if (req.body.wm_poi_score) shoplists.wm_poi_score = req.body.wm_poi_score;
  if (req.body.month_sale_num) shoplists.month_sale_num = req.body.month_sale_num;
  if (req.body.distance) shoplists.distance = req.body.distance;
  if (req.body.mt_delivery_time) shoplists.mt_delivery_time = req.body.mt_delivery_time;
  if (req.body.min_price_tip) shoplists.min_price_tip = req.body.min_price_tip;
  if (req.body.shipping_fee_tip) shoplists.shipping_fee_tip = req.body.shipping_fee_tip;
  if (req.body.average_price_tip) shoplists.average_price_tip = req.body.average_price_tip;
  if (req.body.address) shoplists.address = req.body.address;
  if (req.body.tel) shoplists.tel = req.body.tel;
  new Shoplist(shoplists).save().then((shoplists) => {
    res.json({
      data: shoplists
    });
  })
});



//请求方式 delete ,删除店铺，接口为http://localhost:3000/api/shop/delete/:id 删除店铺 其下属的所有数据均删除

router.delete("/shop/delete/:id", (req, res) => {
  
  Shoplist.findOneAndRemove({ _id: req.params.id }).then((shop) => {
    shop.save().then(shop => {
      Classlist.remove({ shop_id: req.params.id }).then((classes) => {
        Discount.remove({ shop_id: req.params.id }).then((discounts) => {
          Foodlist.remove({ shop_id: req.params.id }).then((foods) => {
            res.json("删除成功")
          })
        })
      })
    })
  }).catch((err) => {
    res.status(404).json("删除失败！")
  });
})

//请求方式 post ,编辑店铺，接口为http://localhost:3000/api/shop/edit/:id

router.post("/shop/edit/:id", (req, res) => {
  // 拿取token 数据 按照自己传递方式写
  // console.log(req.headers)
  const token = req.headers.authorization.split(" ")[1];
  // console.log("0token:" + token)
  if (token) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, "chenruisheng", function (err, decoded) {
      // console.log(err)
      if (err) {
        // console.log("1" + err)
        return res.status(401).send({ success: false, message: '无效的token.' });
      } else {
        const shop = {}
        if (req.body.name) shop.name = req.body.name;
        if (req.body.address) shop.address = req.body.address;
        if (req.body.tel) shop.tel = req.body.tel;
        if (req.body.pic_url) shop.pic_url = req.body.pic_url;
        if (req.body.head_pic_url) shop.head_pic_url = req.body.head_pic_url;
        if (req.body.poi_back_pic_url) shop.poi_back_pic_url = req.body.poi_back_pic_url;
        console.log(shop)
        Shoplist.findOneAndUpdate({
          _id: req.params.id
        },
          { $set: shop }, { new: true }).then(shop => res.json(shop))
      }
    });
  } else {
    // 没有拿到token 返回错误 
    // console.log("2 token" + token)
    return res.status(401).send({
      success: false,
      message: '没有找到token.'
    });
  }
  //以上是验证token
})
module.exports = router;