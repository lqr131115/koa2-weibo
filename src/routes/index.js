
const router = require('koa-router')()
const { loginRediret } = require('../middlewares/loginChecks')

router.get('/', loginRediret, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
module.exports = router
