import http from '../utils/http'
export default {
    // 轮播图
    getBanner: params => http.get(`/banner`, params),
    // 推荐歌单
    getRecommendResource: params => http.get(`/recommend/resource?time=${Date.now()}`, params),
    // 推荐歌曲
    getRecommendSongs: params => http.get(`/recommend/songs`, params),
    // 歌单详情
    getPlayListDetail: params => http.get(`/playlist/detail`, params),
}