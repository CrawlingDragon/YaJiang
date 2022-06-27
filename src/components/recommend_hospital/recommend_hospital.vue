<template>
  <!-- 首页推荐医院列表 -->
  <div class="recommend-hospital-wrap" @click="goToIndexHospital">
    <van-image :src="list.case_img" fit="cover" class="image" lazy-load />
    <p class="p1 f22">{{ list.title }}</p>
    <p class="p2">{{ list.level }}·{{ list.issort }}</p>
    <p class="p3" v-show="list.zuowu != '暂未设置'">科室：{{ list.zuowu }}</p>
    <div class="number">
      <div class="expert" v-if="list.num_expert != 0">专家 {{ list.num_expert }}</div>
      <div class="line" v-show="list.num_expert != 0 && list.num_chufang != 0">|</div>
      <div
        class="online"
        v-if="list.num_chufang != 0"
        :style="{ 'margin-left': list.num_expert == 0 ? '0px' : '10px' }"
      >
        处方 {{ list.num_chufang }}
      </div>
      <div class="line" v-show="list.num_wen != 0 && list.isstore == 0" style="margin-left: 10px">
        |
      </div>
      <div class="online" v-if="list.num_wen != 0 && list.isstore == 0">
        网诊 {{ list.num_wen }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
interface HospitalList {
  id: string;
  logo?: string;
  title?: string;
  level?: string;
  zuowu?: string;
  num_expert?: number;
  num_chufang?: number;
  num_wen?: number;
  isstore?: number;
  mid?: string;
  issort?: number;
  case_img: string;
}
const props = defineProps<{
  list: HospitalList;
}>();

function goToIndexHospital() {
  // 去医院首页
  store.commit('setMid', props.list.mid);
  store.commit('setHospitalName', props.list.title);
  store.commit('setHospitalIsStore', props.list.isstore);
  router.push({
    path: '/hospital',
  });
}
</script>
<style lang="scss" scoped>
.old {
  .recommend-hospital-wrap {
    width: 100%;
    display: flex;
    margin: 0;
    padding: 0;
    .image {
      width: 50%;
      height: 100%;
      margin: 0;
    }
    .p1 {
      width: 50%;
      padding: 0 15px;
      display: flex;
      align-items: center;
      line-height: 1.2;
      white-space: normal;
      margin-bottom: 0;
    }
    .p2,
    .p3,
    .number {
      display: none !important;
    }
  }
}
</style>
<style lang="stylus" scoped>
.recommend-hospital-wrap
  position relative
  padding-bottom 15px
  background #F5F5F5
  height 100%
  overflow hidden
  .image
    width 100%
    height calc((50vw - 18px)/(3/2))
    max-height 60%
    margin-bottom 5px
  .p1
    font-size 14px
    color #343434
    line-height 16px
    padding-left 10px
    margin-bottom 13px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    word-break break-all
  .p2
    color #9A9A9A
    font-size 12px
    line-height 14px
    margin-bottom 10px
    padding-left 10px
  .p3
    color #9A9A9A
    font-size 12px
    line-height 16px
    padding-left 10px
  .number
    position: absolute;
    font-size: 12px;
    color: #343434;
    bottom: 15px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    .expert
      margin-right 10px
    .online
      margin-left 10px
  .icon
    width 45px
    height 15px
    background url('./icon.png') no-repeat
    background-size cover
    background-position center
    position absolute
    right 0
    top 5px
</style>
