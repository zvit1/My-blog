var config = require('config-lite')(__dirname)
var mongoose = require('mongoose')

// 替换掉 mongoose 的 PostPromise
mongoose.Promise = global.Promise

var Schema = mongoose.Schema

// 连接数据库
mongoose.connect(config.mongodb)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.on('open', function () {
  console.log('----------------->Connect to ' + config.mongodb + ' successfully!')
})

// 定义用户的 Schema
var userSchema = Schema({
  username: String,
  nickname: String,
  password: String,
  introduction: String
})
userSchema.index({ username: 1 })
var UserModel = mongoose.model('UserModel', userSchema)

// 定义文章的 Schema
var postSchema = Schema({
  title: String,
  category: String,
  author: String,
  content: String
})
postSchema.index({ author: 1, _id: -1 })
var PostModel = mongoose.model('PostModel', postSchema)

module.exports = {
  UserModel: UserModel,
  PostModel: PostModel
}
