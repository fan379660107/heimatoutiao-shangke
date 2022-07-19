import request from '@/utils/request'
import storage from '@/utils/storage'
export const getMyChannels = () =>
  request({
    url: '/v1_0/user/channels'
  })

export const getAllChannels = () =>
  request({
    url: '/v1_0/channels'
  })

/**
 *删除用户频道
 * @param {String|Number} target  删除用户频道的id
 * @returns
 */
export const delMyChannel = (target) =>
  request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
/**
 *添加我的频道
 * @param {*} id  id 频道的id
 * @param {*} seq  seq 添加频道的索引下标
 * @returns
 */
export const addMyChannel = (id, seq) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'

export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelsByLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
