/**
 * @description 数据格式化
 * @author lqr
 */

const { DEFAULT_PICTURE, REG_FOR_AR_WHO } = require('../config/constant')
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
 * 格式化微博内容
 * @param {object} obj 实体对象
 * @returns 
 */
const _formatContent = (obj) => {
  obj.contentFormat = obj.content

  // 格式化 @
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AR_WHO,
    (matchStr, nickName, userName) => `<a href="/profile/${userName}">@${nickName}</a>`)
  return obj
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
    return list.map(_formatDBTime).map(_formatContent)
  }

  let result = list
  result = _formatDBTime(result)
  result = _formatContent(result)
  return result
}

module.exports = {
  formatUser,
  formatBlog
}