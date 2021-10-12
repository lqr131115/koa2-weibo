/**
 * @description 数据模型集合
 * @author lqr
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'follwerId'
})

User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation,{
  foreignKey:'userId',
  targetKey:'follwerId'
})

module.exports = { User, Blog, UserRelation }