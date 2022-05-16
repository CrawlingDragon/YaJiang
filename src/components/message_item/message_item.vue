<template>
  <!-- 资讯相关item -->
  <div class="Message_item-container">
    <div class="left">
      <div class="t f22 l-h">{{ list.title }}</div>
      <div class="time f18">
        <span v-show="index">{{ list.mpublic_name }}</span> {{ list.inputtime }}
      </div>
    </div>
    <van-image
      class="img"
      :src="list.thumb"
      radius="8px"
      fit="cover"
      v-if="list?.thumb != ''"
    ></van-image>
  </div>
</template>
<script>
export default {
  name: 'Message_item',
  components: {},
  props: {
    list: {
      type: Object,
      default: function () {
        return {};
      },
    },
    index: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    // goToMessageDetail(image) {
    //   //轮播图去资讯详情页
    //   this.$router.push({
    //     path: "/message_detail",
    //     query: { id: image.id, catid: image.catid },
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .Message_item-container {
    .t {
      margin-bottom: 53px;
    }
  }
}
.Message_item-container {
  padding: 15px 0;
  padding-right: 12px;
  margin-left: 12px;
  display: flex;
  .left {
    flex: 1;
    min-width: 0;
    .t {
      font-size: 14px;
      color: #333333;
      line-height: 1.2;
      margin-bottom: 25px;
    }
    .time {
      font-size: 12px;
      color: $f-color-three;
      span {
        float: left;
        margin-right: 15px;
      }
    }
  }
  .img {
    width: 121px;
    height: 75px;
    border-radius: 8px;
    border-radius: 8px;
    margin-left: 20px;
  }
}
</style>
