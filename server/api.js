// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// login
// 创建账号接口
router.post('/api/login/createAccount',(req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.Login({
        account : req.body.account,
        password : req.body.password
    });
    // 保存数据newAccount数据进mongoDB
    newAccount.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('createAccount successed');
        }
    });
});
// 获取已有账号接口
router.get('/api/login/getAccount',(req, res) => {
    // 通过模型去查找数据库
    models.Login.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

// user
// 创建用户信息接口
router.post('/api/user/createUserInfo',(req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.User({
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        github : req.body.github
    });
    // 保存数据newAccount数据进mongoDB
    newAccount.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('createUser successed');
        }
    });
});

// 获取已有的用户信息
router.get('/api/user/getUserInfo',(req, res) => {
    models.User.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

// 更新已有的用户信息
router.post('/api/user/updateUserInfo',(req, res) => {
    let params = {
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        github : req.body.github
    }
    models.User.update(params, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

// 删除已有的用户信息
router.post('/api/user/removeUserInfo',(req, res) => {
    let params = {
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        github : req.body.github
    }
    models.User.remove(params, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

module.exports = router;