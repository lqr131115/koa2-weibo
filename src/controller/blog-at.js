/**
 * @description @ 用户关系 controller
 * @author lqr
 */

const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')
const { findAtMeBlogsCountByUserId, findAtMeBlogs, updateIsRead } = require('../services/blog-at')

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

/**
 * 标记 @ 我的微博已读
 * @param {number} userId 用户 id 
 */
const markAsRead = async (userId) => {
  try {
    await updateIsRead(
      {
        newIsRead: true
      },
      {
        userId,
        isRead: false
      })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}