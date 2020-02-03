<template>
  <div class="search-page">
    <div class="header-search">
      <van-icon
        name="arrow-left"
        class="header-btn header-btn_return"
        @click="$emit('closeSearch')"
      />
      <div class="search-box">
        <van-search
          v-model="searchVal "
          class="search"
          placeholder="请输入搜索关键词"
          @search="handleSearch"
          @input="inputChange"
        />
      </div>
      <van-icon name="contact" class="header-btn header-btn_singer" />
    </div>

    <!-- 搜索历史 -->
    <div class="search-history">
      <span class="search-history_title">历史记录</span>
      <div class="search-history_item">
        <span>草原下我迎芬芳</span>
      </div>
    </div>

    <!-- 热搜榜 -->
    <div class="hot-search">
      <span class="hot-search_title">热搜榜</span>
      <div v-for="index in 5" :key="index" class="hot-search_item">
        <span :class="{'hot-search_index': index <= 3}">{{ index }}</span>
        <div class="hot-search_container">
          <div class="hot-search_name">
            <span :class="{'hot-search_title': index <= 3}">love story</span>
            <span>3381617</span>
          </div>
          <div class="hot-search_desc van-ellipsis">很多人因为这首歌爱上了霍霍吧！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      searchVal: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 点击搜索的回掉
    handleSearch(val) {
      console.log(val)
    },
    // 输入发生改变时的回掉
    inputChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang='scss' scoped>
.header-search {
  display: flex;
  align-items: center;

  .header-btn {
    font-size: 18px;
  }

  .header-btn_singer {
    padding-right: 10px;
  }

  .search-box {
    flex: 1;
  }

  .search /deep/ .van-field__body {
    height: 100%;
  }
}
.search-history,
.hot-search {
  padding: 0 4px;
}

.search-history {
  &_title {
    font-size: 18px;
    font-weight: bold;
  }

  &_item {
    margin: 12px 0;

    > span {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      padding: 8px;
      background: #dedede;
      border-radius: 24px;
    }
  }
}

.hot-search {
  &_title {
    font-size: 18px;
    font-weight: bold;
  }

  &_item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;

    > span {
      font-size: 18px;
      display: inline-block;
      padding: 12px;
    }
  }

  .hot-search_index {
    color: #f00;
  }

  .hot-search_name{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .hot-search_title {
    font-weight: bold;
  }

  .hot-search_container {
    flex: 1;
  }
}
</style>
