import request from '@/utils/request'
/**
 *登录
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 * @returns
 */

export const login = (mobile, code) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */

export const sendCode = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`
  })
/**
 *获取个人信息
 * @returns
 */
export const getUserInfo = () =>
  request({
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
/**
 * 关注用户
 * @param {String} target 关注用户的id
 * @returns
 */
export const getUserFollowings = (target) =>
  request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
/**
 * 取消关注
 * @param {String} target 目标用户（被取消关注的用户id）
 * @returns
 */
export const cancelNewsFollowings = (target) =>
  request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
/**
 * 编辑用户照片资料（头像、身份证照片）
 * @param {file} file 头像
 * @returns promise
 */
export const updatePortrait = (file) =>
  request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: file
  })
/**
 * 编辑用户个人资料
 * @param {String} name 昵称
 * @param {String} gender 性别，0-男，1-女
 * @param {String} birthday 生日，格式'2018-12-20'
 * @returns promise
 */
export const EditUserProfile = (name, gender, birthday) =>
  request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      gender,
      birthday
    }
  })
/**
 * 获取用户个人资料
 * @returns promise
 */
export const userProfile = () =>
  request({
    url: '/v1_0/user/profile'
  })
