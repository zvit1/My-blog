module.exports = {
  checkIsLogin (req, res, next) {
    // 如果登陆了，则返回之前页
    if (req.session.user) {
      res.redirect('back')
    }
    next()
  },
  checkIsNotLogin (req, res, next) {
    // 如果未登陆，则重定向至登录页
    if (!req.session.user) {
      res.redirect('/login') // 返回之前的页面
    }
    next()
  }
}
