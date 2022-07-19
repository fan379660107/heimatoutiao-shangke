<template>
  <!-- 无图片 -->
  <div>
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />
    <!-- 一张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <!-- 三张图片 -->
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      tyoe: Object,
      required: true
    }
  },
  computed: {
    articleDesc() {
      const art = this.articleInfo
      const time = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  }
}
</script>

<style></style>
