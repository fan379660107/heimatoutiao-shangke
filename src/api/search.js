import request from '@/utils/request'
/**
 *获取联想建议
 * @param {String} q 关键词
 * @returns promise
 */

export const getSearchSuggestion = (q) =>
  request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
