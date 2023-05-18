<template>
  <div class="booth">
    <van-cell-group>
      <van-cell title="摊位编码" :value="data.booth.number" size="large" />
      <van-cell title="所属交易中心" :value="data.booth.marketName" size="large" />
      <van-cell title="位置" :value="data.booth.position" size="large" />
      <van-cell title="摊位大小" :value="data.booth.size" size="large" />
      <van-cell title="所属商户" :value="data.booth.merchantName" size="large" />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts">
import { useTitles } from '@/common/js/useTitles';
import { reactive, onMounted, computed } from 'vue';
import { getBoothDetail } from '@/service/base';
import { useRoute } from 'vue-router';
import { Toast } from 'vant';

const route = useRoute();
useTitles('摊位详情');

let standId = computed(() => route.query.standId || '');

const data = reactive({
  booth: {
    marketName: '未知',
    merchantName: '浙江浙农创投科技有限公司',
    number: '1',
    position: '特斯',
    size: '50.50',
  },
});

onMounted(async () => {
  let r = await getBoothDetail(standId.value as string);
  if (r.code) {
    Toast(r.message);
    return;
  }
  data.booth = r;
  console.log('r', r);
});
</script>
<style lang="scss" scoped>
:deep().van-cell__value {
  color: #333;
  font-size: 16px;
}
.booth {
  margin-top: -40px;
  padding-top: 20rem;
}
</style>
