<template>
  <div class="home hide-scroll">
    <HomeHeader ref="h-head" class="header-box" @menuChange="headerMenuChange" />
    <div class="container">
      <component :is="'h-' + active" />
    </div>
    <optionBox class="option-box" />
  </div>
</template>

<script>
import HomeHeader from './components/HomeHeader'
import registerComponents from './register'
import optionBox from '@/components/h-option'

export default {
  components: {
    HomeHeader,
    optionBox,
    ...registerComponents
  },
  data() {
    return {
      active: 'found'
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 顶部菜单发生改变的回掉
    headerMenuChange(value) {
      this.active = value
      console.log('headerMenuChange', value)
    }
  }
}
</script>

<style lang='scss' scoped>
.home {
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 8vh;
  padding-top: 10vh;

  .header-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }

.container{
  flex: 1;
  background: #09f;
}

.option-box{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
}
</style>
