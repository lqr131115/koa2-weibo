/**
 * @description blog controller
 * @author lqr
 */

const { PAGE_SIZE } = require('../config/constant')
const { createBlogFailInfo } = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, findAllFollwersBlogs } = require('../services/blog')

/**
 * 发表微博
 * @param {number} userId 用户Id
 * @param {string} content 微博内容
 * @param {string} image 微博图片
 * @returns 
 */
const publishBlog = async ({ userId, content, image }) => {
  try {
    const blog = await createBlog({ userId, content, image })
    return new SuccessModel(blog)
  } catch (error) {
    console.error(error)
    return new ErrorModel(createBlogFailInfo)
  }
}


/**
 * 获取首页微博(包括自己和关注人的微博)
 * @param {number} userId 当前登录用户的 id 
 * @param {number} pageIndex 列表每页大小
 */
const getBlogList = async (userId, pageIndex = 0) => {
  const { blogList, count } = await findAllFollwersBlogs({ userId, pageIndex, pageSize: PAGE_SIZE })
  return new SuccessModel({
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count,
    isEmpty: blogList.length === 0
  })

}

module.exports = {
  publishBlog,
  getBlogList
}