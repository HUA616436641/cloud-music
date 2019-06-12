import http from "../utils/http"

export default {
  login: params => http.get(`/login/cellphone`, params),
  upload: params => {
    // let formData = new FormData()
    let config = {
      headers: { "Content-Type": "multipart/form-data" }
    }
    // for (let i in params) {
    //   formData.append(i, params[i])
    // }
    return http.post(`/upload`, params, config)
  }
}
