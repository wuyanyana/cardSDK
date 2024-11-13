import axios from 'axios'

const baseUrl = 'https://wx.10086.cn/website '
const config = {
  timeout: 50000,
  crossDomain: true
}
const service = axios.create(config)

// axios中的get请求--主地址baseUrl
export function fetchGetData (url, params) {
  params = params || {}
  params._t = new Date().getTime()
  return new Promise((resolve, reject) => {
    service.get(baseUrl + url, { params: params })
      .then(function (response) {
        return resolve(response.data)
      }).catch(error => {
        return reject(error)
      })
  })
};
