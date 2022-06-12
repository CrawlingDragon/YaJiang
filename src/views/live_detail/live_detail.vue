<template>
  <div class="video_detail-container">
    <Header :indexHeader="false"></Header>
    <div class="video-box">
      <video :src="detail.videourl" class="video" controls></video>
      <div class="status">
        <status :trainStatus="detail.trainStatus" />
      </div>
    </div>
    <div class="title">
      <div class="left">{{ detail.title }}</div>
      <div class="right">{{ detail.hospitalName }}</div>
    </div>
    <ul class="ul">
      <li>
        <div class="label">培训时间：</div>
        <div class="li-text">{{ detail.startTime }} ~ {{ detail.endTime }}</div>
      </li>
      <li>
        <div class="label">主讲师：</div>
        <div class="li-text">{{ detail.trainTeacher }}</div>
      </li>
      <!-- 培训方式：trainType[1:线上直播 2:线下地址] -->
      <li v-if="detail.trainType === '1'">
        <div class="label">线上直播：</div>
        <a :href="detail.trainAddress" class="online" target="_blank">前往 ></a>
      </li>
      <li v-else>
        <div class="label">培训地点：</div>
        <div class="li-text">{{ detail.trainAddress }}</div>
      </li>
    </ul>
    <div class="text">{{ detail.description }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/header/header.vue';
import status from '@/components/live_status/live_status.vue';
import { getTrainInfo } from '@/service/base';
import { useTitles } from '@/common/js/useTitles';
const route = useRoute();

//set title
useTitles('培训详情');

interface Detail {
  description?: string;
  endTime?: string;
  hospitalName?: string;
  image?: string;
  startTime?: string;
  tid?: string;
  title?: string;
  trainAddress?: string;
  trainStatus?: string;
  trainStatusStr?: string;
  trainType?: string;
  videourl?: string;
  trainTeacher?: string;
}

// 根据路由获取tId
const tId = computed(() => route.params.tId);
const detail = ref<Detail>({});

onMounted(async () => {
  // 请求详情数据
  const data = await getTrainInfo(tId.value as string);
  detail.value = data;
});
</script>
<script lang="ts">
export default {
  name: 'live_detail',
};
</script>
<style lang="scss" scoped>
.video_detail-container {
  min-height: 100%;
  width: 100%;
  position: absolute;
  bottom: 60px;
  top: 0px;
  background: #fff;
  padding-top: 60px;
  padding-left: 15px;
  padding-right: 15px;
  .video-box {
    padding-bottom: 0;
    position: relative;
    .video {
      width: 100%;
      height: auto;
    }
    .status {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 1;
    }
  }
  .title {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 15px;
    margin-top: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      color: $f-color;
      font-size: $f20;
    }
    .right {
      color: $theme-color;
      font-size: $f14;
    }
  }
  .text {
    font-size: $f14;
    color: $f-color;
    line-height: 2.2;
    padding: 0 0 20px;
    margin-bottom: 60px;
    margin-top: 18px;
  }
  .ul {
    li {
      display: flex;
      align-items: start;
      font-size: $f14;
      margin-bottom: 15px;
      .label {
        color: $f-color-second;
      }
      .li-text {
        flex: 1;
        min-width: 0;
        color: $f-color;
      }
      .online {
        color: $theme-color;
      }
    }
  }
}
</style>
