/**
 * @description 数据格式化
 * @author lqr
 */

const { DEFAULT_PICTURE } = require('../config/constant')

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

module.exports =  {
  formatUser
}