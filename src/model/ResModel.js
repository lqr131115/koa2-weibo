/**
 * @description 返回数据个格式类
 * @author lqr
 */


/**
 *  基础模型
 */
class BaseModel {
  constructor({ error, data, message }) {
    this.error = error
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}


/**
 * 成功返回数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      error: 0,
      data
    })
  }
}


/**
 * 未能成功返回数据模型
 */
class ErrorModel extends BaseModel {
  constructor({ error, message }) {
    super({ error, message })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}