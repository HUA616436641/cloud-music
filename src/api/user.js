import http from '../utils/http'
let baseUrl = 'http://localhost:3000'
export default {
    login: params => http.get(`${baseUrl}/login/cellphone`, params)
}