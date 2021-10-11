const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const path = require('path')

const { isPro } = require('./utils/env')
const { REDIS_CONFIG } = require('./config/db')
const { SESSION_SECRET_KEY } = require('./config/secretKeys')

const profileApiRouter = require('./routes/api/blog-profile')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const blogViewRouter = require('./routes/view/blog')
const blogApiRouter = require('./routes/api/blog')
const errorViewRouter = require('./routes/view/error')
const utilsApiRouter = require('./routes/api/utils')

// error handler
let onErrorConfig = {}
// 线上环境重定向到错误界,开发环境显示错误即可 
isPro && (onErrorConfig = { redirect: '/error' })
onerror(app, onErrorConfig)

// middlewares
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())

// 将public,uploadFiles设置成静态资源目录
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', { extension: 'ejs' }))

// session配置
app.keys = [SESSION_SECRET_KEY] // 对cookie中weibo.sid的值加密
app.use(session({
  key: 'weibo.sid', // cookie name
  prefix: 'weibo:sess:', // redis key的前缀
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}))
// routes
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(blogApiRouter.routes(), blogApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
// 404  路由必须放在最后
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app