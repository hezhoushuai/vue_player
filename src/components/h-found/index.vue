<template>
  <div class="found">
    <!-- 顶部轮播图 -->
    <div class="swiper-container">
      <van-swipe class="my-swiper" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerImage" :key="index">
          <img v-lazy="image.pic">
          <span
            class="image-text"
            :style="{backgroundColor: image.titleColor}"
          >{{ image.typeTitle }}</span>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 切换菜单 -->
    <div class="menu-container">
      <div
        v-for="item in foundPageMenu"
        :key="item.value"
        class="menu-item"
        @click="handleMenuClick(item.value)"
      >
        <div class="menu-item_container">
          <i class="iconfont menu-item_img" :class="item.img" />
        </div>
        <span class="menu-item_text">{{ item.text }}</span>
      </div>
    </div>

    <!-- 推荐歌单 -->
    <div class="put-song found-container">
      <div class="put-song_title found-title">推荐歌单</div>
      <div class="put-song-title_desc">
        <span class="title-desc">为你精挑细选</span>
        <span class="see-more">查看更多</span>
      </div>
      <div class="hide-scroll" style="width: 100%;overflow: auto;">
        <ul class="put-song_container">
          <router-link
            v-for="item in songList"
            :key="item.id"
            tag="li"
            :to="`/put/${item.id}`"
            class="put-song_item"
          >
            <div
              class="put-song_img"
              :style="{
                backgroundImage: `url(${item.picUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }"
            >
              <span class="iconfont icon-bofang">{{ Math.ceil(item.playCount / 10000) }}万</span>
            </div>
            <span class="put-song_desc van-multi-ellipsis--l2">{{ item.name }}</span>
          </router-link>
        </ul>
      </div>
    </div>

    <PutStyle />
  </div>
</template>

<script>
import { foundPageMenu } from './data'
import PutStyle from './components/PutStyle'

export default {
  components: {
    PutStyle
  },
  data() {
    return {
      songList: [], // 每日推荐
      bannerImage: [], // 轮播图数据
      foundPageMenu
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getBannerData()
    this.getSongList()
  },
  methods: {
    /*
     * 获取每日推荐
     */
    getSongList() {
      this.$http.getSongList(7).then(resp => {
        const { result } = resp
        this.songList = result || []
        console.log(result)
      })
    },
    /*
     * 点击菜单的回掉
     */
    handleMenuClick(val) {
      console.log(val)
    },
    getBannerData() {
      this.$http.getBanner(1).then(resp => {
        const { banners } = resp
        this.bannerImage = banners || []
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.found {
  padding: percentage(2 / 100);
}

.swiper-container {
  margin-bottom: 12px;
}

.menu-item_img{
  color: #fff;
  font-size: 28px;
}

.found .swiper-container /deep/ .my-swiper {
  width: 100%;
  height: 0;
  padding-top: percentage(146 / 375);
  position: relative;
  border-radius: 4px;

  .van-swipe__track {
    position: absolute;
    top: 0;
    left: 0;

    img {
      width: 100%;
    }

    .image-text {
      position: absolute;
      bottom: 0;
      right: 0;
      color: #fff;
      display: inline-block;
      padding: 4px;
      border-top-left-radius: 4px;
    }
  }
}

.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &_container {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: red;
      margin-bottom: 4px;
      text-align: center;
      line-height: 55px;
    }

    &_img {
      width: 100%;
    }
  }
}

.put-song_container {
  overflow-y: hidden;
  display: flex;
  width: 216vw;
  justify-content: space-between;

  .put-song_item {
    position: relative;
    width: 28vw;
    height: 28vw;
    padding-bottom: 44px;

    .put-song_img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 4px;

      > span {
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        font-size: 14px;

        &::before{
          margin-right: 1px;
        }
      }
    }

    .put-song_desc {
      position: absolute;
      bottom: 0;
      letter-spacing: -1px;
      line-height: 20px;
    }
  }

}

</style>

<style>
.put-song-title_desc{
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 4px 0;
  }

.found-title{
  color: #383838;
}

.found-container{
  margin: 1vh 0;
}

.see-more{
  display: inline-block;
  border-radius: 24px;
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  border: 1px solid #dedede;
  color: #131313;
}

.title-desc{
  font-size: 24px;
  font-weight: bold;
}
</style>
