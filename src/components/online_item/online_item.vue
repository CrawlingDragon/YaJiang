<template>
  <!-- 首页网珍 -->
  <div class="recommend_online-container">
    <div class="top" @click="goToExpert(list.authorid)">
      <van-image round class="avator" :src="list.avatar" fit="cover"></van-image>
      <div class="name">
        {{ list.author }}
        <div class="time">{{ list.addtime }} <span v-show="list.area">·</span> {{ list.area }}</div>
      </div>
    </div>
    <!-- <div class="subsidy" v-if="list.isbenefit == 1"></div> -->
    <div class="subsidy" v-if="false"></div>
    <div class="text f20" @click="goToDetail">{{ list.title }}</div>
    <div class="img-list">
      <div
        class="item"
        v-for="(item, index) in list.pic_urls_tiny"
        :key="item"
        @click="preview(list.pic_urls, index)"
      >
        <van-image class="img" fit="cover" :src="item"></van-image>
      </div>
    </div>

    <div class="bottom" @click="goToDetail">
      <div class="left">
        <div class="icon icon1"></div>
        <div class="content">{{ list.name }}</div>
      </div>
      <div class="right">
        <div class="icon icon2"></div>
        <div class="content">回复 {{ list.replies }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { OnlineItemTs } from '@/views/index_online/onlineItem';
const router = useRouter();

//props
// interface Props {
//   authorid: string;
//   avatar: string;
//   author: string;
//   addtime: string;
//   area: string;
//   title: string;
//   pic_urls_tiny: string[];
//   name: string;
//   replies: string;
//   pic_urls: string[];
//   tid: string;
// }
const props = defineProps<{ list: OnlineItemTs }>();

//emits
// 获取点中图片所在的数组，和点中的索引
interface ImgObj {
  arr: string[];
  index: number;
}
const emits = defineEmits<{
  (e: 'preImage', obj: ImgObj): void;
}>();
function preview(arr: string[], index: number) {
  // 图片依赖,emit点击的图片数组，
  let obj = {
    arr: arr,
    index: index,
  };
  emits('preImage', obj);
}
function goToDetail() {
  // 路由：去网诊详情页
  router.push({
    path: '/ask_detail',
    query: { tid: props.list.tid },
  });
}

//路由：去专家的主页
function goToExpert(authorid: string) {
  router.push({
    path: '/expert',
    query: {
      id: authorid,
    },
  });
}
</script>
<style lang="scss" scoped>
.old {
  .recommend_online-container {
    padding: 25px 0;
    .top {
      display: none;
    }
    .bottom {
      display: none;
    }
    .text {
      color: $f-color;
    }
  }
}
.recommend_online-container {
  .text {
    color: $f-color;
  }
}
</style>
<style lang="stylus" scoped>
.recommend_online-container
  position relative
  .top
    padding-top 15px
    display flex
    align-items center
    .avator
      width 35px
      height 35px
      margin-right 15px
    .name
      flex 1
      color #343434
      font-size 15px
      line-height 20px
    .time
      width auto
      font-size 12px
      color #9A9A9A
      line-height 20px
  .subsidy
    position absolute
    right 13px
    top 20px
    width 15px
    height 15px
    background url('./55.png') no-repeat
    background-size cover
    background-position center center
  .text
    color $f-color
    font-size 14px
    line-height 22px
    margin 10px 0
    word-break break-all
    padding-right 12px
  .img-list
    font-size 0
    .item
      width 33.33%
      height 105px
      padding-right 12px
      display inline-block
      margin-bottom 12px
      .img
        width 100%
        height 100%
  .bottom
    padding-bottom 14px
    padding-top 12px
    display flex
    justify-content space-between
    align-items center
    font-size 12px
    color #9A9A9A
    padding-right 12px
    .left
      display flex
      align-items center
      .icon
        width 15px
        height 15px
        background red
        margin-right 10px
        background url('./50.png') no-repeat
        background-size cover
        background-position center
    .right
      display flex
      align-items center
      .icon
        width 15px
        height 15px
        background red
        margin-right 10px
        background url('./51.png') no-repeat
        background-size cover
        background-position center
</style>
