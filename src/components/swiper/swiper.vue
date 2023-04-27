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
  urlType: string;
  mid: string;
  catid: string;
  urlAddress: string;
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
  //轮播图去资讯详
  // urlType == 0 : 不跳转
  // urlType == 1：内部跳转，暂定资讯页
  // urlType == 2：外部跳转
  switch (item.urlType) {
    case '0':
      return;
      break;
    case '1':
      router.push({
        path: '/message_detail',
        query: { id: item.id, catid: item.catid },
      });
      break;
    case '2':
      window.open(item.urlAddress, '_blank');
      break;
  }
}
</script>
<style lang="scss" scoped>
.swipe-wrap-custom {
  width: 100%;
  height: min(calc(100vw / (750 / 260)), 222px);
}
</style>
