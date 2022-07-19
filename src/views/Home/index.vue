<template>
  <div>
    <!-- 头部导航 -->
    <!-- @click="$router.push('/search')" -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round router to="/search"
          ><van-icon name="search" />搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <!-- 更多按钮 -->
      <span class="iconfont icon-gengduo" @click="popupFn"></span>
    </van-tabs>
    <EditChannelPopup
      ref="popup"
      :myChannels="myChannels"
      @delMyChannel="delMyChannel"
      @change-active="changeActive"
      @add-mychannels="addMyChannels"
    ></EditChannelPopup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getMyChannels,
  getMyChannelsByLocal,
  setMyChannelsByLocal,
  delMyChannel,
  addMyChannel
} from '@/api/channel'
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from './component/EditChannelPopup.vue'
export default {
  data() {
    return {
      active: 0,
      myChannels: []
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  },
  created() {
    this.getChannels()
  },
  methods: {
    async getChannels() {
      try {
        if (!this.user.token) {
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            const { data } = await getMyChannels()
            this.myChannels = data.data.channels
          }
        } else {
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取用户频道')
      }
    },
    popupFn() {
      this.$refs.popup.isShow = true
    },
    async delMyChannel(id) {
      this.myChannels = this.myChannels.filter((ele) => ele.id !== id)
      if (!this.user.token) {
        setMyChannelsByLocal(this.myChannels)
      } else {
        try {
          await delMyChannel(id)
        } catch (error) {
          return this.$toast.fail('删除频道失败')
        }
      }
      this.$toast.success('删除频道成功')
    },
    async addMyChannels(channel) {
      this.myChannels.push(channel)
      if (!this.user.token) {
        setMyChannelsByLocal(this.myChannels)
      } else {
        try {
          await addMyChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    },
    changeActive(active) {
      this.active = active
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
// 头部导航
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 227.5px;
    height: 32px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 33px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 100px;
      height: 41px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 15.5px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 33px;
  height: 41px;
  font-size: 20px;
  line-height: 41px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 99;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 46px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 46px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 46px - 41px - 50px);
  overflow: auto;
}
</style>
