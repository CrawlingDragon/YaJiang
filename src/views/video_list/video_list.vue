<template>
  <div class="video_list-container">
    <Header :indexHeader="false"></Header>
    <ul class="video-ul">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <li v-for="item in list" :key="item.id" @click="goToDetail(item.id)">
          <van-image class="img" fit="cover" radius="5px" :src="item.thumb"></van-image>
          <p class="p1">{{ item.title }}</p>
        </li>
      </van-list>
    </ul>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useTitles } from '@/common/js/useTitles';
import { getVideo } from '@/service/getVideo';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
useTitles('培训视频');

interface Video {
  id: string;
  thumb: string;
  title: string;
}
const list = ref<Video[]>([]);
const page = ref(1);
const loading = ref(false);
const finished = ref(false);
function onLoad() {
  getList();
}

//请求视频列表
async function getList() {
  const data = await getVideo({ page: page.value });
  page.value += 1;
  loading.value = false;
  list.value = list.value.concat(data);
  // code == 201 ,表示再无数据
  if (data?.code === 201) {
    finished.value = true;
  }
}
function goToDetail(id: string) {
  router.push({
    path: '/video_detail',
    query: { id: id },
  });
}
</script>
<script lang="ts">
export default {
  setup() {},
  name: 'videoList',
};
</script>
<style lang="scss" scoped>
.video_list-container {
  padding-bottom: 60px;
  .video-ul {
    margin-top: 10px;
    li {
      border-bottom: 1px solid $border-color;
      padding: 15px 12px 0 12px;
      background: #fff;
      &:last-child {
        border: none;
      }
      .img {
        width: 100%;
        height: 150px;
      }
      .p1 {
        height: 45px;
        line-height: 45px;
        color: #333;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
