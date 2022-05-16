<template>
  <div class="message-container">
    <Header :indexHeader="false"></Header>
    <ul class="message-ul">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <li
          v-for="item in list"
          :key="item.id"
          @click="goToMessageDetail(item.id, item.catid)"
        >
          <MessageItem :list="item" :index="true"></MessageItem>
        </li>
      </van-list>
    </ul>
    <Foot></Foot>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import MessageItem from '@/components/message_item/message_item.vue';
import Foot from '@/components/foot/foot.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useTitles } from '@/common/js/useTitles';
import { getMessage } from '@/service/getMessage';

const store = useStore();
const initMid = computed(() => store.state.initMid);

const route = useRouter();
useTitles('资讯');

interface ListItem {
  id: string;
  catid: string;
}
const list = ref<ListItem[]>([]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
const page = ref<number>(1);

function onLoad() {
  getList();
}

async function getList() {
  const data = await getMessage({ initMid: initMid.value, page: page.value });
  if (data?.code == 201) {
    finished.value = true;
    return;
  }
  loading.value = false;
  list.value = list.value.concat(data);
  page.value += 1;
}

function goToMessageDetail(id: string, catId: string): void {
  // 路由  资讯详情页
  route.push({
    path: '/message_detail',
    query: {
      id: id,
      catid: catId,
      from: 'index',
    },
  });
}
</script>

<style lang="scss" scoped>
.message-container {
  padding-bottom: 55px;
  background: #fff;
  .message-ul {
    margin-left: 12px;
    li {
      border-bottom: 1px solid #e5e5e5;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
