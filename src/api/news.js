import request from '@/utils/request'
/**
 * 获取文章新闻推荐
 * @param {*} channelId  id
 * @param {*} timestamp 时间戳+new Date()
 * @returns
 */
export const getArticleList = (channelId, timestamp) =>
  request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })

export const getNwsList = (articleId) =>
  request({
    url: `/v1_0/articles/${articleId}`
  })

/**
 *收藏文章
 * @param {integer} data 收藏的目标文章id
 * @returns promise
 */
export const CollectionArticles = (data) =>
  request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data
  })

/**
 *取消收藏文章
 * @param {*} target 取消收藏的文章的id
 * @returns   promise
 */
export const DelCollectionArticles = (target) =>
  request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })

/**
 *对文章点赞
 * @param {integer} target 点赞的文章id
 * @returns promise
 */
export const giveLike = (target) =>
  request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
/**
 * 取消对文章点赞
 * @param {*} target 要取消的文章id
 * @returns promise
 */
export const delGiveLike = (target) =>
  request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
