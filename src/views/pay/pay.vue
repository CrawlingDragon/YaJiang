<template>
  <div class="pay-container">
    <Header :indexHeader="false"></Header>
    <div class="pay-info">
      <div class="pay-object">
        <div class="object">
          <div class="name-kind">付款给采摘户</div>
          <div class="name">扎西</div>
          <div class="company">雅江县永康绿色食品有限责任公司</div>
        </div>
        <van-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="avatar"
        />
      </div>
      <div class="pay-number">
        ¥
        <input type="number" class="number" placeholder="100" v-model="moneyNumber" />
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
          <div class="bank-name">农行掌上银行支</div>
          <van-radio name="bank1" class="radio" checked-color="#FF6600"></van-radio>
        </div>
        <div class="item" @click="checked = 'bank2'">
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
          <van-radio-group v-model="checkedKind" class="radio-group">
            <van-radio name="xian" checkedColor="#155BBB">鲜品松茸</van-radio>
            <van-radio name="gan" checkedColor="#155BBB">干片松茸</van-radio>
          </van-radio-group>
        </div>
        <div class="item item2">
          <div class="label">重量</div>
          <van-radio-group v-model="checkedWeight" class="radio-group2">
            <van-radio name="auto" class="r1" checkedColor="#155BBB">自动计算重量</van-radio>
            <van-radio name="manual" checkedColor="#155BBB">
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
          <van-button round block type="primary" class="btn" @click="switchKindBtnFn"
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useTitles } from '@/common/js/useTitles';
import Header from '@/components/header/header.vue';
import { Toast } from 'vant';

// const kinds = {
//   xian: '鲜品松茸',
//   gan: '干片松茸',
// };

useTitles('支付');

// 选择支付方式 => 单选按钮
const checked = ref('bank1');
// 切换内容的显示隐藏
const show = ref(false);
// 种类切换 =＞　单选按钮
const checkedKind = ref('xian');
// 重量切换 => 单选按钮
const checkedWeight = ref('auto');
// 立即支付按钮的禁用
const disabled = ref(true);
// 立即支付按钮 ，是否可以再次点击
const canSubmit = ref(true);
//支付金额
const moneyNumber = ref('');
//选择的类型
const kindComputed = computed(() => {
  return checkedKind.value === 'xian' ? '鲜品松茸' : '干片松茸';
});
// 重量数值
const weightValue = ref('');

// 切换松茸品种，种类
const switchKindFn = () => {
  show.value = true;
};
// 切换松茸种类=>确定按钮
const weightInput = ref();
const switchKindBtnFn = () => {
  if (checkedWeight.value === 'manual' && weightValue.value == '') {
    Toast('重量不能为空!');
    weightInput.value.focus();
    return;
  }
  console.log('weightValue', weightValue.value);
  show.value = false;
};
// 立即支付
const payNowFn = () => {
  if (moneyNumber.value == '') {
    Toast('请输入金额');
    return;
  }
  if (!canSubmit.value) return;
  canSubmit.value = false;
  Toast.loading('支付中...');
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
