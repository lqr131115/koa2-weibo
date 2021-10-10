/**
 * @description 个人主页 controller
 * @author lqr
 */

const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')
const { findBlogsByUserName } = require('../services/blog-profile')
/**
 * 获取个人微博列表
 * @param {string} userName 用户名  
 * @param {number} pageIndex 列表页码
 */
const getBlogList = async (userName, pageIndex = 0) => {
  const { blogList, count } = await findBlogsByUserName({
    userName, pageIndex,
    pageSize: PAGE_SIZE
  })
  return new SuccessModel({
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count,
    isEmpty: blogList.length === 0
  })
}

module.exports = {
  getBlogList
}