<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.com_id">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">
              {{ articleDesc(item.pubdate) }}
            </span>
            <van-button size="mini" type="default" @click="showPopup(item)">
              回复{{ item.reply_count }}
            </van-button>
            <van-popup
              v-model="show"
              position="bottom"
              :style="{ height: '100%' }"
            >
              <!-- div弹窗内模板 -->
              <div class="internal">
                <van-nav-bar
                  title="暂无回复"
                  left-text="返回"
                  left-arrow
                  @click-left="onClickLeft"
                />
                <van-list
                  :finished="internalFinished"
                  finished-text="没有更多了"
                >
                  <!-- 弹窗列表循环 -->
                  <van-cell title="item">
                    <van-image
                      slot="icon"
                      round
                      width="30"
                      height="30"
                      style="margin-right: 10px"
                      :src="listOne.aut_photo"
                    />
                    <span style="color: #466b9d" slot="title">{{
                      listOne.aut_name
                    }}</span>
                    <div slot="label">
                      <p style="color: #363636">{{ listOne.content }}</p>
                      <p>
                        <span style="margin-right: 10px">
                          {{ articleDesc(listOne.pubdate) }}
                        </span>
                        <van-button
                          size="mini"
                          type="default"
                          @click="showPopupTwo"
                        >
                          回复
                        </van-button>
                        <!-- 内部回复弹层 -->
                        <van-popup
                          v-model="showTwo"
                          position="bottom"
                          :style="{ height: '18%' }"
                        >
                          <van-field
                            v-model="message"
                            rows="2"
                            autosize
                            type="textarea"
                            maxlength="50"
                            placeholder="请输入留言"
                            show-word-limit
                          >
                          </van-field>
                          <span @click="replyComments">发布</span>
                        </van-popup>
                        <!-- 内部回复弹层 -->
                      </p>
                    </div>
                    <van-icon name="good-job-o" />
                    <span>赞</span>
                  </van-cell>
                  <div class="ReplyAll">全部回复</div>
                  <!-- 回复里面评论的循环列表 -->
                  <van-cell v-for="e in listTwo" :key="e.com_id">
                    <van-image
                      slot="icon"
                      round
                      width="30"
                      height="30"
                      style="margin-right: 10px"
                      :src="e.aut_photo"
                    />
                    <span style="color: #466b9d" slot="title">{{
                      e.aut_name
                    }}</span>
                    <div slot="label">
                      <p style="color: #363636">{{ e.content }}</p>
                      <p>
                        <span style="margin-right: 10px">
                          {{ articleDesc(e.pubdate) }}
                        </span>
                        <van-button size="mini" type="default">
                          回复
                        </van-button>
                        <!-- 内部回复弹层 -->
                        <van-popup
                          v-model="showTwo"
                          position="bottom"
                          :style="{ height: '18%' }"
                        >
                          <van-field
                            v-model="message"
                            rows="2"
                            autosize
                            type="textarea"
                            maxlength="50"
                            placeholder="请输入留言"
                            show-word-limit
                          >
                          </van-field>
                          <span @click="replyComments">发布</span>
                        </van-popup>
                        <!-- 内部回复弹层 -->
                      </p>
                    </div>
                    <van-icon name="good-job" v-if="attitude" />
                    <van-icon name="good-job-o" v-else />
                    <span>赞</span>
                  </van-cell>
                  <!-- 回复里面评论的循环列表 -->
                </van-list>
              </div>
              <!-- div弹窗内模板 -->
            </van-popup>
          </p>
        </div>
        <van-icon name="good-job-o" />
        <span>赞</span>
      </van-cell>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getCommentsList, articlesOrComments } from '@/api/comments'
import dayjs from '@/utils/dayjs'
export default {
  name: 'ArticleComment',
  props: {},
  data() {
    return {
      message: '',
      show: false,
      showTwo: false,
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      internalFinished: true,
      listOne: [],
      listTwo: [],
      attitude: this.$store.state.news.attitude
    }
  },
  created() {
    this.getCommentsList()
  },
  methods: {
    // 回复评论的弹窗
    async showPopup(item) {
      this.show = true
      this.fn(item).then(() => this.getSonCommentsList())
    },
    fn(item) {
      return Promise.resolve((this.listOne = item))
    },
    showPopupTwo() {
      this.showTwo = true
    },
    onLoad() {
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (this.list.length >= 5) {
        this.finished = true
      }
    },
    // 评论或评论回复请求
    async getCommentsList() {
      const { data } = await getCommentsList({
        type: 'a',
        source: this.$store.state.news.art_id,
        limit: 99999
      })
      this.list = data.data.results
    },
    async getSonCommentsList() {
      const res = await getCommentsList({
        type: 'c',
        source: this.listOne.com_id
      })
      this.listTwo = res.data.data.results
    },
    // 关闭弹窗
    onClickLeft() {
      this.show = false
    },
    // 对评论进行回复 需要调用index中的评论回复接口
    async replyComments() {
      await articlesOrComments({
        target: this.listOne.com_id,
        content: this.message,
        art_id: this.$store.state.news.art_id
      })
      this.getSonCommentsList()
      this.showTwo = false
      this.message = ''
    }
  },
  computed: {
    articleDesc() {
      return (e) => dayjs(e).fromNow()
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
.internal {
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
  .van-popup {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .van-cell {
      background-color: #eee;
      width: 298px;
      height: 88px;
      :deep(.van-field__control) {
        width: 270px;
      }
    }
    span {
      display: inline-block;
      font-size: 15px;
      text-align: center;
      color: #6ba3d8;
    }
  }
  .ReplyAll {
    height: 45px;
    width: 100%;
    // background-color: hotpink;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 45px;
    border-bottom: 1px solid #f5f6f7;
    padding-left: 15px;
  }
}
</style>
