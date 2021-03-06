/**
 * @description user api router
 * @author lqr
 */

const router = require('koa-router')()
router.prefix('/api/user')

const { isExist, register, login, changeInfo, changePassword, logout } = require('../../controller/user')
const { loginCheck } = require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validator')
const { userValidate } = require('../../validator/user')
const { getFollwersList } = require('../../controller/user-relation')

// 用户是否已经存在 
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 用户注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender })
})

// 用户登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 用户信息修改
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

// 用户密码修改
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  ctx.body = await changePassword({ userName, password, newPassword })
})

// 用户退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})

// 获取关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
  const { id } = ctx.session.userInfo
  const result = await getFollwersList(id)
  let { userList } = result.data
  const list = userList.map(user => `${user.nickName}-${user.userName}`)
  ctx.body = list
})
module.exports = router