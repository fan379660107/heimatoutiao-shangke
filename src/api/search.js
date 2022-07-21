import request from '@/utils/request'
import storage from '@/utils/storage'
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

export const getSearchResult = (q, page, perPage) =>
  request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_page: perPage
    }
  })

// 搜索历史
const HISTORY = 'HISTORY_VALUE'

export const gethistory = () => storage.get(HISTORY)
export const setHistory = (history) => storage.set(HISTORY, history)
export const delHistory = () => storage.remove(HISTORY)
