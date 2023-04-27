<template>
  <div class="look_expert-container">
    <Header :indexHeader="false"></Header>
    <ul class="expert-ul">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <li v-for="item in list" :key="item.id">
          <RecommendExpert :list="item"></RecommendExpert>
        </li>
      </van-list>
    </ul>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import RecommendExpert from '@/components/recommend_expert/recommend_expert.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { getExport } from '@/service/getExpert';
import { useTitles } from '@/common/js/useTitles';
//title
useTitles('专家');
// store
const store = useStore();
const initMid = computed(() => store.getters.initMid);

//请求专家列表
const list = ref<{ id: string }[]>([]);
const loading = ref(false);
const finished = ref(false);
const page = ref(1);
function onLoad() {
  getExpertList();
}
async function getExpertList() {
  // 获取专家列表
  const data = await getExport({ mid: initMid.value, page: page.value });
  loading.value = false;
  if (data?.code == 201) {
    finished.value = true;
    return;
  }
  list.value = list.value.concat(data);
  page.value += 1;
}
</script>

<style lang="scss" scoped>
.old {
  .look_expert-container {
    .expert-ul {
      width: 100%;
      column-count: auto;
      padding-right: 12px;
      margin: 0;
      padding-left: 12px;
      padding-bottom: 18px;
      li {
        break-inside: auto;
        width: 100%;
        height: 90px;
        padding: 0;
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
        .recommend_expert-container {
          min-height: auto;
        }
      }
    }
  }
}
.look_expert-container {
  .expert-ul {
    margin-top: 10px;
    background: #fff;
    padding-left: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-bottom: 60px;
    li {
      width: 50%;
      display: inline-block;
      padding-right: 12px;
      margin-bottom: 10px;
      vertical-align: top;
      .recommend_expert-container {
        // min-height: 185px;
        :deep().time {
          display: none;
        }
      }
    }
  }
}
</style>
