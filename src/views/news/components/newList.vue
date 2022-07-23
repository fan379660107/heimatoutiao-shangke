<template>
  <div>
    <!-- 文章标题 -->
    <h1 class="article-title">{{ newList.title }}</h1>
    <!-- /文章标题 -->

    <!-- 用户信息 -->
    <van-cell class="user-info" center :border="false">
      <van-image
        class="avatar"
        slot="icon"
        round
        fit="cover"
        :src="newList.aut_photo"
      />
      <div slot="title" class="user-name">{{ newList.aut_name }}</div>
      <div slot="label" class="publish-date">{{ articleDesc }}</div>
      <van-button
        class="follow-btn1"
        type="info"
        round
        size="small"
        @click="quxiaoconcernUser"
        v-if="newList.is_followed"
        :loading="loading"
        >已关注</van-button
      >
      <van-button
        class="follow-btn"
        type="info"
        color="#3296fa"
        round
        size="small"
        icon="plus"
        @click="concernUser"
        v-else
        :loading="loading"
        >关注</van-button
      >
    </van-cell>
    <!-- /用户信息 -->

    <!-- 主体内容 -->
    <article class="markdown-body" v-html="newList.content"></article>
  </div>
</template>

<script>
import { getNwsList } from '@/api/news'
import { getUserFollowings, cancelNewsFollowings } from '@/api/user'
import dayjs from '@/utils/dayjs'
import '../../../../node_modules/github-markdown-css/github-markdown.css'

export default {
  data() {
    return {
      loading: false,
      newList: [],
      target: {}
    }
  },
  created() {
    this.getNwsList()
  },
  methods: {
    async getNwsList() {
      const { data } = await getNwsList(this.$route.query.id)
      // console.log(data.data)
      const news = data.data
      this.$store.commit('setNews', news)
      this.newList = data.data
    },
    // 关注用户
    async concernUser() {
      this.loading = true
      await getUserFollowings(this.newList.aut_id)
      // console.log(this.newList.is_followed)
      this.loading = false
      this.getNwsList()
    },
    // 取消关注
    async quxiaoconcernUser() {
      this.loading = true
      await cancelNewsFollowings(this.newList.aut_id)
      // console.log(this.newList.is_followed)
      this.loading = false
      this.getNwsList()
    }
  },
  computed: {
    articleDesc() {
      return dayjs(this.newList.pubdate).fromNow()
    }
  }
}
</script>

<style scpoed lang="less">
// h1标题样式
.article-title {
  font-size: 20px;
  padding: 25px 16px;
  margin: 0;
  color: #3a3a3a;
  margin-top: 50px;
}
//头部用户信息样式
.user-info {
  padding: 0 16px;
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8.5px;
  }
  .van-cell__label {
    margin-top: 0;
  }
  .user-name {
    font-size: 12px;
    color: #3a3a3a;
  }
  .publish-date {
    font-size: 11.5px;
    color: #b7b7b7;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
  .follow-btn1 {
    background-color: #fff;
    width: 85px;
    height: 29px;
    color: #333;
    border: 1px solid #b7b7b7;
  }
}
//内容样式
article {
  padding: 0 16px 60px;
  p {
    font-size: 12px;
  }
}
</style>
