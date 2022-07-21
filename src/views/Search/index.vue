<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToHome"
        @focus="visibleSearchSuggestion"
        background="#3692fa"
        class="search"
      />
    </form>
    <component
      :is="componentName"
      :keywords="keywords"
      :isShowSearchResults="isShowSearchResults"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      keywords: '',
      isShowSearchResults: false
    }
  },
  methods: {
    onSearch() {
      // console.log('111')
      this.isShowSearchResults = true
    },
    backToHome() {
      this.$router.go(-1)
    },
    visibleSearchSuggestion() {
      this.isShowSearchResults = false
    }
  },
  computed: {
    componentName() {
      if (this.keywords.trim() === '') {
        return SearchHistory
      }
      if (this.isShowSearchResults) {
        return SearchResult
      }
      return SearchSuggestion
    }
  }
}
</script>

<style scoped lang="less">
[role='button'] {
  color: #fff;
}
</style>
