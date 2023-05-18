<template>
  <div class="collect-container">
    <Header :indexHeader="false"></Header>
    <div class="three"><CollectApplyStepBar :step="3" stepText="填写中国农业银行资料" /></div>
    <van-form @submit="onSubmit">
      <van-cell-group>
        <template v-if="sub_mer_type == 1">
          <!-- 用户类型为1，个人 -->
          <van-field
            v-model="account"
            name="农行账号"
            label="农行账号"
            placeholder="法人农行借记卡账号"
            :rules="[{ required: true, message: '请填写农行账号' }]"
        /></template>
        <template v-if="sub_mer_type == 2">
          <van-field
            v-model="account"
            name="对公账户"
            label="对公账户"
            placeholder="中国农业银行对公账号"
            :rules="[{ required: true, message: '请填写对公账户' }]"
          />
        </template>
        <template v-if="sub_mer_type == 3">
          <van-field
            v-model="account_type.text"
            name="农行账户类型"
            label="农行账户类型"
            placeholder="农行账户类型"
            readonly
            is-link
            @click="accountTypeShow = true"
            :rules="[{ required: true, message: '请选择农行账户类型' }]"
          />
          <van-popup v-model:show="accountTypeShow" class="material" position="bottom" round>
            <div class="item" @click="chooseAccountTypeFn(601, '对公账户')">对公账户</div>
            <div class="item" @click="chooseAccountTypeFn(401, '法人个人借记卡')">
              法人个人借记卡
            </div>
          </van-popup>
          <van-field
            v-model="account"
            name="农行账号"
            label="农行账号"
            placeholder="法人农行借记卡账号"
            :rules="[{ required: true, message: '请填写农行账号' }]"
            v-if="account_type.num == 401"
          />
          <van-field
            v-model="account"
            name="对公账户"
            label="对公账户"
            placeholder="中国农业银行对公账号"
            :rules="[{ required: true, message: '请填写对公账户' }]"
            v-if="account_type.num == 601"
          />
        </template>

        <van-field
          v-model="mobile_phone"
          name="银行预留手机号"
          label="银行预留手机号"
          placeholder="中国农业银行预留手机号"
          :rules="[{ required: true, message: '请填写银行预留手机号' }]"
        />
        <van-field
          name="uploader"
          label="银行账号证明材料"
          class="upload"
          :rules="[{ required: true, message: '请上传银行账号证明材料' }]"
        >
          <template #input>
            <Upload @updateImgs="updateCompanyImgs" :maxCount="9" :imgClass="true" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" class="sub">下一步</van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import CollectApplyStepBar from '@/components/collect_apply_step_bar/collect_apply_step_bar.vue';
import Upload from '@/components/upload/upload.vue';
import { ref, computed, watch, onMounted } from 'vue';
import { applyThreeStep } from '@/service/base';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const props = defineProps({
  sub_mer_type: {
    type: Number,
    default: 1,
  },
  apply_step: { type: Number, default: 1 },
});

const uId = computed(() => store.state.uId);

// 农行账户类型的文案和值
const account_type = ref({
  text: '',
  num: 1,
});
//寻找一个显示和数据相对的数据格式，比如枚举 or 其他
const accountTypeShow = ref(false);
const chooseAccountTypeFn = (type: number, text: string) => {
  account_type.value.num = type;
  account_type.value.text = text;
  accountTypeShow.value = false;
};
const account = ref();
const mobile_phone = ref();
const extend_imgs = ref([]);

const updateCompanyImgs = (imgs: any) => {
  console.log('imgs', imgs);
  extend_imgs.value = imgs.imgFetchList;
};

watch(
  () => props.sub_mer_type,
  () => {
    if (props.sub_mer_type == 3) {
      account_type.value.num = 401;
      account_type.value.text = '法人个人借记卡';
    } else if (props.sub_mer_type == 2) {
      account_type.value.num = 601;
    } else if (props.sub_mer_type == 1) {
      account_type.value.num = 401;
    }
  }
);
onMounted(() => {
  if (props.sub_mer_type == 3) {
    account_type.value.num = 401;
    account_type.value.text = '法人个人借记卡';
  } else if (props.sub_mer_type == 2) {
    account_type.value.num = 601;
  } else if (props.sub_mer_type == 1) {
    account_type.value.num = 401;
  }
});

const onSubmit = async () => {
  let r = await applyThreeStep(
    uId.value,
    props.apply_step + 1,
    account_type.value.num,
    account.value,
    mobile_phone.value,
    extend_imgs.value.join(',')
  );

  if (r.code) {
    Toast(r.message);
    return;
  }
  setTimeout(() => {
    router.push({
      path: '/collect_apply_four',
    });
  }, 1000);

  console.log('r', r);
};
</script>
<style lang="scss" scoped>
.van-cell {
  min-height: 120rem;
  padding-top: 33rem;
}
.upload {
  min-height: 230rem;
}
.sub {
  width: 400rem;
  height: 70rem;
  background: #155bbb;
  border-color: #155bbb;
  border-radius: 35rem;
  margin: 0 auto;
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
