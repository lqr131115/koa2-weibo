/**
 * @description redis的set get方法
 * @author lqr 
 */

const { REDIS_CONFIG } = require('../config/db')
const redis = require('redis')
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

// 错误处理
redisClient.on_error({ message: 'redis error' })

/**
 * redis set
 * @param {string} key 
 * @param {string} value 
 * @param {number} timeout 过期时间 单位 s 
 */
function set(key, value, timeout = 60 * 60) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value, redis.print)
  redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 
 * @returns 
 */
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (!val) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (_) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}