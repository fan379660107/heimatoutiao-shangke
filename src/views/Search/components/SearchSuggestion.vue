<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="index"
      @click="clickFn"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    },
    isShowSearchResults: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion() {
      try {
        const { data } = await getSearchSuggestion(this.keywords)
        if (data.data.options.length === 0) {
          this.$toast.fail('暂无搜索建议')
        }
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    },
    clickFn() {
      this.$parent.isShowSearchResults = true
    }
  },
  computed: {
    highlightData() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((ele) =>
        ele.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 5px;
}
</style>
