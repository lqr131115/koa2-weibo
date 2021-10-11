/**
 * @description 数据格式化
 * @author lqr
 */

const { DEFAULT_PICTURE } = require('../config/constant')
const { timeFormat } = require('../utils/dt')

/**
 * 设置用户默认头像
 * @param {Objec} obj 用户对象 
 */
const _formatUserPicture = (obj) => {
  if (!obj.picture) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 
 */
const formatUser = (list) => {
  if (!list) {
    return null
  }

  if (Array.isArray(list)) {
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list)
}

/**
 * 格式化数据库时间数据的格式
 * @param {object} obj 实体对象
 * @returns 
 */
const _formatDBTime = (obj) => {
  const { createdAt, updatedAt } = obj
  obj.createAtFormat = timeFormat(createdAt)
  obj.updateAtFormat = timeFormat(updatedAt)
  return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 
 */
const formatBlog = (list) => {
  if (!list) {
    return null
  }

  if (Array.isArray(list)) {
    return list.map(_formatDBTime)
  }

  let result = list
  result = _formatDBTime(result)
  return result
}

module.exports = {
  formatUser,
  formatBlog
}