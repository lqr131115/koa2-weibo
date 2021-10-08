/**
 * @description user api router
 * @author lqr
 */

const router = require('koa-router')()
router.prefix('/api/user')

const { isExist, register } = require('../../controller/user')

router.post('/register', async (ctx, next) => {
  await ctx.render('register')
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender })
})

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router