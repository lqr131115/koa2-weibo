/**
 * @description @ 用户关系 services
 * @author  lqr
 */

const { AtRelation } = require('../db/model')

/**
 * 根据用户id 获取@ 自己的微博数量
 * @param {*} userId 用户 id
 */
const findAtCountByUserId = async (userId) => {
  const { count } = await AtRelation.findAndCountAll({
    where: {
      userId
    }
  })
  return { count }
}

module.exports = {
  findAtCountByUserId
}