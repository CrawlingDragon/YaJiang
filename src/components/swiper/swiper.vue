<template>
  <van-swipe :autoplay="3000" ref="swiperRef" class="swipe-wrap-custom">
    <van-swipe-item
      v-for="image in swiperArr"
      :key="image.id"
      fit="cover"
      @click="goToMessageDetail(image)"
    >
      <van-image fit="cover" :src="image.logo" lazy-load />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { getIndexAdList } from '@/service/banner';
import { useWindowSize } from '@vant/use';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
//router
const router = useRouter();

const store = useStore();
//ts interface
interface SwiperItem {
  id: string;
  logo: string;
  module: string;
  mid: string;
  catid: string;
}

// init data
const swiperArr = ref<SwiperItem[]>([]);
const h = ref('0px');

onMounted(async () => {
  const result = await getIndexAdList();
  swiperArr.value = result;
  // 轮播初始化
  initSwiperHeight();
});

// 监控窗口变化，改变swiper 的高度变化
const { width } = useWindowSize();
watch(width, (newVal) => {
  initSwiperHeight(newVal);
});

function initSwiperHeight(width = 0) {
  if (width >= 640) {
    width = 640;
  }
  h.value = width / (750 / 188) + 'px';
  if (h.value === '0px') {
    let w = document.body.clientWidth;
    h.value = w / (750 / 188) + 'px';
  }
}

function goToMessageDetail(item: SwiperItem) {
  //轮播图去资讯详情页
  switch (item.module) {
    case 'mp':
      store.commit('setMid', item.mid);
      setTimeout(() => {
        router.push({ path: '/hospital' });
      });
      break;
    case 'webview':
      window.open(item.mid, '_blank');
      break;
    case 'news':
      router.push({
        path: '/message_detail',
        query: { id: item.mid, catid: item.catid },
      });
      break;
  }
}
</script>
<style lang="scss" scoped>
.swipe-wrap-custom {
  width: 100%;
  height: calc(100vw / (750 / 188));
}
</style>
