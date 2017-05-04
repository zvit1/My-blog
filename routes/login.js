var config = require('config-lite')(__dirname)
var sha1 = require('sha1')
var express = require('express')
var router = express.Router()

var checkIsLogin = require('../middlewares/check').checkIsLogin
var userManage = require('../models/users')

// POST /login 用户注册
router.post('/', checkIsLogin, function (req, res, next) {
  var username = req.body.username
  var password = req.body.password

  // 校验参数
  try {
    if (!(username.length >= 1 && username.length <= 10)) {
      throw new Error('用户名请限制在 1-10 个字符内')
    }
    if (password.length < 6) {
      throw new Error('密码少于 6 个字符')
    }
  } catch (err) {
    return res.send({
      resultCode: '002',
      resultContent: err.message
    })
  }

  // 明文密码sha1加密处理后与数据库匹配
  password = sha1(password)

  userManage.getUserByUsername(username).then(function (user) {
    if (!user) {
      return res.send({
        resultCode: '003',
        resultContent: '用户名不存在'
      })
    }
    if (user.password !== password) {
      return res.send({
        resultCode: '002',
        resultContent: '密码错误'
      })
    }

    // 将密码信息去除后的 user 信息写入 session
    delete user.password
    delete user._id
    req.session.user = user

    res.cookie('user', user, { maxAge: config.cookie.maxAge })
    res.send({
      resultCode: '001',
      resultContent: '登录成功'
    })
    res.redirect('/')
  }, function (err) {
    res.send({
      resultCode: '002',
      resultContent: err.message
    })
  })
})

module.exports = router
