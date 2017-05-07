var express = require('express')
var router = express.Router()

// 检查是否已登陆
var checkIsNotLogin = require('../middlewares/check').checkIsNotLogin

// 在 /api/signout 路径下退出
router.get('/', checkIsNotLogin, function (req, res, next) {
  // 清空 session 和 cookie 中的用户信息
  req.session.user = null
  res.clearCookie('user')

  res.send({
    resultCode: '001',
    resultContent: '退出成功'
  })
})

module.exports = router
