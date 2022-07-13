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
