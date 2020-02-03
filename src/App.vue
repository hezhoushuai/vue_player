<template>
  <div id="root">
    <router-view />
  </div>
</template>

<script>
import { foundPageMenu } from '@/components/h-found/data'
export default {
  data() {
    return {
      data: foundPageMenu
    }
  }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Lato);
@import url(http://at.alicdn.com/t/font_1625155_uru4c7oj9nb.css);

html,
body {
  height: 100%;
}

#root {
  height: 100%;
  width: 100%;
}

.hide-scroll::-webkit-scrollbar{
  width: 0;
}

</style>
