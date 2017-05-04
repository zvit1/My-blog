module.exports = {
  port: 3000,
  mongodb: 'mongodb://localhost:27017/vblog',
  session: {
    key: 'myblog',
    secret: 'myblog',
    maxAge: 2592000000 // 有效期，与 Expire 的区别是 Expire 直接指定过期的时间
  },
  cookie: {
    maxAge: 2592000000
  }
}
