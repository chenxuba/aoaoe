var express = require('express');
var router = express.Router();
const User = require("../models/User")
// const bcrypt = require("bcrypt");
const md5 = require('blueimp-md5')
const sms_util = require('../models/emsApi/sms_util')
const users = {}
const UserModel = User.getModel('user')


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



// 注册接口，请求方式POST。接口地址：http://localhost:3000/api/user/register
// router.post("/user/register", (req, res) => {
//   //查询数据库中是否存在用户名
//   User.findOne({
//     username: req.body.username
//   }).then((user) => {
//     if (user) {
//       return res.status(404).json({
//         username: "用户名已被注册"
//       })
//     } else {
//       const newUser = new User({
//         username: req.body.username,
//         password: req.body.password
//       });
//       bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;

//           newUser.password = hash;

//           newUser
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
//         });
//       });
//     }
//   })
// });

/*
短信登陆
*/
router.post('/user/login_sms', function (req, res, next) {
  var phone = req.body.phone;
  var code = req.body.code;
  console.log('/login_sms', phone, code);
  if (users[phone] != code) {
    res.send({ code: 1, msg: '手机号或验证码不正确' });
    return;
  }
  //删除保存的code
  delete users[phone];


  UserModel.findOne({ phone }, function (err, user) {
    if (user) {
      console.log(user)
      // req.session.userid = user._id
      res.send({ code: 0, data: user })
    } else {
      //存储数据
      const userModel = new UserModel({ phone })
      userModel.save(function (err, user) {
        // req.session.userid = user._id
        res.send({ code: 0, data: user })
      })
    }
  })

})


/*
发送验证码短信
*/
router.get('/user/sendcode', function (req, res, next) {
  //1. 获取请求参数数据
  var phone = req.query.phone;
  //2. 处理数据
  //生成验证码(6位随机数)
  var code = sms_util.randomCode(6);
  //发送给指定的手机号
  console.log(`向${phone}发送验证码短信: ${code}`);
  sms_util.sendCode(phone, code, function (success) {//success表示是否成功
    if (success) {
      users[phone] = code
      console.log('保存验证码: ', phone, code)
      res.send({ "code": 0 })
    } else {
      //3. 返回响应数据
      res.send({ "code": 1, msg: '短信验证码发送失败' })
    }
  })
})




/*
密码登陆
 */
router.post('/user/login_pwd', function (req, res) {
  const loginame = req.body.loginame
  const password = md5(req.body.password)
  // const captcha = req.body.captcha.toLowerCase()
  // console.log('/login_pwd', name, pwd, captcha, req.session)

  // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
  // if(captcha!==req.session.captcha) {
  //   return res.send({code: 1, msg: '验证码不正确'})
  // }
  // 删除保存的验证码
  // delete req.session.captcha

  UserModel.findOne({ loginame }, function (err, user) {
    if (user) {
      console.log('findUser', user)
      if (password != user.password) {
        res.send({ code: 1, msg: '用户名或密码不正确!' })
      } else {
        // req.session.userid = user._id
        res.send({ code: 0, data: { _id: user._id, loginame: user.loginame, phone: user.phone } })
      }
    } else {
      const userModel = new UserModel({ loginame, password })
      userModel.save(function (err, user) {
        // 向浏览器端返回cookie(key=value)
        // res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
        // req.session.userid = user._id
        const data = { _id: user._id, loginame: user.loginame }
        // 3.2. 返回数据(新的user)
        res.send({ code: 0, data })
      })
    }
  })
})

//获取用户
router.get("/user", (req, res) => {
  UserModel.aggregate([{    //查询指定字段
    $project: {
      "_id": 1, 
      "loginame": 1,
      // "password":1,
      "phone":1,
      "date":1
  }
  }]).then((user) => {
    // console.log(user)
    if (user == "") {
      return res.status(200).json(user);
      
    } else {
      res.json(user)
    }
  }).catch(err => res.status(400).json(err))
});

//删除用户
//删除    接口 http://localhost:3000/api/user/delete/:id
router.delete("/user/delete/:id",(req,res)=>{
  UserModel.findOneAndRemove({_id:req.params.id}).then((user) => {
    user.save().then(user =>{res.json('删除成功！')})
  }).catch((err) => {
    res.status(404).json("删除失败！")
  });
})




module.exports = router;