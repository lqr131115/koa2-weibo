/**
 * @description blog view router
 * @author lqr
 */


const router = require('koa-router')()
const { getBlogList } = require('../../controller/blog-profile')
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index')
})
module.exports = router