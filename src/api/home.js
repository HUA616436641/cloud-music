import http from '../utils/http'
export default {
    getBanner: params => http.get(`/banner`, params)
}