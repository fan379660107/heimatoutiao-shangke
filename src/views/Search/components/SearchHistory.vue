<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <div @click="isShowDelete = !isShowDelete">
          <div v-if="isShowDelete">
            <span @click="removeHistory">全部删除</span> <span>完成</span>
          </div>
          <i v-else class="iconfont icon-shanchu"></i>
        </div>
      </template>
    </van-cell>
    <van-cell
      @change="changeHistory"
      v-for="item in list"
      :key="item"
      :title="item"
      @click="clickFn(item)"
    >
      <template #default>
        <van-icon v-if="isShowDelete" name="close" @click="delHistorys(item)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { gethistory, delHistory, setHistory } from '@/api/search'
export default {
  data() {
    return {
      isShowDelete: false,
      list: gethistory() || []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  created() {
    this.changeHistory()
  },
  methods: {
    delHistorys(item) {
      this.list = this.list.filter((ele) => ele !== item)
      setHistory(this.list)
    },
    removeHistory() {
      delHistory()
      this.list = []
    },
    changeHistory() {
      const res = gethistory()
      this.list = res
    },
    clickFn(item) {
      this.$parent.keywords = item
    }
  }
}
</script>

<style></style>
