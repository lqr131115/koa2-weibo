/**
 * @description 微博-广场 controller
 * @author lqr
 */

const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')
const { findBlogs } = require('../services/blog-square')
/**
 * 获取广场微博列表
 * @param {number} pageIndex 列表页码
 */
const getBlogList = async (pageIndex = 0) => {
  const { blogList, count } = await findBlogs({
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