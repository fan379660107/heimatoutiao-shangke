<template>
  <div>
    <!-- 头部 -->
    <header>
      <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    </header>
    <!-- 更新头像 -->
    <div>
      <input type="file" ref="file" hidden accept=".png,.jpg" />
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image
          width="25"
          height="25"
          round
          :src="!!imgUrl ? imgUrl : userInfo.photo"
        />
      </van-cell>
      <!-- 弹出层 -->
      <van-popup v-model="showUpdatePortrait" :style="{ height: '100%' }">
        <updatePortrait
          v-if="showUpdatePortrait"
          :photo="photo"
          @close="showUpdatePortrait = false"
          @updateImgurl="updateImgurlFn"
        ></updatePortrait>
      </van-popup>
    </div>
    <!-- 更新头像 -->
    <!-- 更新昵称 -->
    <div>
      <van-cell title="昵称" is-link v-model="list.name" @click="showPopup" />
      <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
        <van-nav-bar
          title="更新昵称"
          left-text="取消"
          right-text="保存"
          @click-left.stop="cancelFn"
          @click-right.stop="saveFn"
        />
        <!-- 文本框 -->
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-popup>
    </div>
    <!-- 更新昵称 -->
    <!-- 更新性别 -->
    <van-cell
      title="性别"
      is-link
      v-model="gender"
      @click="showPicker = true"
      clickable
      readonly
    />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        title="更新性别"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 更新性别 -->
    <!-- 出生年月 -->
    <van-cell title="生日" is-link v-model="birthday" @click="borndayFn" />
    <van-popup v-model="bornday" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        type="date"
        title="选择年月日"
        @cancel="bornday = false"
        @confirm="confirmFn"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

    <!-- 出生年月 -->
  </div>
</template>

<script>
import updatePortrait from './components/updatePortrait.vue'
import { getUserInfo, EditUserProfile, userProfile } from '@/api/user'
import dayjs from '@/utils/dayjs'
export default {
  data() {
    return {
      showUpdatePortrait: false, // 头像弹出层
      show: false, // 昵称弹出层
      photo: '', // 头像
      message: '', // 昵称
      imgUrl: '', // 头像
      userInfo: {}, // 头像
      value: '', // 性别
      showPicker: false, // 性别
      columns: ['男', '女'], // 性别
      minDate: new Date(1900, 0, 1), // 出生年月
      maxDate: new Date(), // 出生年月
      bornday: false, // 出生年月弹层变量
      list: {}, // 个人资料
      birthday: '' // 出生年月
    }
  },
  created() {
    this.loadUserInfo()
    this.userProfile()
  },
  mounted() {
    this.$refs.file.addEventListener('change', (e) => {
      // e.target 触发事件的元素
      // 图片的src 能识别 -图片相对/绝对路径
      // -base64 DateUrl
      // -file,blob对象的url
      const file = e.target.files[0]
      // 方法一
      // file = URL.createObjectURL(file) // 将file对象转换成图片可识别的url
      // 方法二
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.showUpdatePortrait = true
        // 同一张图片，change事件不会触发
        this.$refs.file.value = ''
      }
    })
  },
  methods: {
    // 个人资料页面回退到我的页面
    onClickLeft() {
      this.$router.go(-1)
    },
    // 开启弹窗
    showPopup() {
      this.show = true
    },
    // 更新昵称取消按钮
    cancelFn() {
      this.show = false
    },
    // 更新昵称保存按钮
    saveFn() {
      this.list.name = this.message
      this.EditUserProfile()
      this.show = false
    },
    // 更新头像
    updateImgurlFn(imgUrl) {
      this.showUpdatePortrait = false
      this.imgUrl = imgUrl
    },
    // 获取个人信息
    async loadUserInfo() {
      try {
        const {
          data: { data }
        } = await getUserInfo()
        this.userInfo = data
      } catch (error) {
        console.log(error)
      }
    },
    // 性别
    onConfirm(value) {
      this.gender = value
      this.nan = value === '男' ? 0 : 1
      this.EditUserProfile()
      this.showPicker = false
    },
    // 日期弹出层取消
    borndayFn() {
      this.bornday = true
    },
    // 日期完成事件
    confirmFn(value) {
      const res = dayjs(value).format('YYYY-MM-DD')
      // console.log(res)
      this.birthday = res
      this.EditUserProfile()
      this.bornday = false
    },
    // 编辑用户个人资料接口
    async EditUserProfile() {
      try {
        await EditUserProfile(this.list.name, this.nan, this.birthday)
        // console.log(data)
      } catch (error) {
        this.$toast.fail('失败')
      }
    },
    // 获取用户个人资料
    async userProfile() {
      const { data } = await userProfile()
      // console.log(data.data)
      this.list = data.data
      this.birthday = data.data.birthday
    }
  },
  computed: {
    gender() {
      return this.list.gender ? '男' : '女'
    }
  },
  components: {
    updatePortrait
  }
}
</script>

<style scoped lang="less">
header {
  :deep(.van-nav-bar__content) {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon-arrow-left {
      color: #fff;
    }
  }
}
.van-popup--center {
  height: 100%;
  z-index: 2002;
  background-color: #333;
}
</style>
