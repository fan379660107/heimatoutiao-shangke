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
