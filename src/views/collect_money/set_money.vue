<template>
  <van-popup v-model:show="show" position="bottom" round :style="{ height: 'auto' }" closeable>
    <div class="switch-box">
      <div class="item-money">
        <div class="title">设置金额</div>
        <div class="money-bar">
          <label for="money" class="label">¥</label>
          <input
            type="number"
            v-model="money"
            placeholder="100"
            id="money"
            class="money"
            ref="moneyInout"
            @input="handleInput"
          />
        </div>
      </div>
      <div class="item">
        <div class="label">品种</div>
        <van-radio-group v-model="checkedKind" class="radio-group">
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
                v-model="weightValue"
                type="number"
                ref="weightInput"
                class="weight-input"
              />kg
            </div>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="btn">
        <van-button
          round
          block
          type="primary"
          class="primary-btn"
          @click="switchKindBtnFn"
          :class="{ disabled: disabled }"
          >确定</van-button
        >
      </div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { Toast } from 'vant';
import { getSetCollectMoney } from '@/service/base';

const show = ref(false);
const money = ref<string | number>('');
const checkedKind = ref(1);
const is_auto = ref(1);
const weightValue = ref();
const disabled = ref(true);

const props = defineProps({
  codeId: {
    type: String,
    default: '',
  },
  money: {
    type: Number,
    default: 0,
  },
  type_id: {
    type: Number,
    default: 0,
  },
  is_auto: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
});

const kind = computed(() => {
  return checkedKind.value === 1 ? '鲜品松茸' : '干片松茸';
});
const weight = computed(() => {
  return is_auto.value === 1 ? 1 : weightValue.value;
});

const emits = defineEmits(['setMoneyEmit']);
onMounted(() => {
  if (props.money != 0) {
    money.value = props.money;
  }

  checkedKind.value = props.type_id;
  is_auto.value = props.is_auto;
  weightValue.value = props.weight;
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
  money.value = value;
};
// 切换松茸种类=>确定按钮
const weightInput = ref();
const moneyInout = ref();

//设置金额规格=> 确定按钮
const switchKindBtnFn = async () => {
  if (money.value == '') {
    Toast('金额不能为空!');
    moneyInout.value.focus();
    return;
  }
  if (is_auto.value === 0 && weightValue.value == '') {
    Toast('重量不能为空!');
    weightInput.value.focus();
    return;
  }
  let t = Toast.loading({
    duration: 0,
    message: '修改中...',
  });
  let r = await getSetCollectMoney(
    props.codeId,
    checkedKind.value,
    money.value,
    weightValue.value,
    is_auto.value
  );
  console.log('r', r);
  t.clear();
  if (r.message) {
    Toast(r.message);
    return;
  }
  // console.log('weightValue', weightValue.value);
  emits('setMoneyEmit', {
    money: r.amount,
    kind: kind.value,
    weight: r.weight,
    code_images: r.code_images,
    is_auto: is_auto.value,
  });
  show.value = false;
};
//重置设置金额的数据
const resetData = () => {
  money.value = '';
  checkedKind.value = 1;
  is_auto.value = 1;
  weightValue.value = '';
  disabled.value = true;
};
watch([money, weightValue, is_auto], ([n1, o1], [n2, o2]) => {
  // console.log('money', money.value);
  if (money.value != '') {
    if (is_auto.value === 0) {
      if (weightValue.value != '') {
        disabled.value = false;
      } else {
        disabled.value = true;
      }
    } else {
      disabled.value = false;
    }
  } else {
    disabled.value = true;
  }
});
defineExpose({ show, resetData });
</script>
<style lang="scss" scoped>
.switch-box {
  padding-top: 30rem;
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
    margin-bottom: 25rem;
    .disabled {
      background: #999;
      border: none;
    }
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
  .item-money {
    border-bottom: 1px solid #dcdcdc;
    margin-left: 25rem;
    margin-bottom: 60rem;
    margin-right: 33rem;
    .title {
      font-size: 32rem;
      color: #333333;
      margin-bottom: 30rem;
    }
    .money-bar {
      display: flex;
      align-items: center;
      padding-left: 33rem;
      // padding-bottom: 38rem;
      font-size: 150rem;
      line-height: 160rem;
      color: #333333;
      max-width: 100%;
      overflow: hidden;
      // height: 124rem;
      .label {
        width: 78rem;
        margin-right: 40rem;
      }
      .money {
        border: none;
        max-width: 70%;
      }
    }
    ::placeholder {
      color: #999;
    }
  }
}
</style>
