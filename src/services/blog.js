/**
 * @description blog service
 * @author lqr
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const xss = require('xss')
const { PAGE_SIZE } = require('../config/constant')
const { formatBlog, formatUser } = require('./_format')
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

/**
 * 根据获取所有被关注者的微博(包括自己,自己关注了自己)
 * @param {number} userId  当前登录的用户 id
 * @param {number} pageIndex  微博列表页码
 * @param {number} pageSize  每页大小
 */
const findAllFollwersBlogs = async ({ userId, pageIndex = 0, pageSize = PAGE_SIZE }) => {
  const { rows, count } = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
      },
      {
        model: UserRelation,
        attributes: ['userId', 'follwerId'],
        where: {
          userId
        }
      }
    ]
  })
  let blogList = rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blog => {
    let user = blog.user
    user = user.dataValues
    blog.user = user
    user = formatUser(user)
    let userRelation = blog.userRelation
    userRelation = userRelation.dataValues
    blog.userRelation = userRelation
    return blog
  })
  return { blogList, count }
}
module.exports = {
  createBlog,
  findAllFollwersBlogs
}