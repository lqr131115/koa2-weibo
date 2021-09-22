/**
 * @description user 模型数据
 * @author lqr
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// 同步时,表明会自动加's',即表明 users
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码 需加密'
  },
  nickName: {
    type: STRING,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '性别 (1男 2女 3保密)',
    defaultValue: 3
  },
  picture: {
    type: STRING,
    comment: '头像'
  },
  city:{
    type:STRING,
    comment:'城市'
  }
})

module.exports = User