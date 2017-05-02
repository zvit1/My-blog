module.exports = function (app) {
  app.use('/signup', require('./signup'))
  app.use('/login', require('./login'))

  // 404 page
  // app.use(function (req, res, next) {
  //   if (!res.headersSent) {
  //     res.redirect('/')
  //   }
  // })
}
