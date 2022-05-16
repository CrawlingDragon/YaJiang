<template>
  <div class="into_hospital-conatiner">
    <Header :indexHeader="false"></Header>
    <div class="box" v-if="list_joinin.length">
      <div class="title f22">加入的医院</div>
      <ul>
        <li v-for="item in list_joinin" :key="item.id">
          <RecommendHospital :list="item"></RecommendHospital>
        </li>
      </ul>
    </div>
    <div class="box" v-if="list_area.length">
      <div class="title f22">植物医院</div>
      <ul>
        <li v-for="item in list_area" :key="item.id">
          <RecommendHospital :list="item"></RecommendHospital>
        </li>
      </ul>
    </div>
    <van-loading
      size="24px"
      vertical
      style="height: 200px; padding-top: 130px"
      v-if="loading"
      >加载中...</van-loading
    >
    <Foot></Foot>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header/header.vue';
import RecommendHospital from '@/components/recommend_hospital/recommend_hospital.vue';
import Foot from '@/components/foot/foot.vue';
import { getIntoHospital } from '@/service/getIntoHospital';
import { useStore } from 'vuex';
import { computed, ref, watch, onMounted } from 'vue';
import { useTitles } from '@/common/js/useTitles';
// title
useTitles('进院');

//vuex
const store = useStore();
const uId = computed(() => store.state.uId);

//单个医院接口
interface Hospital {
  id: string;
}
// ref
const list_joinin = ref<Hospital[]>([]); //加入的医院
const list_area = ref<Hospital[]>([]); //植物医院
const loading = ref<boolean>(true);

onMounted(async () => {
  // 获取医院列表 请求
  getList();
});
async function getList() {
  const data = await getIntoHospital();
  list_joinin.value = data.list_joinin;
  list_area.value = data.list_area;
  loading.value = false;
  // console.log(data);
}
//watch uId变化，重新请求进院列表
watch(uId, () => {
  getList();
});
</script>

<style lang="scss" scoped>
.old {
  .into_hospital-conatiner {
    padding-bottom: 95px;
    .box {
      .title {
        height: 55px;
        display: flex;
        align-items: center;
      }
      ul {
        li {
          width: 100%;
          height: 110px;
        }
      }
    }
  }
}
.into_hospital-conatiner {
  padding-bottom: 50px;
  .box {
    margin-top: 10px;
    background: #fff;
    .title {
      height: 40px;
      line-height: 40px;
      color: #333;
      font-size: 17px;
      border-bottom: 1px solid #e5e5e5;
      padding-left: 12px;
    }
    ul {
      margin-left: 12px;
      margin-top: 10px;
      padding-bottom: 15px;
    }
    li {
      width: 50%;
      display: inline-block;
      padding-right: 12px;
      padding-bottom: 12px;
      height: 300px;
      vertical-align: top;
      position: relative;
    }
    .recommend-hospital-wrap {
      height: 100%;
      :deep().p3 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        padding-right: 5px;
      }
      :deep().p1 {
        padding-right: 5px;
      }
      :deep().p2 {
        padding-right: 5px;
      }
      :deep().number {
        position: absolute;
        bottom: 10px;
      }
    }
  }
}
</style>
