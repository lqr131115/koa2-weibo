/**
 * @description sequlize配置
 * @author lqr
 */

const { Sequelize } = require('sequelize')
const { MYSQL_CONFIG } = require('../config/db')
const { isPro, isTest } = require('../utils/env')

const { host, user, password, database, } = MYSQL_CONFIG
const config = { host, dialect: 'mysql' }

// 测试环境 关闭部分日志打印
isTest && (config.logging = () => { })

// 线上环境 连接池配置
isPro && (config.pool = {
  max: 5,
  min: 0,
  idle: 30000 // 连接池30秒内没被使用,释放
})

const seq = new Sequelize(database, user, password, config)

module.exports = seq