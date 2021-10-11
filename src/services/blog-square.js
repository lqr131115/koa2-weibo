/**
 * @description 微博-广场 service
 * @author lqr
 */

const { Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 获取博客
 * @param {number} pageIndex 当前页码
 * @param {number} pageSize 每页微博条数
 */
const { PAGE_SIZE } = require('../config/constant')

const findBlogs = async ({ pageIndex = 0, pageSize = PAGE_SIZE }) => {
  const { count, rows } = await Blog.findAndCountAll({
    offset: pageIndex * pageSize,
    limit: pageSize,
    order: [
      ['id', 'desc']
    ],
    include: {
      model: User,
      attributes: ['userName', 'nickName', 'picture'],
    }
  }
  )
  let blogList = rows.map(blog => blog.dataValues)
  blogList = blogList.map(blog => {
    const user = blog.user.dataValues
    blog.user = formatUser(user)
    return formatBlog(blog)
  })
  return { blogList, count }
}

module.exports = {
  findBlogs
}