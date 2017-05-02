var sha1 = require('sha1')
var express = require('express')
var router = express.Router()

var userManage = require('../models/users')

// POST /login 用户注册
router.post('/', function (req, res, next) {
  var username = req.body.username
  var nickname = req.body.nickname
  var password = req.body.password
  var introduction = req.body.introduction

  // 校验参数
  try {
    if (!(username.length >= 1 && username.length <= 10)) {
      throw new Error('用户名请限制在 1-10 个字符内')
    }
    if (!(nickname.length >= 1 && nickname.length <= 10)) {
      throw new Error('昵称请限制在 1-10 个字符内')
    }
    if (password.length < 6) {
      throw new Error('密码少于 6 个字符')
    }
    if (introduction.length > 50) {
      throw new Error('个人简介请限制在 50 个字符内')
    }
  } catch (err) {
    return res.send({
      resultCode: '002',
      resultContent: err.message
    })
  }

  // 明文密码处理
  password = sha1(password)

  // 待写入数据库的用户信息
  var user = {
    username: username,
    nickname: nickname,
    password: password,
    introduction: introduction
  }

  userManage.create(user).then(function (result) {
    res.send({ resultCode: '001', resultContent: '新增用户成功' })
  }, function (err) {
    if (err) {
      res.send({
        resultCode: '002',
        resultContent: error.message
      })
    }
  })
})

module.exports = router
