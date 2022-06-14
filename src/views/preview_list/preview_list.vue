<!-- 我的-作物解决方案列表-->
<!-- 下一个路由preview-->
<template>
  <div>
    <Header :indexHeader="false"></Header>
    <ul class="ul">
      <li v-for="item in caseList" :key="item.pid" class="item" @click="goPreview(item.pid)">
        <van-image :src="item.icon" class="img" radius="8"></van-image>
        <div class="text">
          <p class="van-multi-ellipsis--l2 f22">
            {{ item.text }}
          </p>
        </div>
      </li>
    </ul>
    <van-empty description="暂无数据" v-show="!caseList.length && ajaxed"></van-empty>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useTitles } from '@/common/js/useTitles';
import { getPerviewList } from '@/service/getPerviewList';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();

// title
useTitles('作物解决方案');

//store
const uId = computed(() => store.state.uId);
const initMid = computed(() => store.getters.initMid);

// 数据列表
interface Case {
  icon: string;
  date: string;
  text: string;
  pid: number;
}
// 方案列表
const caseList = ref<Case[]>([]);
const ajaxed = ref<boolean>(false);
onMounted(async () => {
  const data = await getPerviewList({ uId: uId.value, mId: initMid.value });
  caseList.value = data;
  ajaxed.value = true;
});

//路由
function goPreview(pId: number): void {
  router.push({
    path: '/preview',
    query: { pId },
  });
}
</script>
<style lang="scss">
.ul {
  margin-top: 8px;
  .item {
    background: #fff;
    margin-bottom: 8px;
    padding: 16px;
    display: flex;
    align-items: center;
    .img {
      width: 75px;
      height: 75px;
      // border-radius: 8px;
      margin-right: 16px;
    }
    .text {
      flex: 1;
    }
    p {
      word-break: break-all;
      text-overflow: clip !important;
      font-size: 17px;
      color: #343a45;
    }
  }
}
</style>
