<template>
  <div class="details-container">
    <Header :indexHeader="false"></Header>
    <div class="time-content">
      <div class="times">
        <div class="time" @click="openDatePick('prev')">{{ formatDate(currentDate) }}</div>
        <div class="line">至</div>
        <div class="time" @click="openDatePick('next')">{{ formatDate(currentDate2) }}</div>
        <div class="icon"></div>
      </div>
      <div class="income">
        <div class="label">收入</div>
        <div class="icon">¥</div>
        <div class="money">{{ amount_sum }}</div>
      </div>
    </div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="lists"
      v-show="!noData"
    >
      <div class="item" v-for="(item, index) in lists" :key="item.pay_time">
        <div class="left">
          <div class="goods-name">
            {{ item.type_id == '1' ? '鲜品松茸' : '干片松茸' }}-{{ item.weight }}kg
          </div>
          <div class="time">{{ item.pay_time }}</div>
        </div>
        <div class="money-number">¥{{ item.amount }}</div>
      </div>
    </van-list>
    <van-empty v-show="noData" class="no-data" description="暂无数据"></van-empty>
    <van-popup v-model:show="showDate" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate1"
        :max-date="maxDate1"
        @confirm="confirmDate"
    /></van-popup>
    <van-popup v-model:show="showDate2" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate2"
        type="date"
        title="选择年月日"
        :min-date="minDate2"
        :max-date="maxDate2"
        @confirm="confirmDate"
    /></van-popup>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useTitles } from '@/common/js/useTitles';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { formatDate, nextTimeIsBig, isAgoOneMonth } from '@/common/js/util';
import { getCollectMoneyDetail } from '@/service/base';

const store = useStore();
useTitles('收款明细');

const uId = computed(() => store.state.uId);

const showDate = ref(false);
const showDate2 = ref(false);

//start时间
const currentDate = ref(isAgoOneMonth());
// end时间
const currentDate2 = ref(new Date());

//list数据
const lists = ref<any[]>([]);
const page = ref(0);
const loading = ref(false);
const finished = ref(false);
const noData = ref(false);
const amount_sum = ref(0);

//当前选择了start 还是end
const currentChoose = ref('prev');

//start 时间最大最小
const minDate1 = new Date(2023, 4, 1);
const maxDate1 = new Date();

//end 时间，最大最小
let minDate2 = ref(new Date(2023, 4, 1));
const maxDate2 = new Date();

// 打开时间选择器
const openDatePick = (number: string) => {
  if (number == 'prev') {
    showDate.value = true;
    currentChoose.value = 'prev';
  } else {
    showDate2.value = true;
    currentChoose.value = 'next';
  }
};

// 选择时间
const confirmDate = (val: string) => {
  if (currentChoose.value == 'prev') {
    currentDate.value = val as any;
    minDate2.value = currentDate.value as any;
    if (nextTimeIsBig(currentDate.value, currentDate2.value)) {
      currentDate2.value = currentDate.value;
    }
    showDate.value = false;
  } else {
    if (nextTimeIsBig(currentDate.value, currentDate2.value)) {
      currentDate.value = currentDate2.value;
    }
    currentDate2.value = val as any;
    showDate2.value = false;
  }
  resetData();
};

//lists 插件函数
const onLoad = () => {
  getLists();
};

// 请求数据
async function getLists() {
  page.value++;
  let r = await getCollectMoneyDetail(
    uId.value,
    formatDate(currentDate.value),
    formatDate(currentDate2.value),
    page.value
  );
  console.log('r', r);
  if (r.code == 201) {
    noData.value = true;
    return;
  }
  amount_sum.value = r.amount_sum;
  lists.value = lists.value.concat(r.data);
  loading.value = false;
  if (r.current_page >= r.last_page) {
    finished.value = true;
  }
  console.log('r', r);
}

function resetData() {
  page.value = 0;
  loading.value = true;
  finished.value = false;
  lists.value = [];
  noData.value = false;
  amount_sum.value = 0;
  getLists();
}
// onMounted(async () => {
//   page.value++;
//   let r = await getCollectMoneyDetail(
//     uId.value,
//     formatDate(currentDate.value),
//     formatDate(currentDate2.value),
//     page.value
//   );
//   lists.value = lists.value.concat(r.data);
//   console.log('r', r);
// });
</script>
<style lang="scss" scoped>
.details-container {
}
.time-content {
  width: 100%;
  max-width: 640px;
  height: 210rem;
  padding: 0 25rem;
  background: url('@/assets/collect_money_detail_bj.png') no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin-bottom: 20rem;
  position: fixed;
  top: 40px;
  z-index: 1;
  .times {
    display: flex;
    font-size: 30rem;
    align-items: center;
    color: #ffffff;
    .line {
      margin: 0 10rem;
    }
  }
  .income {
    display: flex;
    align-items: end;
    color: #ffffff;
    .label {
      font-size: 24rem;
      margin-right: 30rem;
    }
    .icon {
      font-size: 22rem;
      margin-right: 10rem;
    }
    .money {
      font-size: 35rem;
      font-weight: bold;
    }
  }
}
.lists {
  background: #fff;
  padding-left: 25rem;
  margin-bottom: 20rem;
  margin-top: 210rem;
  .item {
    border-bottom: 1px solid#DCDCDC;
    height: 150rem;
    display: flex;
    padding-top: 30rem;
    justify-content: space-between;
    padding-right: 28rem;
    .left {
      .goods-name {
        font-size: 30rem;
        font-weight: 400;
        color: #333333;
        margin-bottom: 10rem;
      }
      .time {
        font-size: 24rem;

        color: #999999;
      }
    }
    .money-number {
      font-size: 30rem;
      font-weight: 400;
      color: #333333;
    }
    &:last-child {
      border: none;
    }
  }
}
.no-data {
  margin-top: 210rem;
}
</style>
