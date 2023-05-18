<template>
  <div class="collect-container">
    <Header :indexHeader="false"></Header>
    <CollectApplyStepBar :step="2" step-text="填写商户资料" />
    <van-form @submit="onSubmit">
      <van-cell-group>
        <template v-if="sub_mer_type != 1">
          <van-field
            v-model="sub_mer_name"
            name="商户名"
            label="商户名"
            placeholder="商户名"
            :rules="[{ required: true, message: '请填写商户名' }]"
          />
          <van-field
            v-model="company_cert_no"
            name="营业执照"
            label="营业执照"
            placeholder="营业执照"
            :rules="[{ required: true, message: '请填写营业执照' }]"
          />
          <!-- <div class="item van-cell">
          <label for="" class="van-field__label">营业执照</label>
          <div class="text">1452896325874523xt</div>
        </div> -->
          <van-field
            name="uploader"
            label="营业执照照片"
            class="upload"
            :rules="[{ required: true, message: '请上传营业执照照片' }]"
          >
            <template #input>
              <Upload @updateImgs="updateCompanyImgs" />
            </template>
          </van-field>

          <!-- <van-field
          v-model="company_address"
          name="经营地"
          label="经营地"
          placeholder="经营地地区信息"
          @click="areaShow = true"
          :rules="[{ required: true, message: '经营地地区信息' }]"
        /> -->
          <van-field
            readonly
            required
            clickable
            name="经营地"
            v-model="region"
            label="经营地"
            placeholder="经营地地区信息"
            @click="showArea = true"
            :rules="[{ required: true, message: '点击选择经营地地区信息' }]"
          />
          <van-popup v-model:show="showArea" position="bottom">
            <!-- <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" /> -->
            <van-cascader
              v-model="cascaderValue"
              title="点击选择省,市,区,乡镇"
              :options="options.arr"
              @close="showArea = false"
              @finish="onFinish"
            />
          </van-popup>
          <van-field
            v-model="address"
            name="详细地址"
            label="详细地址"
            placeholder="经营地详细地址"
            :rules="[{ required: true, message: '经营地详细地址' }]"
            class="border-bottom-20rem"
          />
        </template>
        <van-field
          v-model="contact_name"
          :name="sub_mer_type == 1 ? '经营者' : '法人姓名'"
          :label="sub_mer_type == 1 ? '经营者' : '法人姓名'"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写法人姓名' }]"
        />
        <van-field
          v-model="certificate_no"
          :name="sub_mer_type == 1 ? '经营者身份证' : '法人姓名身份证'"
          :label="sub_mer_type == 1 ? '经营者身份证' : '法人姓名身份证'"
          placeholder="身份证"
          :rules="[{ required: true, message: '请填写法人身份证' }]"
        />
        <van-field
          name="uploader"
          label="法人身份证照片"
          class="upload"
          :rules="[{ required: true, message: '请上传法人身份证照片' }]"
        >
          <template #input>
            <Upload upload-text="身份证正面" @updateImgs="updateIdFrontImgs" />
            <Upload upload-text="身份证反面" @updateImgs="updateIdBackImgs" />
            <!-- <van-uploader v-model="idcard_front" /> -->
            <!-- <van-uploader v-model="idcard_back" /> -->
          </template>
        </van-field>
        <van-field
          readonly
          v-model="certificate_beg_date"
          @click="showDate = true"
          name="证件起始时间"
          label="证件起始时间"
          placeholder="证件有效期起始时间"
          :rules="[{ required: true, message: '请填写证件起始时间' }]"
        />
        <van-popup v-model:show="showDate" position="bottom" :style="{ height: '30%' }">
          <van-datetime-picker
            v-model="starDate"
            type="date"
            title="选择年月日"
            @confirm="confirmDateStar"
            :min-date="minDate"
            @cancel="closeDate"
        /></van-popup>
        <div class="time-btn-wrap">
          <van-field
            readonly
            v-model="fr_cert_end_date"
            name="证件结束时间"
            label="证件结束时间"
            placeholder="证件有效期结束时间"
            :rules="[{ required: true, message: '请填证件结束时间' }]"
            @click.capture="endShowDate = true"
          >
            <template #button> </template>
          </van-field>
          <div class="time-btn" @click="writeCardEndTime">长期</div>
        </div>
        <van-popup v-model:show="endShowDate" position="bottom" :style="{ height: '30%' }">
          <van-datetime-picker
            v-model="endDate"
            type="date"
            title="选择年月日"
            @confirm="confirmDateEnd"
            :min-date="minDate"
            @cancel="closeDate"
        /></van-popup>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" class="sub"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import CollectApplyStepBar from '@/components/collect_apply_step_bar/collect_apply_step_bar.vue';
import { ref, computed, onMounted } from 'vue';
import Upload from '@/components/upload/upload.vue';
import { area } from '@/common/js/area_level4.js';
import { Toast } from 'vant';
import { useStore } from 'vuex';
import { formatDate } from '@/common/js/util';
import { applyTwoStep } from '@/service/base';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const props = defineProps({
  apply_step: {
    type: Number,
    default: 1,
  },
  sub_mer_type: {
    type: Number,
    default: 1,
  },
  userInfo: {
    type: Object,
    default: function () {
      return {};
    },
  },
});

const sub_mer_name = ref(''); //商户名称
const company_cert_no = ref(''); //商户号
const company_cert_img = ref(''); //营业执照照片
const region = ref(''); //经营地省市区
const address = ref(''); //详细地址
const contact_name = ref(''); //法人姓名
const certificate_no = ref(''); //法人身份证
const idcard_front = ref(''); //身份证正面
const idcard_back = ref(''); //身份证反面
const certificate_beg_date = ref(); //身份证起始时间
const fr_cert_end_date = ref(); //身份证结束时间
//===== 选择地址相关
const showArea = ref(false);
const cascaderValue = ref(''); // 完整选择的四级地址
const province = ref(''); // 用于传输数据的省
const city = ref(''); // 用于传输数据的市
const town = ref(''); // 用于传输数据的区
const residecommunity = ref(''); // 用于传输数据的县

const starDate = ref();
const showDate = ref(false);
const minDate = new Date(1999, 0, 1);
const endDate = ref();
const endShowDate = ref(false);

const uId = computed(() => store.state.uId);
//接口传回的默认地址，选四级地址限定在默认地址之内
//province: "四川省",city: "甘孜州",town: "雅江县",street: ""
const defaultRegin = computed(() => store.getters.getterDefaultRegion);
//根据defaultRegin 返回地区选择的 配置项
const options = computed(() => {
  let arr: any = [];
  let cascaderValue = '';
  if (defaultRegin.value.province == '') {
    // 如果省为空，配置项直接是默认配置
    arr = area;
    cascaderValue = '';
  }
  area.forEach((element: any) => {
    if (element.text == defaultRegin.value.province) {
      // arr唯一项 等于 对应的省内容
      arr[0] = element;
      cascaderValue = element.value;
      if (defaultRegin.value.city == '') {
        // 如果市为空，则退出循环
        return;
      }
      element.children.forEach((item2: any) => {
        if (item2.text == defaultRegin.value.city) {
          // console.log('item', item);
          // 重置市对象的children内容，也就是删除不符合的项
          arr[0].children = [];
          // 然后唯一项设置为对应的市内容
          arr[0].children[0] = item2;
          cascaderValue = item2.value;
          if (defaultRegin.value.town == '') {
            // 如果区为空，则退出循环
            return;
          }
          // 区和县的内容 和省市 相同
          item2.children.forEach((item3: any) => {
            if (item3.text === defaultRegin.value.town) {
              arr[0].children[0].children = [];
              arr[0].children[0].children[0] = item3;
              cascaderValue = item3.value;
              if (defaultRegin.value.street == '') {
                // 如果县为空 就退出
                return;
              }
              item3.children.forEach((item4: any) => {
                arr[0].children[0].children[0].children = [];
                arr[0].children[0].children[0].children[0] = item4;
                cascaderValue = item4.value;
              });
            }
          });
        }
      });
    }
  });
  // console.log('arr', arr);
  return { cascaderValue, arr };
});

//选择四级地址函数
const onFinish = ({ selectedOptions }: any) => {
  showArea.value = false;
  region.value = selectedOptions.map((option: any) => option.text).join(',');
  province.value = selectedOptions[0].text;
  city.value = selectedOptions[1].text;
  town.value = selectedOptions[2]?.text;
  residecommunity.value = selectedOptions[3] ? selectedOptions[3].text : '';
};
const updateCompanyImgs = (imgs: any) => {
  // console.log('imgs', imgs);
  company_cert_img.value = imgs.imgFetchList[0];
};
const updateIdFrontImgs = (imgs: any) => {
  console.log('imgs', imgs);
  idcard_front.value = imgs.imgFetchList[0];
};
const updateIdBackImgs = (imgs: any) => {
  console.log('imgs', imgs);
  idcard_back.value = imgs.imgFetchList[0];
};

// 选择时间
const confirmDateStar = (val: string) => {
  console.log('val', val);
  showDate.value = false;
  certificate_beg_date.value = formatDate(val);
};
const confirmDateEnd = (val: string) => {
  // console.log('val', val);
  endShowDate.value = false;
  fr_cert_end_date.value = formatDate(val);
};
const closeDate = () => {
  showDate.value = false;
  endShowDate.value = false;
};
//身份证结束时间，点击“长期”按钮，赋值为2099-12-31
const writeCardEndTime = () => {
  endShowDate.value = false;
  fr_cert_end_date.value = '2099-12-31';
};
const onSubmit = async (values: any) => {
  console.log('submit', values);
  let params = {
    uId: uId.value,
    apply_step: props.apply_step + 1,
    sub_mer_name: sub_mer_name.value,
    company_cert_no: company_cert_no.value,
    company_cert_img: company_cert_img.value,
    contact_name: contact_name.value,
    certificate_no: certificate_no.value,
    idcard_front: idcard_front.value,
    idcard_back: idcard_back.value,
    region: region.value,
    address: address.value,
    certificate_beg_date: certificate_beg_date.value,
    fr_cert_end_date: fr_cert_end_date.value,
  };
  let r = await applyTwoStep(params);
  if (r.code) {
    Toast(r.message);
    return;
  }
  console.log('r', r);
  router.push({ path: '/collect_apply_three' });
};

onMounted(() => {
  if (props.userInfo.abc_state !== '3') {
    sub_mer_name.value = props.userInfo.sub_mer_name;
    company_cert_no.value = props.userInfo.company_cert_no;
    company_cert_img.value = props.userInfo.company_cert_img;
    region.value = props.userInfo.region;
    address.value = props.userInfo.address;
    contact_name.value = props.userInfo.contact_name;
    certificate_no.value = props.userInfo.certificate_no;
    idcard_front.value = props.userInfo.idcard_front;
    idcard_back.value = props.userInfo.idcard_back;

    certificate_beg_date.value = props.userInfo.certificate_beg_date;
    fr_cert_end_date.value = props.userInfo.fr_cert_end_date;

    console.log('1', 1);
  }
});
</script>
<style lang="scss" scoped>
.van-cell {
  min-height: 120rem;
  padding-top: 33rem;
}
:deep().van-field__label {
  font-size: 32rem;
  color: #333333;
}
.border-bottom-20rem {
  border-bottom: 20rem solid #f6f7f8;
}
// .item {
//   display: flex;
//   align-items: center;
//   height: 120rem;
// }
.text,
:deep().van-field__control {
  font-size: 32rem;
  color: #333333;
}
:deep().van-field__control::placeholder {
  font-size: 32rem;
  color: #999;
}
.upload {
  min-height: 230rem;
}
.time-btn-wrap {
  position: relative;
}
.time-btn {
  position: absolute;
  right: 50rem;
  top: 50%;
  margin-top: -22rem;
  width: 100rem;
  height: 44rem;
  line-height: 44rem;
  background: #ffffff;
  border: 1px solid #155bbb;
  border-radius: 22rem;
  font-size: 24rem;
  color: #155bbb;
  text-align: center;
}
.sub {
  width: 400rem;
  height: 70rem;
  background: #155bbb;
  border-color: #155bbb;
  border-radius: 35rem;
  margin: 0 auto;
}
</style>
