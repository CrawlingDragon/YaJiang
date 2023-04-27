<template>
  <div class="index_online-container" ref="online">
    <Header :tabbarActive="1" @updateFetchData="updateFetchData"></Header>
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
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
    </van-pull-refresh>
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
import { useRoute } from 'vue-router';
import { useTargetScroll } from '@/common/js/useTargetScroll';

// route
const route = useRoute();
const routeName = computed(() => route.name);

// title
useTitles('问答');

// vuex
const store = useStore();
const uId = computed(() => store.state.uId);
const initMid = computed(() => store.getters.initMid);

// ref
const onlineArr = ref<OnlineItemTs[]>([]);
const page = ref<number>(0);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);

// 保存在上一次组件的位置，重新进入的时候，回到上一次的位置
useTargetScroll();

//上滑加载更多
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

function updateFetchData() {
  // 双击头部的网诊 tab，重置，刷新数据
  if (routeName.value === 'indexOnline') {
    onlineArr.value = [];
    page.value = 0;
    loading.value = false;
    finished.value = false;
    setTimeout(() => {
      getIndexData();
    }, 100);
  }
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

//下拉刷新 控制model
const refreshLoading = ref(false);
// 下拉刷新
function onRefresh() {
  // 1s后请求最新数据，然后把 refreshLoading重置为false
  setTimeout(() => {
    updateFetchData();
    refreshLoading.value = false;
  }, 1000);
}
</script>
<script lang="ts">
export default {
  name: 'indexOnline',
};
</script>
<style lang="scss" scoped>
.index_online-container {
  .choose-box,
  .address-box {
    border-bottom: 1px solid $border-color;
  }
  .online-box {
    .e-ul {
      border-bottom: 1px solid $border-color;
    }
    .title {
      border-bottom: 1px solid $border-color;
    }
    .o-ul {
      li {
        border-bottom: 1px solid $border-color;
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
.old
  .index_online-container
    padding-bottom: 96px;
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
    border-bottom 1px solid $border-color
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
      border-bottom 1px solid $border-color
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
      border-bottom 1px solid $border-color
    .o-ul
      margin-left 12px
      li
        width 100%
        border-bottom 1px solid $border-color
        &:last-child
          border none
    .e-ul
      padding-top 10px
      display flex
      flex-wrap wrap
      margin-left 12px
      border-bottom 1px solid $border-color
      padding-bottom 5px
      li
        width 50%
        padding-right 12px
        margin-bottom 10px
</style>
