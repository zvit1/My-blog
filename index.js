var path = require('path')
var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var cors = require('cors') // 跨域中间件
var bodyParser = require('body-parser')
var multer = require('multer')
var winston = require('winston')
var expressWinston = require('express-winston')

var config = require('config-lite')(__dirname)
var routes = require('./routes')

var app = express()

app.use(bodyParser.json()) // 解析 application/json 类型的请求
app.use(bodyParser.urlencoded({ extended: true })) // 解析 application/x-www-form-urlencoded 类型的请求
// app.use(multer()) // 解析 multipart/form-data 类型的请求

// 配置静态文件
app.use('/', express.static(path.join(__dirname, 'views/dist')))

// session 中间件
app.use(session({
  name: config.session.key, // session ID 的键名
  secret: config.session.secret,
  cookie: {
    maxAge: config.session.maxAge // 过期时长
  },
  store: new MongoStore({ // 将 session 存储到 mongoDB 中
    url: config.mongodb
  })
}))

// 跨域中间件配置
app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}))

// 请求日志中间件
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))

routes(app) // 配置加载路由

// 错误日志中间件
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))

// error 页面
// app.use(function (err, req, res, next) {
//   res.render('error', {
//     error: err
//   })
// })

app.listen(config.port, function () {
  console.log(`my-blog server side is opening at port ${config.port}`)
})
