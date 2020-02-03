// 发现页面
import request from './request.js'

// 获取轮播图
export const getBanner = (type = 1) => request.get(`/banner?type=${type}`)

// 获取每日推荐歌单
export const getSongList = (num = 30) => request.get(`/personalized?limit=${num}`)
