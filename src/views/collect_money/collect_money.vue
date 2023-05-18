<template>
  <div class="collect-container">
    <Header :indexHeader="false"></Header>
    <div class="info-box">
      <div class="top">
        <div class="kind">{{ kind }}</div>
        <div class="icon" @click="materialShow = true"></div>
        <van-popup v-model:show="materialShow" class="material" position="bottom" round>
          <div class="item" @click="goMaterialPage">收款码申请材料</div>
          <div class="item" @click="showDescription">收款码使用说明</div>
        </van-popup>
      </div>
      <div class="info">
        <div class="name">{{ name }}（{{ user_type }}）</div>
        <div class="company">{{ company }}</div>
        <div class="money" v-if="money !== 0">¥ {{ money }}</div>
        <van-image class="code-img" :src="code_images" fit="cover"></van-image>
        <div class="btn">
          <div class="clean-money" @click="showSetMoney" v-if="money === 0">设置金额</div>
          <div class="clean-money" v-else @click="clearMoney">清除金额</div>
          <div class="switch-btn" @click="kindShow = true">切换</div>
          <van-popup v-model:show="kindShow" class="material" position="bottom" round>
            <div class="item" @click="switchKind('鲜品松茸')">鲜品松茸</div>
            <div class="item" @click="switchKind('干片松茸')">干片松茸</div>
          </van-popup>
        </div>
      </div>
      <div class="bottom" @click="goCollectDetail">
        <van-icon name="label-o" class="icon" />
        <div class="text">收款明细</div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>
    </div>
    <div class="paying-list">
      <div class="item">
        <div class="time">2023-04-10 14:00:09</div>
        <div class="status">支付中...</div>
      </div>
      <div class="item">
        <div class="time">
          2023-04-10 14:00:092023-04-10 14:00:092023-04-10 14:00:092023-04-10 14:00:09
        </div>
        <div class="status">¥5.00</div>
      </div>
      <div class="item">
        <div class="time">2023-04-10 14:00:09</div>
        <div class="status">支付取消</div>
      </div>
    </div>
    <SetMoney
      ref="SetMoneyRef"
      @setMoneyEmit="setMoney"
      :codeId="code_id"
      :money="money"
      :type_id="type_id"
      :is_auto="is_auto"
      :weight="weight"
    />
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useTitles } from '@/common/js/useTitles';
import { useRouter } from 'vue-router';
import SetMoney from './set_money.vue';
import { ref, onMounted, computed } from 'vue';
import { Dialog, Toast } from 'vant';
import { getCollectMoney, getRestCollectMoney, getSetCollectMoney } from '@/service/base';
// import { useStore } from 'vuex';

// const store = useStore();
const router = useRouter();
useTitles('收款码');

// const uId = computed(() => store.state.uId);
const goCollectDetail = () => {
  router.push({
    path: '/collect_money_detail',
  });
};
const defaultKind = '鲜品松茸';
//页面左上角... icon的点击展开
const materialShow = ref(false);
//切换按钮
const kindShow = ref(false);
const kind = ref(defaultKind); //种类
const type_id = ref(); //种类的后端数据表示，1：鲜品，2：干片
const money = ref(); // 金额
const code_images = ref(''); //二维码
const name = ref(''); //用户名
const user_type = ref(''); //用户类型
const company = ref(''); //公司名
const code_id = ref(''); //修改规格使用的code_id
const weight = ref(0);
const is_auto = ref(0);

//设置子组件，确定后，回传设置的数据
const setMoney = (obj: any) => {
  money.value = obj.money;
  kind.value = obj.kind;
  code_images.value = obj.code_images;
  weight.value = obj.weight;
  is_auto.value = obj.is_auto;
  console.log('obj', obj);
};
const SetMoneyRef = ref();

const showSetMoney = () => {
  SetMoneyRef.value.show = true;
};

//清除金额
const clearMoney = async () => {
  money.value = 0;
  kind.value = defaultKind;
  SetMoneyRef.value.resetData();
  let r = await getRestCollectMoney(code_id.value, '1');
  console.log('r', r);
  setFetchData(r);
};

const goMaterialPage = () => {
  router.push({ path: '/collect_apply_detail' });
};
const showDescription = () => {
  Dialog({
    title: '收款码使用说明',
    message: '农行借记卡支付手续费全免，故目前仅支持农行卡 收款功能，更多结算方式敬请期待!',
    confirmButtonText: '好的',
    confirmButtonColor: '#155BBB',
  });
};

//切换按钮
const switchKind = async (kindStr: string) => {
  kind.value = kindStr;
  console.log('kindStr', kindStr);
  let r = await getSetCollectMoney(
    code_id.value,
    kind.value == '鲜品松茸' ? 1 : 0,
    money.value,
    weight.value,
    is_auto.value
  );
  kindShow.value = false;
};

onMounted(async () => {
  let toast1 = Toast.loading({ duration: 0, message: '请求中...' });
  let r = await getCollectMoney();
  // console.log('r', r);
  let abc_state = r.abc_state;
  toast1.clear();
  if (abc_state == 4) {
    // abc_state = 4 正常赋值，如果是其他数字状态说明需要申请付款码
    // /0:未开通，1:账户验证中，2:待银行审核，3:审核失败，4:正常，5:已禁用
    setFetchData(r);
  } else {
  }
});

// 因为重置，切换，都需要走接口，故把接口赋值给本地数据都放在一个函数内
function setFetchData(data: any) {
  code_images.value = data.code_images;
  name.value = data.nickname;
  user_type.value = data.user_type;
  type_id.value = data.type_id;
  kind.value = data.type_id == 1 ? '鲜品松茸' : '干片松茸';
  company.value = data.company_name;
  code_id.value = data.code_id;
  money.value = data.amount;
  weight.value = data.weight;
  is_auto.value = data.is_auto;
}
</script>
<style lang="scss" scoped>
.info-box {
  margin: 20rem 25rem;
  background: #fff;
  border-radius: 20rem;
  padding: 0 25rem;
  .top {
    height: 105rem;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32rem;
    color: #333333;
    .icon {
      color: #999;
      width: 42rem;
      height: 10rem;
      background: url('@/assets/nav.png') no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 75rem;
    padding-bottom: 45rem;
    border-bottom: 1px solid #dcdcdc;
    .name {
      font-size: 40rem;
      font-weight: 400;
      color: #333333;
      line-height: 1.1;
      margin-bottom: 25rem;
    }
    .company {
      font-size: 28rem;
      color: #999999;
      margin-bottom: 30rem;
    }
    .money {
      font-size: 74rem;
      color: #333333;
      margin-bottom: 40rem;
    }
    .code-img {
      width: 299rem;
      height: 300rem;
      margin-bottom: 45rem;
    }
    .btn {
      width: 100%;
      display: flex;
      align-items: center;
      height: 40rem;
      & > div {
        width: 50%;
        text-align: center;
        font-size: 28rem;
        color: #155bbb;
        &:first-child {
          border-right: 1px solid #dcdcdc;
        }
      }
    }
  }
  .bottom {
    height: 105rem;
    display: flex;
    align-items: center;
    .icon {
      font-size: 44rem;
      color: #666;
      margin-right: 30rem;
    }
    .text {
      font-size: 32rem;
      color: #333333;
    }
    .arrow-icon {
      flex: 1;
      text-align: right;
      color: #999999;
      font-size: 32rem;
    }
  }
}
.paying-list {
  background: #fff;
  padding-left: 25rem;
  margin-bottom: 30rem;
  .item {
    height: 100rem;
    line-height: 100rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dcdcdc;
    padding-right: 25rem;
    &:last-child {
      border-bottom: none;
    }
    .time {
      font-size: 30rem;
      color: #999999;
      max-width: 70%;
      overflow: hidden;
      line-height: inherit;
      height: 100%;
    }
    .status {
      font-size: 30rem;
      color: #333333;
    }
  }
}
.material {
  height: 275rem;
  display: flex;
  flex-direction: column;
  .item {
    height: 155rem;
    text-align: center;
    font-size: 34rem;
    color: #333333;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    border-bottom: 1px solid #e5e5e5;
    &last-child {
      border: none;
    }
  }
}
</style>
