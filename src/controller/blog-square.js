/**
 * @description 微博-广场 controller
 * @author lqr
 */

const { SuccessModel } = require('../model/ResModel')
const { getSquareBlogsCache } = require('../cache/blog')
const { PAGE_SIZE } = require('../config/constant')
/**
 * 获取广场微博列表
 * @param {number} pageIndex 列表页码
 */
const getBlogList = async (pageIndex = 0) => {
  const { blogList, count } = await getSquareBlogsCache(pageIndex)
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