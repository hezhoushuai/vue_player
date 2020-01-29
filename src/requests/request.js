import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/'
const ajax = axios.create({
  baseURL,
  timeout: 5000
})
// ajax拦截器
ajax.interceptors.request.use(config => {
  return config
})

// 数据响应时拦截
ajax.interceptors.response.use(resp => {
  const { data, status } = resp
  // 关闭loading
  if (status === 200) {
    return data
  }

  this.$alert('网络链接出错了...', '出错啦', {
    confirmButtonText: '确定'
  })
  return resp
})

export default ajax
