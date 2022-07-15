<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/video">
        <template #icon>
          <i class="iconfont icon-shipin"></i>
          <span class="text">视频</span>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="iconfont icon-wenda"></i>
          <span class="text">问答</span>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/profile">
        <template #icon>
          <i class="iconfont icon-wode"></i>
          <span class="text">我的</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  .iconfont {
    font-size: 0.53333rem;
  }
  .text {
    font-size: 0.32rem;
  }
}
</style>
