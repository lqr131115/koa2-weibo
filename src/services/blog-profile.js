/**
 * @description 个人主页 service
 * @author lqr
 */

const { User, Blog } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 根据用户名获取博客
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页码
 * @param {number} pageSize 每页微博条数
 */
const findBlogsByUserName = async ({ userName, pageIndex = 0, pageSize = 10 }) => {
  const userWhereConditons = {}
  if (userName) {
    userWhereConditons.userName = userName
  }
  const { count, rows } = await Blog.findAndCountAll({
    offset: pageIndex * pageSize,
    limit: pageSize,
    order: [
      ['id', 'desc']
    ],
    include: {
      model: User,
      attributes: ['id', 'userName', 'nickName', 'picture'],
      where: userWhereConditons
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
  findBlogsByUserName
}