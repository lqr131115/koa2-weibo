/**
 * @description utils controller
 * @author lqr
 */

const fes = require('fs-extra')
const path =  require('path')
const { uploadFileSizeFailInfo } = require('../model/errorInfo')
const { ErrorModel, SuccessModel } = require('../model/ResModel')

const FILE_MAI_SIZE = 1024 * 1024 * 1024
const DIST_FOLDER_PATH = path.join(__dirname,'..','..','uploadFiles')
/**
 * 保存文件
 * @param {string} name 
 * @param {string} type 
 * @param {number} size 
 * @param {string} filePath 
 * @returns 
 */
const saveFile = async ({name,type,size,filePath}) => {
  if (size > FILE_MAI_SIZE) {
    await fes.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  
  // type ==> image/jpeg
  
  // 移动文件
  const fileName = Date.now() + '.' + name  // 防止文件重名
  const distFilePath = path.join(DIST_FOLDER_PATH,fileName) // 设置目的地
  await fes.move(filePath,distFilePath) // 移动
  
  // 返回信息
  return new SuccessModel({
    url:`/${fileName}`
  })
  
}

module.exports = {
  saveFile
}