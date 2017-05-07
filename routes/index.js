module.exports = function (app) {
  app.use('/api/signup', require('./signup'))
  app.use('/api/signout', require('./signout'))
  app.use('/api/login', require('./login'))

  // 404 page
  // app.use(function (req, res, next) {
  //   if (!res.headersSent) {
  //     res.redirect('/')
  //   }
  // })
}
