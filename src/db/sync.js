/**
 * @description mysql 数据库同步
 * @author lqr
 */

const seq = require('./seq')

// 数据模型
require('./model/index')

// 连接测试
seq.authenticate().then(() => {
  console.log('connect success')
}).catch((err) => {
  console.log('connect failed', err)
})

// 执行同步-一次同步所有模型
seq.sync({ force: true }).then(() => {
  process.exit()
})

