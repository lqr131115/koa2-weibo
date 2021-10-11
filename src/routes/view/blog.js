/**
 * @description blog view router
 * @author lqr
 */


const router = require('koa-router')()
const { getBlogList: getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogList: getSquareBlogList } = require('../../controller/blog-square')
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index')
})

// 重定向至个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

// 个人主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {

  // 被请求的用户
  const { userName } = ctx.params

  // 当前用户信息
  const curUserInfo = ctx.session.userInfo
  const { userName: curUserName } = curUserInfo
  const isMe = (userName === curUserName)

  // 微博列表数据
  const result = await getProfileBlogList(userName)
  const { count, blogList, pageIndex, pageSize, isEmpty } = result.data   // result 是 SuccessModel 类的实例

  // 粉丝列表
  // controller

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: 0,
        list: [],
      }
    }
  })
})


// 微博广场
router.get('/square', loginRedirect, async (ctx, next) => {

  // 获取微博列表数据
  const result = await getSquareBlogList(0)
  const { count, blogList, pageIndex, pageSize, isEmpty } = result.data   // result 是 SuccessModel 类的实例

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    }
  })
})

module.exports = router