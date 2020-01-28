const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')

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
}]
