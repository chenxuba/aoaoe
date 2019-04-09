var express = require('express');
var router = express.Router();
const Login = require("../models/Login"); //引入模块模型
var jwt = require('jsonwebtoken');
const md5 = require('blueimp-md5')

//登录接口 
router.post("/login", (req, res) => {
    const loginame = req.body.loginame;
    const password = md5(req.body.password);
    Login.find({ loginame: loginame }, (err, users) => {
        // console.log(users);
        if (users.length === 0) {
            res.send({ isSuccess: false, message: '该用户不存在' });
        } else if (users[0].password === password) {
            const rule = {id:users[0]._id,name:users[0].loginame,identity:users[0].identity};
            // console.log(rule)
            jwt.sign(rule,"chenruisheng",{expiresIn:3600},(err,token)=>{
                if(err) throw err;
                // console.log("login token:" + token)
                res.json({
                    success:true,
                    token:"Bearer " + token,
                    message: '登录成功'
                })
            })
            // res.send({ isSuccess: true, message: '登录成功' });
        } else if (users[0].password !== password) {
            res.send({ isSuccess: false, message: '密码不正确，请重新输入' });
        }
    });

})

//注册接口

router.post('/register', function (req, res) {
    const newUser = new Login({ // 用户传参
        loginame : req.body.loginame,
        password : md5(req.body.password),
        identity : req.body.identity
    });
    // console.log(newUser)
    const loginame = req.body.loginame;
    Login.find({loginame: loginame},(err, docs) => {
        if(docs.length > 0) {
            res.send({isSuccess: false, message: '用户名已存在',status:999})
        } else { // 向logins集合中保存数据
            newUser.save(err => {
                const datas =  err ? {isSuccess: false,status:555} : {isSuccess: true, message: '注册成功',status:888}
                res.send(datas);
            });
        }
    })
});


module.exports = router;