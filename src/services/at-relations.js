/**
 * @description @ 用户关系 service
 * @author lqr
 */

const { AtRelation } = require('../db/model/index')

/**
 * 创建 @ 用户关系
 * @param {number} blogId  微博 id
 * @param {number} userId  用户 id
 * @returns 
 */
const createAtRelation = async (blogId, userId) => {
  const result = await AtRelation.create({
    blogId, userId
  })
  return result.dataValues
}

module.exports = {
  createAtRelation
}