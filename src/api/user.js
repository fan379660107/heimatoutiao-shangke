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
