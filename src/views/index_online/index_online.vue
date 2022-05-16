<template>
  <div class="index_online-container" ref="online">
    <Header :tabbarActive="1"></Header>
    <div class="online-box">
      <ul class="o-ul" ref="ul">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <li v-for="item in onlineArr" :key="item.tid">
            <OnlineItem :list="item" @preImage="previewImg"></OnlineItem>
          </li>
        </van-list>
      </ul>
    </div>
    <Foot></Foot>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import OnlineItem from '@/components/online_item/online_item.vue';
import Foot from '@/components/foot/foot.vue';
import { useTitles } from '@/common/js/useTitles';
import { fetchPost } from '@/http';
import { ImagePreview } from 'vant';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { OnlineItemTs } from './onlineItem';

// title
useTitles('网诊');

// vuex
const store = useStore();
const uId = computed(() => store.state.uId);
const initMid = computed(() => store.state.initMid);

// ref
const onlineArr = ref<OnlineItemTs[]>([]);
const page = ref<number>(0);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);

function onLoad() {
  getIndexData();
}
function getIndexData() {
  // 获取首页数据
  page.value += 1;
  fetchPost('/Mobile/Wen/index', {
    mId: initMid.value,
    fId: '',
    location: '',
    // areaId: this.area,
    page: page.value,
    uId: uId.value,
    isall: 'all',
  }).then((res: any) => {
    if (res.data.code == 0) {
      onlineArr.value = onlineArr.value.concat(res.data.data);
      loading.value = false;
    } else if (res.data.code == 201) {
      finished.value = true;
    }
  });
}

// 图片预览
const VanImagePreview = ImagePreview.Component;
interface Item {
  arr: string[];
  index: number;
}
function previewImg(item: Item) {
  //网诊的图片预览
  ImagePreview({
    images: item.arr,
    startPosition: item.index,
    closeable: true,
  });
}
</script>
<style lang="stylus" scoped>
.old
  .index_online-container
    padding-bottom: 96px ;
.index_online-container
  padding-bottom: 50px ;
  .header-container
    z-index 3
  &.addressOverflow
    position fixed
    left 0
    top 40px
    right 0
    bottom 0
    z-index 2
    padding-bottom 0
  .choose-box
    height 40px
    display flex
    align-items center
    background #fff
    border-bottom 1px solid #e5e5e5
    position relative
    margin-top 10px
    z-index 2
    .back
      width 25px
      height 25px
      background url('./70.png') no-repeat
      background-size 25px 25px
      background-position center
      padding 0 13px
      box-sizing content-box
      margin-right 20px
    .all
      font-size 15px
      color #333
      padding-right 34px
      line-height 40px
      display flex
      align-items center
      .down
        margin-left 5px
        font-size 18px
        color #363A44
    .crop
      font-size 15px
      color #333
      padding-right 34px
      line-height 40px
      display flex
      align-items center
      .down
        margin-left 5px
        font-size 18px
        color #363A44
    .address-box
      position fixed
      left 0
      right 0
      // height 75px
      bottom -3px
      background rgba(0, 0, 0, 0.7)
      top 90px
      // background #fff
      border-bottom 1px solid #e5e5e5
      z-index 111
      overflow hidden
      .wrap
        height 75px
        display flex
        align-items center
        background #fff
        padding-left 12px
      .item
        width 75px
        background #F6F6F6
        height 25px
        color #333333
        border-radius 8px
        font-size 15px
        text-align center
        line-height 25px
        margin-right 15px
      .cross
        font-size 18px
        position absolute
        right 15px
        top 14px
        color #9D9D9D
  .online-box
    background #fff
    .title
      font-size 17px
      color #343434
      height 40px
      line-height 40px
      padding-left 12px
      border-bottom 1px solid #e5e5e5
    .o-ul
      margin-left 12px
      li
        width 100%
        border-bottom 1px solid #e5e5e5
        &:last-child
          border none
    .e-ul
      padding-top 10px
      display flex
      flex-wrap wrap
      margin-left 12px
      border-bottom 1px solid #e5e5e5
      padding-bottom 5px
      li
        width 50%
        padding-right 12px
        margin-bottom 10px
</style>
