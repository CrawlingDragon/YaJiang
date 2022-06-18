<template>
  <div class="about-us">
    <Header :indexHeader="false"></Header>
    <div class="content">
      <p class="p1 f17" v-html="text"></p>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useTitles } from '@/common/js/useTitles';
import { onMounted, ref } from 'vue';
import { getAboutUs } from '@/service/base';
useTitles('关于我们');
const text = ref('');
onMounted(async () => {
  const data = await getAboutUs();
  text.value = data.content;
});
</script>
<style lang="scss" scoped>
:deep()img {
  max-width: 100%;
  display: block;
}
.about-us {
  background: #fff;
  margin-top: 15px;
  overflow-y: auto;
  .content {
    padding: 20px 12px 15px;

    .p1 {
      color: $f-color;
      font-size: 14px;
      line-height: 1.2;
      margin-bottom: 30px;
      text-indent: 2em;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
