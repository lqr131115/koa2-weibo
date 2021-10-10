/**
 * @description blog controller
 * @author lqr
 */

const { createBlogFailInfo } = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')

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

module.exports = {
  publishBlog
}