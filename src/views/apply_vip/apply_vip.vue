<template>
  <div class="apply_vip-container">
    <Header header="indexHeader" navHeader="申请会员"></Header>
    <van-form @submit="onSubmit">
      <van-field v-model="phone" name="phone" label="手机号" readonly />
      <van-field
        v-model="name"
        name="name"
        label="姓名"
        placeholder="请输入姓名"
        required
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        v-model="card"
        name="card"
        label="身份证"
        required
        :readonly="cardReadonly"
        placeholder="请输入身份证号码"
        :rules="[
          { validator, message: '请输入正确的身份证格式' },
          { required: true, message: '请输入身份证' },
        ]"
      />
      <!-- <van-number-keyboard
        :show="cardShow"
        extra-key="X"
        close-button-text="完成"
        @blur="cardShow = false"
        v-model="card"
      /> -->
      <van-field
        v-model="sex"
        name="sex"
        @click="sexShow = true"
        label="性别"
        placeholder="请选择"
        required
        readonly
        :rules="[{ required: true, message: '请选择性别' }]"
      />
      <van-action-sheet v-model:show="sexShow" :actions="actions" @select="onSelectSex" />
      <van-field
        readonly
        required
        clickable
        name="address"
        v-model="address"
        label="地区选择"
        placeholder="点击选择省,市,区,乡镇"
        @click="showArea = true"
        :rules="[{ required: true, message: '点击选择省,市,区,乡镇' }]"
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
        v-model="detailAddress"
        name="detailAddress"
        label="详细地址"
        placeholder="请输入村名,如松茸村"
        required
        :rules="[{ required: true, message: '请输入村名,如松茸村' }]"
      />
      <template v-if="cropState === 1">
        <div class="title f18" v-if="cropState === 1">作物情况</div>

        <div class="add-box" v-for="(item, index) in addList" :key="index">
          <van-field
            v-model="item.name"
            name="item.name"
            label="作物名"
            placeholder="请选择"
            readonly
            :rules="[{ required: item.required, message: '作物必填' }]"
            @click="goToChooseCrop(index)"
          />
          <van-field
            v-model="item.mushu"
            name="数量"
            label="数量"
            placeholder="请选择"
            type="number"
          >
            <template #button>
              <select name="" id="" class="select" v-model="item.unit">
                <option value="亩">亩</option>
                <option value="尾">尾</option>
                <option value="箱">箱</option>
                <option value="头">头</option>
                <option value="羽">羽</option>
                <option value="只">只</option>
                <option value="棒">棒</option>
              </select>
            </template>
          </van-field>
          <div class="close" @click="removeItem(index)">x</div>
        </div>
        <div class="add-btn f18" @click="add"><span>+</span>添加作物</div>
      </template>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" class="subBtn f20">
          提交会员申请
        </van-button>
      </div>
    </van-form>
    <div class="bottom-title f14">申请加入会员，享受会员服务</div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" @getCrop="choosedCrop" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import Header from '@/components/hospital_header/hospital_header';
import areaList from '@/common/js/area';
import { mapState, mapGetters, useStore } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
import { ref, computed } from 'vue';
import { area } from '@/common/js/area_level4.js';
import { isCardNo } from '@/common/js/util';
export default {
  name: 'applyVip',
  components: { Header },
  props: {},
  setup() {
    useTitles('申请会员');
    const store = useStore();
    const showArea = ref(false);
    const address = ref('');
    const cascaderValue = ref(''); // 完整选择的四级地址
    const province = ref(''); // 用于传输数据的省
    const city = ref(''); // 用于传输数据的市
    const town = ref(''); // 用于传输数据的区
    const residecommunity = ref(''); // 用于传输数据的县

    // 选项列表，children 代表子选项，支持多级嵌套
    // const options = area;

    //接口传回的默认地址，选四级地址限定在默认地址之内
    //province: "四川省",city: "甘孜州",town: "雅江县",street: ""
    const region = computed(() => store.getters.getterDefaultRegion);

    //根据region 返回地区选择的 配置项
    const options = computed(() => {
      let arr = [];
      let cascaderValue = '';
      if (region.value.province == '') {
        // 如果省为空，配置项直接是默认配置
        arr = area;
        cascaderValue = '';
      }
      area.forEach((element) => {
        if (element.text == region.value.province) {
          // arr唯一项 等于 对应的省内容
          arr[0] = element;
          cascaderValue = element.value;
          if (region.value.city == '') {
            // 如果市为空，则退出循环
            return;
          }
          element.children.forEach((item2) => {
            if (item2.text == region.value.city) {
              // console.log('item', item);
              // 重置市对象的children内容，也就是删除不符合的项
              arr[0].children = [];
              // 然后唯一项设置为对应的市内容
              arr[0].children[0] = item2;
              cascaderValue = item2.value;
              if (region.value.town == '') {
                // 如果区为空，则退出循环
                return;
              }
              // 区和县的内容 和省市 相同
              item2.children.forEach((item3) => {
                if (item3.text === region.value.town) {
                  arr[0].children[0].children = [];
                  arr[0].children[0].children[0] = item3;
                  cascaderValue = item3.value;
                  if (region.value.street == '') {
                    // 如果县为空 就退出
                    return;
                  }
                  item3.children.forEach((item4) => {
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

    // 初始化地区选择的地址
    cascaderValue.value = options.value.cascaderValue;
    //选择四级地址函数
    const onFinish = ({ selectedOptions }) => {
      showArea.value = false;
      address.value = selectedOptions.map((option) => option.text).join('/');
      province.value = selectedOptions[0].text;
      city.value = selectedOptions[1].text;
      town.value = selectedOptions[2]?.text;
      residecommunity.value = selectedOptions[3] ? selectedOptions[3].text : '';
    };

    // 是否显示作物选项
    const cropState = computed(() => store.getters.getterDefaultZuowuState);
    return {
      province,
      city,
      town,
      residecommunity,
      options,
      onFinish,
      address,
      showArea,
      cascaderValue,
      region,
      cropState,
    };
  },
  data() {
    return {
      userInfo: '',
      name: '',
      phone: '1',
      card: '',
      sex: '',
      // province: '',
      // city: '',
      // town: '',
      // address: '',
      cardShow: false,
      sexShow: false,
      detailAddress: '',
      // showArea: false,
      addList: [
        {
          fid: '1',
          name: '',
          mushu: '',
          unit: '亩',
          required: false,
        },
      ],
      areaList: areaList, // 数据格式见 Area 组件文档
      actions: [{ name: '男' }, { name: '女' }],
      choosedIndex: 0, //选中的作物 数组index
      hospitalTown: '',
      cardReadonly: false,
    };
  },
  computed: {
    ...mapState(['mid', 'uId', 'hospitalName']),
    ...mapGetters(['initMid', 'getterDefaultCrop']),
    // cropNumberBoolean() {
    //   // 如果有作物，没有选择数量，则弹窗提示
    //   let x = true;
    //   this.addList.forEach((item) => {
    //     if (item.name != '') {
    //       if (item.mushu == '') {
    //         x = false;
    //       }
    //     }
    //   });
    //   return x;
    // },
    cropNameBoolean() {
      // 如果有作物数量，没有选择作物，则弹窗提示
      let x = true;
      this.addList.forEach((item) => {
        if (item.mushu != '') {
          if (item.name == '') {
            x = false;
          }
        }
      });
      return x;
    },
  },

  mounted() {
    this.initData();
  },

  watch: {
    addList: {
      handler(newVal) {
        // console.log('newVal', newVal);
        newVal.forEach((item) => {
          if (item.mushu != '') {
            item.required = true;
          } else {
            item.required = false;
          }
        });
      },
      deep: true,
    },
    uId() {
      this.getUserInfo();
    },
  },
  methods: {
    initData() {
      //用于初始化整个页面的数据，包括个人信息，默认作物
      this.getUserInfo();
      this.getHospitalTown();
      this.addList[0].name = this.getterDefaultCrop.name;
      this.addList[0].fid = this.getterDefaultCrop.num;
    },
    validator(val) {
      if (val == '') {
        return true;
      }
      if (this.cardReadonly) {
        return true;
      }
      return isCardNo(val);
    },

    add() {
      this.addList.push({
        fid: this.getterDefaultCrop.num,
        name: this.getterDefaultCrop.name,
        mushu: '',
        unit: '亩',
        required: false,
      });
    },
    onSelectSex(val) {
      this.sex = val.name;
      this.sexShow = false;
    },
    // onConfirm(values) {
    //   console.log(values);
    //   this.address = values.map((item) => item.name).join('/');
    //   this.province = values[0].name;
    //   this.city = values[1].name;
    //   this.town = values[2].name;
    //   this.showArea = false;
    // },
    onSubmit(values) {
      if (
        values.sex == '' ||
        values.name == '' ||
        values.address == '' ||
        values.detailAddress == ''
      ) {
        this.$dialog
          .alert({
            message: '提交失败，请修改信息后再提交',
            confirmButtonText: '知道了',
            confirmButtonColor: '#155BBB',
          })
          .then(() => {
            // on close
          });
        return;
      }
      // if (!this.cropNumberBoolean) {
      //   this.$toast('作物亩数不能为空');
      //   return;
      // }
      if (!this.cropNameBoolean) {
        this.$toast('作物名不能为空');
        return;
      }
      // 申请地址和医院地址不是同一个
      if (this.town != this.hospitalTown) {
        this.$dialog
          .confirm({
            message: '您的地址位置离医院较远,确定继续提交吗?',
            cancelButtonText: '继续提交',
            cancelButtonColor: '#155BBB',
            confirmButtonText: '我再想想',
            confirmButtonColor: '#999',
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
            this.apply();
          });
      } else {
        this.apply();
      }
    },
    apply() {
      this.$axios
        .fetchPost('Mobile/Mpublic/joinMpublic', {
          mId: this.mid,
          uId: this.uId,
          username: this.name,
          mobile: this.phone,
          idcard: this.card,
          sex: this.sex,
          province: this.province,
          city: this.city,
          town: this.town,
          residecommunity: this.residecommunity, //第四级地址
          address: this.detailAddress,
          zuowu: this.zuowuState === 1 ? this.addList : [],
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.name = '';
            this.card = '';
            this.sex = '';
            this.address = '';
            this.detailAddress = '';
            this.addList = [{ fid: '', name: '', mushu: '', unit: '亩' }];
            this.initData();
            this.$router.push({
              path: '/apply_vip_succeed',
            });
          }
          this.$toast(res.data.message);
        });
    },
    // validatorPhone(val) {
    //   if (val == "") {
    //     return true;
    //   }
    //   return /^1(3|4|5|6|7|8|9)\d{9}$/.test(val);
    // },
    removeItem(index) {
      this.addList.splice(index, 1);
    },
    choosedCrop(item) {
      // 选中了作物
      this.addList[this.choosedIndex].name = item.name;
      this.addList[this.choosedIndex].fid = item.fid;
    },
    goToChooseCrop(index) {
      this.choosedIndex = index;
      this.$router.push({
        path: '/apply_vip/ask_choose_crop',
        query: { crop: this.addList[this.choosedIndex].name },
      });
    },
    getUserInfo() {
      this.$axios
        .fetchPost('Mobile/User/userCenter', {
          uId: this.uId,
          mId: this.mid,
        })
        .then((res) => {
          if (res.data.code == 0) {
            // console.log('res.data', res.data);
            let data = res.data.data;
            this.phone = data.username;
            this.name = data.realname;
            if (data.idcard) {
              this.cardReadonly = true;
            } else {
              this.cardReadonly = false;
            }

            this.card = data.idcard;
            // console.log('res.data.data', res.data.data);
            // this.card = '待完成';
          }
        });
    },
    // 获取申请医院的镇 （地址），用来判断用户选择的地址和医院的地址远近
    getHospitalTown() {
      this.$axios
        .fetchPost('Mobile/Mpublic/MpublicPage', {
          mId: this.mid,
          uId: this.uId,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.hospitalTown = res.data.data.mpublic.town;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .apply_vip-container {
    .add-btn {
      width: 123px;
      height: 36px;
    }
    .bottom-title {
      font-size: 14px;
    }
  }
}
.apply_vip-container {
  .title {
    font-size: 12px;
    color: #656565;
    margin: 15px 0 5px;
    margin-left: 12px;
  }
  .add-box {
    position: relative;
    padding-right: 80px;
    background: #fff;
    margin-bottom: 10px;
    .close {
      width: 80px;
      height: 100%;
      position: absolute;
      right: 0;
      bottom: 0;
      line-height: 100%;
      border-left: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9d9d9d;
      font-size: 30px;
    }
    .select {
      outline: none;
      border: 1px solid $border-color;
      height: 30px;
      min-width: 60px;
      border-radius: 4px;
    }
  }
  .add-btn {
    width: 110px;
    height: 30px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $theme-color;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid $border-color;
    border-radius: 36px;
    span {
      margin-right: 10px;
    }
  }
  .bottom-title {
    color: #656565;
    font-size: 12px;
    text-align: center;
    margin: 18px 0 0;
    padding-bottom: 18px;
  }
  .subBtn {
    background: $theme-three-color;
    color: #fff;
  }
}
</style>
