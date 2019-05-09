import http from '../utils/http'
export default {
    getBanner: params => http.get(`/banner`, params),
    getRecommendResource: params => http.get(`/recommend/resource?time=${Date.now()}`, params),
    getRecommendSongs: params => http.get(`/recommend/songs`, params),
}