/**
 * @description blog view router
 * @author lqr
 */


const router = require('koa-router')()
const { getBlogList: getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogList: getSquareBlogList } = require('../../controller/blog-square')
const { getFansList, getFollwersList } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')
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

  // 当前主页用用户的用户名
  const { userName } = ctx.params

  // 登录的用户信息
  let myUserInfo = ctx.session.userInfo
  const { userName: myUserName } = myUserInfo

  // 是否是自己的个人空间
  const isMe = (userName === myUserName)

  let curUserInfo
  if (isMe) {
    curUserInfo = myUserInfo
  } else {
    const result = await isExist(userName)
    if (result.errno !== 0) {
      return
    }
    curUserInfo = result.data
  }

  const { id: curUserId, userName: curUserName } = curUserInfo

  // 微博列表数据
  const result = await getProfileBlogList(curUserName)
  const { count, blogList, pageIndex, pageSize, isEmpty } = result.data   // result 是 SuccessModel 类的实例

  // 粉丝列表
  const { data: fansData } = await getFansList(curUserId)

  // 关注列表
  const { data: followersData } = await getFollwersList(curUserId)

  // 是否被自己关注
  const amIFollowed = fansData.userList.some(fan => fan.userName === myUserName)

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
      amIFollowed,
      atCount: 0,
      fansData: {
        count: fansData.count,
        list: fansData.userList,
      },
      followersData: {
        count: followersData.count,
        list: followersData.userList
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