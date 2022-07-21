<template>
  <div>
    <van-cell
      v-for="item in resultList"
      :key="item.art_id"
      :title="item.title"
    />
  </div>
</template>

<script>
import { getSearchResult, setHistory, gethistory } from '@/api/search'
export default {
  name: 'SearchResult',
  data() {
    return {
      resultList: []
    }
  },
  props: {
    isShowSearchResults: {
      type: Boolean,
      required: true
    },
    keywords: {
      type: String,
      required: true
    }
  },
  created() {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult() {
      const { data } = await getSearchResult(this.keywords, 2, 20)
      // console.log(data.data.results)
      const res = gethistory() || []
      res.push(this.keywords)
      const arr = Array.from(new Set(res))
      setHistory(arr)
      // console.log(this.keywords)
      this.resultList = data.data.results
    }
  }
}
</script>

<style></style>
