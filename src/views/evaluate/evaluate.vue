<!-- 投诉与评价 -->
<template>
  <div class="container">
    <Header :indexHeader="false"></Header>
    <ul class="ul">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <li v-for="item in evaluate" :key="item.id">
          <div class="time f18">{{ item.add_time }}</div>
          <div class="rate">
            <Rate v-model="item.star" readonly icon="star" void-icon="star-o" />
            <span class="f18">{{ formatStar(item.star) }}</span>
          </div>
          <div class="text f20">{{ item.content }}</div>
        </li>
      </van-list>
    </ul>
    <div class="btn-box">
      <div class="btn f22" @click="openRatePopup">我要评价</div>
    </div>
    <RatePopup :author="'为农服务平台'" ref="ratePopupRef" @emitSub="comment"></RatePopup>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useTitles } from '@/common/js/useTitles';
import { formatStar } from '@/common/js/formatStar';
import { getEvaluate, submitEvaluate } from '@/service/evaluate';
import RatePopup from '@/components/rate_popup/rate_popup.vue';
import { ref, computed } from 'vue';
import { Rate, Toast } from 'vant';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
const uId = computed(() => store.state.uId);
const page = ref<number>(1);
// title
useTitles('投诉与评价');

// 评分 popup
const ratePopupRef = ref<InstanceType<typeof RatePopup> | null>(null);

// 利用组件ref，打开弹窗
function openRatePopup() {
  ratePopupRef.value?.open();
}
// 评分弹窗 返回的 评分和评分内容
interface subObj {
  roteValue: number;
  roteMessage: string;
}
const comment = (subObj: subObj) => {
  // 评价组件返回的 评分内容和star值
  const { roteMessage, roteValue } = subObj;
  subCommentAjax({ roteMessage, roteValue });
};
//发送评价请求
async function subCommentAjax({ roteMessage, roteValue }: subObj) {
  //todo
  const data = await submitEvaluate({
    uId: uId.value,
    star: roteValue,
    content: roteMessage,
  });
  if (data?.code) {
    Toast(data.message);
  } else {
    Toast('已发表');
    router.go(0);
  }
}

// 评价列表数组
interface Evaluate {
  add_time: string;
  content: string;
  id: string;
  star: number;
  starStr: string;
  uid: string;
}
const evaluate = ref<Evaluate[]>([]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);

// vant 插件的加载函数
function onLoad() {
  getCommentList();
}
async function getCommentList() {
  // 请求评分列表的接口
  const data = await getEvaluate({ uId: uId.value, page: page.value, pagesize: 10 });
  // console.log('data :>> ', data);
  page.value += 1;
  evaluate.value = evaluate.value.concat(data);
  loading.value = false;
  // 201 表示没有更多了
  if (data?.code === 201) {
    finished.value = true;
  }
}
// onMounted(() => {
//   getCommentList();
// });
</script>
<style lang="scss">
.old {
  .ul {
    li {
      padding: 23px 16px;
      .rate {
        margin: 18px 0 15px;
        display: flex;
        align-items: center;
        span {
          margin-left: 18px;
        }
      }
      .van-icon-star {
        width: 33px;
        height: 31px;
        background: url(./41.png) no-repeat;
        background-size: contain;
        &:before {
          display: none;
        }
      }
      .van-icon-star-o {
        width: 33px;
        height: 31px;
        background: url(./42.png) no-repeat;
        background-size: contain;
        &:before {
          display: none;
        }
      }
    }
  }
}
.container {
  padding-bottom: 70px;
}
.ul {
  margin-top: 8px;
  li {
    background: #fff;
    margin-bottom: 8px;
    padding: 16px 16px;
    .time {
      font-size: 12px;
      color: #b3b5b9;
    }
    .rate {
      margin: 13px 0 15px;
      display: flex;
      align-items: center;
      span {
        margin-left: 18px;
      }
    }
    .van-icon-star {
      width: 27px;
      height: 25px;
      background: url(./41.png) no-repeat;
      background-size: contain;
      &:before {
        display: none;
      }
    }
    .van-icon-star-o {
      width: 27px;
      height: 25px;
      background: url(./42.png) no-repeat;
      background-size: contain;
      &:before {
        display: none;
      }
    }
    .text {
      font-size: 14px;
      font-weight: 400;
      color: #343a45;
    }
  }
}
.btn-box {
  width: 100%;
  height: 64px;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  padding: 8px 18px;
  .btn {
    width: 100%;
    height: 100%;
    border: 1px solid $border-color;
    border-radius: 48px;
    font-size: 18px;
    color: $theme-color;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
