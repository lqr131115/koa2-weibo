/**
 * @description 数据模型集合
 * @author lqr
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User,{
  foreignKey:'userId'
})

module.exports = { User,Blog }