const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login') // 登录页面
const Register = () => import('@/views/Register') // 注册页面

export default [{
  path: '/home',
  name: 'Home',
  components: {
    default: Home
  }
}, {
  path: '/login',
  name: 'Login',
  components: {
    default: Login
  }
}, {
  path: '/register',
  name: 'Register',
  components: {
    default: Register
  }
}]
