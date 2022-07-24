<template>
  <div>
    <header>
      <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
    </header>
    <!-- 文章内容 -->
    <newList></newList>
    <!-- 文章内容 -->
    <van-divider>正文结束</van-divider>
    <!-- 评论列表 -->
    <div class="box1">
      <articleComment ref="renzhihao"></articleComment>
    </div>
    <!-- 评论列表 -->
    <footer>
      <div class="footer-box">
        <van-button round class="footer-btn" @click="showPopup"
          >写评论</van-button
        >
        <van-popup v-model="show" position="bottom" :style="{ height: '18%' }">
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
          <span @click="PostComment">发布</span>
        </van-popup>
        <van-icon name="comment-o" :badge="badge" color="#777" />
        <div @click="collectionFn">
          <van-icon name="star" class="collection" v-if="isfollowed" />
          <van-icon name="star-o" v-else />
        </div>
        <div @click="likeFn">
          <van-icon name="good-job-o" class="like" v-if="attitude" />
          <van-icon name="good-job" v-else />
        </div>
        <van-icon
          name="share"
          color="#777777"
          @click="showShare = true"
        ></van-icon>
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
        />
      </div>
    </footer>
  </div>
</template>

<script>
import newList from './components/newList.vue'
import articleComment from './components/article-comment.vue'
import { articlesOrComments, getCommentsList } from '@/api/comments'
import {
  CollectionArticles,
  DelCollectionArticles,
  giveLike,
  delGiveLike
} from '@/api/news'
export default {
  name: 'news',
  data() {
    return {
      badge: 0,
      message: '',
      show: false,
      isfollowed: this.$store.state.news.is_followed,
      attitude: this.$store.state.news.attitude,
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onSelect(option) {
      this.$toast(option.name)
      this.showShare = false
    },
    showPopup() {
      this.show = true
    },
    async PostComment() {
      // console.log(111)
      // 评论回复接口
      await articlesOrComments({
        target: this.$store.state.news.art_id,
        content: this.message
      })
      this.$refs.renzhihao.getCommentsList()
      this.show = false
      this.message = ''
    },
    async getCommentsList() {
      const {
        data: { data }
      } = await getCommentsList({
        type: 'a',
        source: this.$store.state.news.art_id
      })
      // console.log(data)
      this.badge = data.total_count
    },
    async collectionFn() {
      try {
        if (!this.isfollowed) {
          await CollectionArticles({
            target: this.$store.state.news.art_id
          })
        } else {
          await DelCollectionArticles({
            target: this.$store.state.news.art_id
          })
        }
        this.isfollowed = !this.isfollowed
        this.$toast.success('操作成功')
      } catch {
        this.$toast.fail('收藏失败')
      }
    },
    async likeFn() {
      try {
        if (!this.attitude) {
          await giveLike(this.$store.state.news.art_id)
        } else {
          await delGiveLike(this.$store.state.news.art_id)
        }
        this.attitude = !this.attitude
        this.$toast.success('操作成功')
      } catch {
        this.$toast.fail('收藏失败')
      }
    }
  },
  created() {
    this.getCommentsList()
  },
  components: {
    newList,
    articleComment
  }
}
</script>

<style scoped lang="less">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  :deep(.van-nav-bar__content) {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
      .van-nav-bar__title {
        font-size: 0.42667rem;
      }
    }
    .van-icon-arrow-left {
      color: #fff;
    }
  }
}
footer {
  .footer-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #d8d8d8;
    width: 375px;
    height: 50px;
    background-color: #fff;
    // background-color: hotpink;
    .footer-btn {
      width: 140px;
      height: 23px;
      color: #bba7a7;
      // background-color: yellow;
    }
    .child {
      background: #f2f3f5;
      border-radius: 4px;
    }
    .van-cell {
      width: unset;
    }
    .van-icon-comment-o {
      font-size: 22px;
    }
    .van-icon-share {
      font-size: 22px;
    }
    .collection {
      color: #3296fa;
    }
    .like {
      color: hotpink;
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
    .van-share-sheet {
      display: unset;
    }
  }
}
.box1 {
  width: 100%;
  margin-bottom: 60px;
}
</style>
