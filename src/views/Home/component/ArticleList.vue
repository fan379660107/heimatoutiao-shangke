<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="isfinished"
        finished-text="没有更多了~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
          @click.native="newListClick(item.art_id)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/news'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isfinished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        // console.log(data)
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取失败，请刷新后重试')
        }
      }
    },
    async loadNextPage() {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.isfinished = true
        }
        // console.log(data)
        // 将第n页的数据放进去
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    },
    newListClick(id) {
      // console.log(111)
      this.$router.push({
        path: '/news',
        query: {
          id: id
        }
      })
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style></style>
