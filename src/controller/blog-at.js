/**
 * @description @ 用户关系 controller
 * @author lqr
 */

const { SuccessModel } = require('../model/ResModel')
const { findAtCountByUserId } = require('../services/blog-at')

/**
 * 获取@ 我的微博数量
 * @param {*} userId 
 */
const getAtMeCount = async (userId) => {
  const { count } = await findAtCountByUserId(userId)
  return new SuccessModel({
    count
  })
}

module.exports = {
  getAtMeCount
}