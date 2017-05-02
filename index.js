var path = require('path')
var express = require('express')
var mongoose = require('mongoose')
var cors = require('cors') // 跨域中间件
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes')

var app = express()

app.use(bodyParser.json()) // 解析 application/json 类型的请求
app.use(bodyParser.urlencoded({ extended: true })) // 解析 application/x-www-form-urlencoded 类型的请求
// app.use(multer()) // 解析 multipart/form-data 类型的请求

// 配置静态文件
app.use('/', express.static(path.join(__dirname, 'views/dist')))

app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}))

routes(app) // 配置加载路由

app.listen('3000', function () {
  console.log('my-blog server side is opening at port 3000')
})
