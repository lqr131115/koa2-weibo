/**
 * @description @ 用户关系 services
 * @author  lqr
 */

const { PAGE_SIZE } = require('../config/constant')
const { AtRelation, Blog, User } = require('../db/model')
const { formatBlog, formatUser } = require('./_format')

/**
 * 根据用户id 获取@ 自己的微博数量
 * @param {number} userId 用户 id
 */
const findAtMeBlogsCountByUserId = async (userId) => {
  const { count } = await AtRelation.findAndCountAll({
    where: {
      userId
    }
  })
  return { count }
}

/**
 * 根据用户id 获取@ 我的微博
 * @param {number} userId 用户 id
 */
const findAtMeBlogs = async (userId, pageIndex = 0, pageSize = PAGE_SIZE) => {
  const { rows, count } = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  let blogList = rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blog => {
    let user = blog.user
    user = user.dataValues
    blog.user = user
    return blog
  })
  return { blogList, count }
}

module.exports = {
  findAtMeBlogsCountByUserId,
  findAtMeBlogs
}