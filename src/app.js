const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { isPro } = require('./utils/env')
const index = require('./routes/index')
const errorViewRouter = require('./routes/view/error')

// error handler
let onErrorConfig = {}
// 线上环境重定向到错误界,开发环境显示错误即可 
isPro && (onErrorConfig = {redirect: '/error'})
onerror(app, onErrorConfig)

// middlewares
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', { extension: 'ejs' }))

// routes
app.use(index.routes(), index.allowedMethods())
// 404  路由必须放在最后
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app