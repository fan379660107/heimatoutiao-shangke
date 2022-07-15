<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="backToProPage"
      class="navbar"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 手机号码/验证码 -->
    <van-form ref="form" @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        maxlength="11"
        placeholder="请输入手机号码"
        :rules="mobileRules"
      >
        <template #label>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <!-- 倒计时 -->
        <template #right-icon>
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            format="ss s"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            size="mini"
            round
            class="code-btn"
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- <h1>{{ $store.state.number }}</h1>
    <button @click="clickFn">点我加1</button> -->
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    backToProPage() {
      this.$router.back()
    },
    async login() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // console.log(res)
        // 使用vuex把token 存储起来
        this.$store.commit('setUser', res.data.data)
        // 跳转到我的页面
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // this.$toast.fail('登陆失败')
        const status = error.response.status
        let message = '请刷新后重试'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('请刷新后重试')
        //     break
        //   default:
        //     this.$toast.fail('请刷新后重试')
        //     break
        // }
      }
    },
    async sendCode() {
      try {
        await this.$refs.form.validate('mobile')
        // 发送验证码
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (error) {
        if (!error.response) this.$toast.fail('手机号格式不正确！')
        const status = error.response.status
        if (status === 404 || status === 429) {
          this.$toast.fail(error.response.data.message)
        }
      }
    }
    // clickFn() {
    //   console.log(this)
    //   this.$store.commit('setNumber', 1)
    // }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
// 表单样式
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .iconfont {
    font-size: 0.49333rem;
  }
  .code-btn {
    padding: 0 10px;
    background-color: #ededed;
    color: #666;
  }
}
.van-button--info {
  background-color: #6db4fb;
  border: none;
}
</style>
