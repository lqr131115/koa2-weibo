/**
 * @description @ 用户关系 controller
 * @author lqr
 */

const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')
const { findAtMeBlogsCountByUserId, findAtMeBlogs } = require('../services/blog-at')

/**
 * 获取@ 我的微博数量
 * @param {*} userId 
 */
const getAtMeCount = async (userId) => {
  const { count } = await findAtMeBlogsCountByUserId(userId)
  return new SuccessModel({
    count
  })
}

/**
 * 获取@ 我的微博
 * @param {number} userId 用户 id
 */
const getAtMeBlogList = async (userId, pageIndex = 0) => {
  const { blogList, count } = await findAtMeBlogs(userId, pageIndex)
  return new SuccessModel({
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count,
    isEmpty: blogList.length === 0
  })
}
module.exports = {
  getAtMeCount,
  getAtMeBlogList
}