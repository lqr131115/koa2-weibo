/**
 * @description blog service
 * @author lqr
 */

const Blog = require('../db/model/Blog')
const xss = require('xss')
/**
 * 创建博客
 * @param {number} userId 用户Id
 * @param {string} content 博客内容
 * @param {string} image 博客图片
 * @returns 
 */
const createBlog = async ({ userId, content, image }) => {
  const blogInfo = await Blog.create({
    userId,
    content: xss(content),
    image,
  })
  return blogInfo.dataValues
}

module.exports = {
  createBlog
}