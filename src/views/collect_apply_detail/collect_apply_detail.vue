<template>
  <div class="apply-detail-container">
    <Header :indexHeader="false" />
    <van-cell-group class="alone">
      <van-cell
        title="商户类型"
        :value="
          info.sub_mer_type == 1 ? '个体工商户' : info.sub_mer_type == 2 ? '企业商户' : '个体工商户'
        "
        size="large"
      />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="商户名" :value="info.sub_mer_no" size="large" />
      <van-cell title="营业执照" :value="info.company_cert_no" size="large" />
      <van-cell title="营业执照照片" size="large">
        <template #right-icon>
          <img :src="info.company_cert_img" alt="" class="img" />
        </template>
      </van-cell>
      <van-cell title="经营地" :value="info.region" size="large" />
      <van-cell title="详细地址" :value="info.address" size="large" />
    </van-cell-group>
    <van-cell-group class="alone">
      <van-cell title="法人姓名" :value="info.contact_name" size="large" />
      <van-cell title="法人身份证" :value="info.certificate_no" size="large" />
      <van-cell title="法人身份证照片" size="large">
        <template #right-icon>
          <img :src="info.idcard_front" alt="" class="img" />
          <img :src="info.idcard_back" alt="" class="img" />
        </template>
      </van-cell>
      <van-cell title="证件起始时间" :value="info.certificate_beg_date" size="large" />
      <van-cell title="证件结束时间" :value="info.fr_cert_end_date" size="large" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="农行账号" :value="info.account" size="large" />
      <van-cell title="银行预留手机号" :value="info.mobile_phone" size="large" />
      <van-cell title="收款码申请材料" size="large">
        <template #right-icon>
          <img :src="item" alt="" class="img" v-for="item in extend_imgs.split(',')" />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="btn" @click="goBackFn">返回</div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { ref, onMounted, computed } from 'vue';
import { useTitles } from '@/common/js/useTitles';
import { applyStatus } from '@/service/base';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

useTitles('收款码申请材料');

const store = useStore();
const router = useRouter();

const uId = computed(() => store.state.uId);

const info = ref<any>({});
const extend_imgs = ref('');

onMounted(async () => {
  let r = await applyStatus(uId.value);
  if (r.code) {
    Toast(r.message);
    return;
  }
  info.value = r;
  extend_imgs.value = r.extend_imgs;
  console.log('r', r);
});

const goBackFn = () => {
  router.go(-1);
};
</script>
<style lang="scss" scoped>
.alone {
  margin: 20rem 0;
}

.btn {
  width: 400rem;
  height: 70rem;
  line-height: 70rem;
  color: #fff;
  font-size: 30rem;
  background: #155bbb;
  border-radius: 35rem;
  margin: 48rem auto;
  text-align: center;
}
.img {
  border: 1px solid red;
  width: 140rem;
  height: 140rem;
  margin: 0 5rem;
}
</style>
