import request from './request.js'

// 登录接口
export const startLogin = (userName, passWord) => request.get(`/login/cellphone?phone=${userName}&password=${passWord}`)

// 发送验证码接口
export const sendCaptcha = (phone) => request.get(`/captcha/sent?phone=${phone}`)

// 注册接口
export const register = ({ phone, password, captcha, nickname }) => request.get(`/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`)

// 验证手机号码是否被注册
export const checkPhoneNumber = phone => request.get(`/cellphone/existence/check?phone=${phone}`)
export const getHomeData = () => {
  return request.get('/search?keywords=海阔天空')
}
