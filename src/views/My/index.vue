<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <div v-if="isLogin" class="user-info banner">
        <van-row></van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <!-- 头像 -->
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                fit="cover"
                :src="userInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round>
                编辑资料
              </van-button>
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div v-else class="login-register banner">
        <div class="warp" @click="goLogin">
          <img src="~@/assets/images/mobile.png" alt="" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <van-grid column-num="2" class="grid" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="iconfont icon-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="iconfont icon-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>

      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 底部退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user']),
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否退出该账号？'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    goLogin() {
      this.$router.push('/login')
    },
    async loadUserInfo() {
      try {
        const {
          data: { data }
        } = await getUserInfo()
        this.userInfo = data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}

.banner {
  width: 100%;
  height: 200px;
  background: url('~@/assets/images/banner.png') no-repeat 0 0 / cover;
}
//用户信息的样式
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
//主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .iconfont {
      font-size: 0.6rem;
      &.icon-lishi {
        color: #ffb31d;
      }
      &.icon-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin: 5px 0;
  }
}
.login-btn {
  :deep(.van-button__text) {
    color: red;
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      margin-bottom: 5px;
      width: 63px;
      height: 63px;
    }
    span {
      font-size: 0.37333rem;
    }
  }
}
</style>
