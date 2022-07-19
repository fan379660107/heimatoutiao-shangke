<template>
  <div>
    <!-- 弹窗 -->
    <van-popup
      v-model="isShow"
      position="top"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popupMain">
        <div class="my-channel">
          <van-cell title="我的频道">
            <van-button
              size="mini"
              round
              class="edit-btn"
              @click="isEdit = !isEdit"
              >{{ isEdit ? '完成' : '编辑' }}</van-button
            >
          </van-cell>
          <!-- 我的频道 -->
          <van-grid :border="false" gutter="5px">
            <van-grid-item
              @click="onClickMyChannel(item, index)"
              v-for="(item, index) in myChannels"
              :key="item.id"
              :text="item.name"
              :class="{ 'active-channel': item.name === '推荐' }"
            >
              <template #icon>
                <van-icon
                  name="cross"
                  v-show="isEdit && item.name !== '推荐'"
                />
              </template>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 推荐频道 -->
        <div class="recommend-channel">
          <van-cell title="推荐频道"> </van-cell>
          <van-grid :border="false" gutter="5px">
            <van-grid-item
              v-for="item in recommendChannels"
              :key="item.id"
              :text="item.name"
              icon="plus"
              @click="addMyChannel(item)"
            ></van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'EditChannelPopup',
  data() {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  created() {
    this.getAllChannels()
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannels()
      //   console.log(data)
      this.allChannels = data.data.channels
    },
    onClickMyChannel(channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        return this.$emit('delMyChannel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    addMyChannel(mychannels) {
      this.$emit('add-mychannels', { ...mychannels })
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
//高亮频道
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupMain {
  padding-top: 50px;
  //按钮样式
  .edit-btn {
    color: red;
    padding: 0 15px;
    height: 24px;
    border: 0.02667rem solid red;
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  //   我的频道
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          // line-height: 0.32rem;
          z-index: 100;
        }
        .van-icon {
          font-size: 12px;
        }
      }
    }
  }
  //   推荐频道
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.25rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
