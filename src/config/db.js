const { isDev, isPro } = require('../utils/env')

let REDIS_CONFIG, MYSQL_CONFIG

if (isDev) {
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

if (isPro) {
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