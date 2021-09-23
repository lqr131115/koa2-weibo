/**
 * @description 数据库配置
 * @author lqr
 */

const { isPro } = require('../utils/env')

let MYSQL_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '131115',
  database: 'koa2-weibo',
  port: '3306',
}
let REDIS_CONFIG = {
  port: 6379,
  host: '127.0.0.1'
}

if (isPro) {
  // 线上环境
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '131115',
    database: 'koa2-weibo',
    port: '3306',
  }
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}