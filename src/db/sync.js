const seq = require('./seq')

// 连接测试
seq.authenticate().then(() => {
  console.log('connect success')
}).catch((err) => {
  console.log('connect failed', err)
})


// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('sync success')
  process.exit()
})

