
<template>
  <!-- // 下方播放操作 -->
  <div class="option-container" @click="showPalyPage">
    <span class="current-song_img" />
    <div class="current-song_name">
      <p>name</p>
      <p>lyric</p>
    </div>
    <span
      class="iconfont option-start "
      :class="[optionIcon]"
      @click.stop="handleOption"
    />

    <span class="iconfont option-list icon-menu" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      playCode: 1
    }
  },
  computed: {
    optionIcon() {
      const { playCode } = this
      return playCode === 0 ? 'icon-zanting' : 'icon-bofang'
    }
  },
  watch: {},
  created() {},
  methods: {
    /**
     * 展示播放界面
     *
     * */
    showPalyPage() {
      console.log('show detail play page')
    },
    /**
     * 点击播放按钮回掉
     *
    */
    handleOption() {
      const { playCode } = this
      this.playCode = playCode === 0 ? 1 : 0
    }
  }
}
</script>
<style lang='scss' scoped>
.option-container {
  display: flex;
  align-items: center;
  height: 8vh;
}

.current-song_img {
  background: red;
  display: inline-block;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  margin: 0 4px;
}

.current-song_name {
  flex: 1;
}

.option-start, .option-list{
  display: inline-block;
  width: 9vw;
  height: 9vw;
  line-height: 9vw;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #dedede;
  margin: 0 4px;
  cursor: pointer;
}
</style>
