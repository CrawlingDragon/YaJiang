<template>
  <div v-html="deal" class="deal"></div>
</template>
<script setup lang="ts">
import { getFarmThreeDeal } from '@/service/base';
import { ref, onMounted } from 'vue';
const deal = ref('');
onMounted(async () => {
  let r = await getFarmThreeDeal();
  deal.value = r.content;
});
</script>
<style lang="scss" scoped>
.deal {
  margin-top: -40px;
  padding: 0 25rem;
}
</style>
