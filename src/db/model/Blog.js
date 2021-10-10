/**
 * @description blog 模型数据
 * @author lqr
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../types')

// 同步时,表明会自动加's',即表明 blogs
const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '博客内容'
  },
  image: {
    type: STRING,
    comment: '博客图片'
  }
})

module.exports = Blog