<template>
  <div class="header">
    <van-icon
      name="wap-nav"
      info="25"
      class="header-menu"
      @click="showMenu = !showMenu"
    />
    <van-popup v-model="showMenu" position="left" :style="{ width: '80%', height: '100%' }">
      <div class="pop-menu_header">
        <img src="#">
        <span>穿越蛋蛋</span>
        <span>签到</span>
      </div>
    </van-popup>

    <div class="h-tabs">
      <span
        v-for="item in tabsData"
        :key="item.value"
        class="h-tabs_title"
        :class="{'current-tab': active === item.value}"
        @click="changeMenu(item.value)"
      >{{ item.title }}</span>
    </div>
    <van-icon
      name="search"
      class="header-search"
      @click="showSearch = true"
    />
    <van-popup
      v-model="showSearch"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <HomeSearch @closeSearch="showSearch = false" />
    </van-popup>
  </div>

</template>

<script>
import HomeSearch from './HomeSearch'

export default {
  components: {
    HomeSearch
  },
  data() {
    return {
      showSearch: false,
      showMenu: false,
      tabsData: [{
        title: '我的',
        value: 'mine'
      }, {
        title: '发现',
        value: 'found'
      }, {
        title: '云村',
        value: 'cloud'
      }, {
        title: '视频',
        value: 'video'
      }],
      active: 'found'
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  methods: {
    changeMenu(value) {
      this.active = value
      this.$emit('menuChange', value)
    }
  }
}
</script>
<style lang='scss' scoped>
  .header{
    display: flex;
    height: 10vh;
    background: #f00;
    align-items: center;

    .header-menu{
      font-size: 24px;
      padding-left: 10px;
    }

    .h-tabs{
      flex: 1;
      display: flex;
      align-items: center;

      .h-tabs_title{
        flex: 1;
        text-align: center;
      }

      .current-tab{
        font-weight: bold;
        font-size: 24px;
      }
    }

    .header-search{
      font-size: 18px;
      padding: 10px;
    }
  }
</style>
