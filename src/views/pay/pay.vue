<template>
  <div class="pay-container">
    <Header :indexHeader="false"></Header>
    <div class="pay-info">
      <div class="pay-object">
        <div class="object">
          <div class="name-kind">付款给{{ user_type }}</div>
          <div class="name">{{ nickname }}</div>
          <div class="company">{{ company_name }}</div>
        </div>
        <van-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="avatar"
        />
      </div>
      <div class="pay-number">
        ¥
        <input
          type="number"
          class="number"
          placeholder="100"
          v-model="moneyNumber"
          @input="handleInput"
        />
      </div>
      <div class="goods">
        {{ kindComputed }}
        <div class="change-btn" @click="switchKindFn">切换</div>
      </div>
    </div>
    <div class="pay-mode">
      <van-radio-group v-model="checked">
        <div class="item" @click="checked = 'bank1'">
          <div class="icon" id="1"></div>
          <div class="bank-name">农行掌上银行支付</div>
          <van-radio name="bank1" class="radio" checked-color="#FF6600"></van-radio>
        </div>
        <div class="item" @click="checked = 'bank2'" v-if="false">
          <div class="icon"></div>
          <div class="bank-name">农行掌上银行支付农行掌上支</div>
          <van-radio name="bank2" class="radio" checked-color="#FF6600"></van-radio>
        </div>
      </van-radio-group>
    </div>
    <div class="sub-btn">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        class="btn pay-btn"
        :disabled="disabled"
        :class="{ disabled: disabled }"
        @click="payNowFn"
      >
        立即支付
      </van-button>

      <!-- 注意重复点击 -->
      <!-- 表单验证 -->
    </div>
    <van-popup v-model:show="show" position="bottom" round :style="{ height: '42%' }" closeable>
      <div class="switch-box">
        <div class="item">
          <div class="label">品种</div>
          <van-radio-group v-model="type_id" class="radio-group">
            <van-radio :name="1" checkedColor="#155BBB">鲜品松茸</van-radio>
            <van-radio :name="0" checkedColor="#155BBB">干片松茸</van-radio>
          </van-radio-group>
        </div>
        <div class="item item2">
          <div class="label">重量</div>
          <van-radio-group v-model="is_auto" class="radio-group2">
            <van-radio :name="1" class="r1" checkedColor="#155BBB">自动计算重量</van-radio>
            <van-radio :name="0" checkedColor="#155BBB">
              <div class="weight-number">
                输入重量
                <van-field
                  v-model="weight"
                  type="number"
                  ref="weightInput"
                  class="weight-input"
                />kg
              </div>
            </van-radio>
          </van-radio-group>
        </div>
        <div class="btn">
          <van-button round block type="primary" class="btn" @click="switchKindBtnFn"
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useTitles } from '@/common/js/useTitles';
import Header from '@/components/header/header.vue';
import { Toast } from 'vant';
import { useRoute } from 'vue-router';
import { getBeforePayInfo, getBankPayInfo } from '@/service/getCollectMoney';

const route = useRoute();
// reveice_code =d9t6tg0svr20230504285028
useTitles('支付');

const code = computed(() => route.query.reveice_code);

// 选择支付方式 => 单选按钮
const checked = ref('bank1');
// 切换内容的显示隐藏
const show = ref(false);

// ===数据类===========
// 选择种类，是鲜品还是干片
const type_id = ref(1);
// 是否自动重量
const is_auto = ref(1);
// 公司名字
const company_name = ref('');
// 用户名字
const nickname = ref('');
// 用户类型
const user_type = ref('');
// 重量
const weight = ref<string | number>(0);
//支付金额
const moneyNumber = ref();
//支付时需要用到的code_id
const code_id = ref('0');
// ===数据类===========

// 立即支付按钮的禁用
const disabled = ref(true);
// 立即支付按钮 ，是否可以再次点击
const canSubmit = ref(true);

//选择的类型
const kindComputed = computed(() => {
  return type_id.value === 1 ? '鲜品松茸' : '干片松茸';
});

// 金额只能输入数字和正数
const handleInput = (e: any) => {
  let value = e.target.value;
  // 只允许输入数字和小数点
  value = value.replace(/[^\d.]/g, '');
  // 只保留小数点后两位
  value = value.replace(/^(\-)*(\d+)\.(\d{0,2}).*$/, '$1$2.$3');
  // 不允许为负数
  if (value < 0) {
    value = '';
  }
  moneyNumber.value = value;
};

// 切换松茸品种，种类
const switchKindFn = () => {
  show.value = true;
};
// 切换松茸种类=>确定按钮
const weightInput = ref();
const switchKindBtnFn = () => {
  if (is_auto.value === 0 && weight.value == '') {
    Toast('重量不能为空!');
    weightInput.value.focus();
    return;
  }
  // console.log('weight', weight.value);
  // console.log('is_auto', is_auto);
  show.value = false;
};

onMounted(async () => {
  let r = await getBeforePayInfo(code.value);
  console.log('r', r);
  moneyNumber.value = r.amount;
  company_name.value = r.company_name;
  is_auto.value = r.is_auto;
  nickname.value = r.nickname;
  type_id.value = r.type_id;
  user_type.value = r.user_type;
  weight.value = r.weight;
  code_id.value = r.code_id;
});
// 立即支付按钮
const payNowFn = async () => {
  if (moneyNumber.value == '') {
    Toast('请输入金额');
    return;
  }
  if (!canSubmit.value) return;
  canSubmit.value = false;
  Toast.loading('支付中...');
  let r = await getBankPayInfo(
    code_id.value,
    moneyNumber.value,
    type_id.value,
    weight.value,
    is_auto.value
  );
  if (r.code) {
    Toast(r.message);
    return;
  }
  window.location.href = r.url;
  console.log('sub-r', r);
  setTimeout(() => {
    canSubmit.value = true;
  }, 3000);
};
// watch 支付金额，一旦不为空，就取消按钮的disabled
watch(moneyNumber, (newVal) => {
  console.log('newVal', newVal);
  if (newVal != '') {
    disabled.value = false;
  } else {
    disabled.value = true;
  }
});
</script>
<style lang="scss" scoped>
.pay-info {
  margin: 20rem;
  width: auto;
  background: #fff;
  border-radius: 20rem;

  .pay-object {
    display: flex;
    padding: 30rem;
    .object {
      flex: 1;
      line-height: 1.1;
      .name-kind {
        color: #333;
        font-size: 32rem;
        margin-bottom: 25rem;
      }
      .name {
        color: #333;
        font-size: 40rem;
        margin-bottom: 25rem;
      }
      .company {
        font-size: 28rem;
        color: #999999;
      }
    }
    .avatar {
      width: 140rem;
      height: 140rem;
      margin-left: 30rem;
    }
  }
  .pay-number {
    font-size: 150rem;
    color: #333333;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    max-width: 100%;
    overflow: hidden;
    padding: 60rem 35rem 35rem;
    align-items: center;
    .number {
      flex: 1;
      margin-left: 48rem;
      border: none;
      outline: none;
    }
  }
  .goods {
    height: 123rem;
    display: flex;
    align-items: center;
    padding: 0 35rem;
    font-size: 32rem;
    color: #333333;

    .change-btn {
      margin-left: 35rem;
      font-size: 28rem;
      color: #155bbb;
      min-width: 71rem;
    }
  }
}
.pay-mode {
  background: #fff;
  padding-left: 25rem;
  .item {
    display: flex;
    align-items: center;
    min-height: 146rem;
    padding: 10rem 0;
    border-bottom: 1px solid #dcdcdc;
    &:last-child {
      border-bottom: none;
    }
    .icon {
      width: 50rem;
      height: 50rem;
      background: url('@/assets/pay-mode.png') no-repeat;
      background-size: cover;
      background-position: center center;
      margin-right: 20rem;
    }
    .bank-name {
      font-size: 36rem;
      flex: 1;
    }
    .radio {
      width: 50rem;
      height: 50rem;
      margin-right: 76rem;
      margin-left: 10rem;
    }
  }
}
.sub-btn {
  margin: 50rem 25rem;

  .btn {
    font-size: 30rem;
    color: #ffffff;
    background: #ff6600;
    outline: #ff6600;
    border: 1px solid #ff6600;
    &.disabled {
      background: #999;
      outline: none;
      border: 1px solid #999;
    }
  }
}

.switch-box {
  padding-top: 100rem;
  .item {
    display: flex;
    align-items: center;
    padding: 0 25rem;
    margin-bottom: 69rem;

    .label {
      width: 112rem;
      font-size: 32rem;
      color: #333333;
    }
    .radio-group {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 32rem;
      color: #333333;
      & > div {
        width: 50%;
      }
    }
  }
  .item2 {
    align-items: start;
    .radio-group2 {
      flex: 1;
      font-size: 32rem;
      color: #333333;
      .r1 {
        margin-bottom: 35rem;
      }
      .weight-number {
        display: flex;
        align-items: center;
      }
      .weight-input {
        width: 170rem;
        height: 67rem;
        border: 1px solid #e2e2e2;
        margin: 0 15rem 0 25rem;
      }
    }
  }
  .btn {
    padding: 5rem 25rem;
  }
  .activeIcon {
    width: 30rem;
    height: 30rem;
    background: #155bbb;
    border-radius: 50%;
  }
  .inactiveIcon {
    width: 30rem;
    height: 30rem;
    background: #ffffff;
    border: 2px solid #999999;
    border-radius: 50%;
  }
}
.pay-number ::placeholder {
  color: #e2e2e2;
}
</style>
