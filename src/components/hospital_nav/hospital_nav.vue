<template>
  <div class="hospital_nav-container">
    <van-image :src="caseImg" class="bj-img"></van-image>
    <div class="bg"></div>
    <div class="titles">
      <div class="left-title f18">会员服务</div>
      <div class="right-title">
        {{ hospitalIsStore == 1 ? '专属会员服务，一站式解决作物问题' : '网院' }}
      </div>
    </div>
    <ul class="nav-ul" :class="{ isstore: hospitalIsStore == 0 }">
      <li @click="goToOnline">
        <div class="icon icon01"></div>
        <p>线上{{ getDefaultMenuName.questionName }}</p>
      </li>
      <template v-for="(item, index) in hospitalSettingNav" :key="item.label">
        <li @click="goCustomPage(item.label)" v-if="hospitalIsStore == 1 && item.state == 1">
          <div class="icon" :class="item.label"></div>
          <p>{{ item.name }}</p>
        </li>
      </template>
      <!-- <li @click="goToZuo" v-if="hospitalIsStore == 1">
        <div class="icon icon02"></div>
        <p>坐诊巡诊</p>
      </li>
      <li @click="goToCeTu" v-if="hospitalIsStore == 1">
        <div class="icon icon03"></div>
        <p>测土配方</p>
      </li>
      <li @click="goToRegistration" v-if="hospitalIsStore == 1">
        <div class="icon icon04"></div>
        <p>专家挂号</p>
      </li>
      <li @click="goToLive" v-if="hospitalIsStore == 0">
        <div class="icon icon12"></div>
        <p>培训</p>
      </li> -->

      <li @click="goToAsk" v-if="hospitalIsStore == 1">
        <div class="icon icon05"></div>
        <p>提问</p>
      </li>

      <li v-if="hospitalIsStore == 0" @click="goToExpert()">
        <div class="icon icon04"></div>
        <p>专家</p>
      </li>

      <li v-if="hospitalIsStore == 1 && hospitalIsMember == 1" @click="isVip">
        <div class="icon icon08"></div>
        <p>已是会员</p>
      </li>
      <li v-if="hospitalIsStore == 1 && hospitalIsMember == 0" @click="goToApplyVip">
        <div class="icon icon09"></div>
        <p class="p2">申请会员</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import { getHospitalFastNav } from '@/service/base';

import { Dialog } from 'vant';
import { useHospitalNav } from '@/common/js/useHospitalNav';
export default {
  name: 'hospitalNav',
  components: {},
  props: {
    ucuidHospital: {
      type: String,
      default: '0',
    },
    ismember: {
      type: Number,
      default: 0,
    },
    caseImg: {
      type: String,
      default: 'http://www.114nz.com/statics/images/httpsxone.114nz.com_default.png',
    },
  },
  setup() {
    const store = useStore();
    //快速导航配置内容
    const hospitalSettingNav = computed(() => store.state.hospitalSettingNav);
    const getDefaultMenuName = computed(() => store.getters.getDefaultMenuName);
    //坐诊巡诊,测土配方,挂号管理,人才培训对应的路由函数
    const { goToZuo, goToCeTu, goToRegistration, goToLive } = useHospitalNav();

    // label: "zuozhen"- "坐诊巡诊"
    // label: "cetu"- "测土配方"
    // label: "subscribe"-"挂号管理"
    // label: "tarin"-"人才培训"
    function goCustomPage(label) {
      switch (label) {
        case 'zuozhen':
          // 坐诊巡诊
          goToZuo();
          break;
        case 'cetu':
          // 测土配方
          goToCeTu();
          break;
        case 'subscribe':
          // 挂号管理
          goToRegistration();
          break;
        case 'tarin':
          // 人才培训
          goToLive();
          break;
      }
    }

    return { hospitalSettingNav, goCustomPage, getDefaultMenuName };
  },
  data() {
    return {
      bjSrc: '',
    };
  },
  computed: {
    ...mapState(['hospitalIsStore', 'hospitalIsMember', 'uId', 'mid', 'ucuid']),
  },
  watch: {},
  mounted() {},
  methods: {
    goToOnline() {
      // 路由 去线上网诊
      this.$router.push({ path: 'hospital_online' }).catch((err) => err);
    },

    goToAsk() {
      // 路由 提问
      if (this.uId == '' || this.uId == undefined) {
        this.$router.push({
          path: '/ask',
          query: { from: 'hospital' },
        });
        return;
      }
      if (this.hospitalIsMember == 0) {
        this.$dialog
          .confirm({
            message: `抱歉会员提问是会员服务，请先申请加入${this.getDefaultMenuName.hospitalName}再访问`,
            cancelButtonText: '申请加入会员',
            confirmButtonText: '好的',
            cancelButtonColor: '#155BBB',
            confirmButtonColor: '#999',
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
            this.$router.push({
              path: '/apply_vip',
            });
          });
      } else {
        this.$router.push({ path: '/ask', query: { from: 'hospital' } }).catch((err) => err);
      }
    },
    goToExpert() {
      // 路由 医院专家
      this.$router
        .push({
          path: '/hospital_expert',
        })
        .catch((err) => err);
    },
    goToGoodBase() {
      // 路由 优质基地
      this.$router
        .push({
          path: '/good_base',
        })
        .catch((err) => err);
    },
    goToApplyVip() {
      // 路由 申请会员
      this.$router
        .push({
          path: '/apply_vip',
        })
        .catch((err) => err);
    },

    isVip() {
      this.$dialog
        .confirm({
          message: '您已是会员',
          cancelButtonText: '查看会员权益',
          confirmButtonText: '好的',
          cancelButtonColor: '#155BBB',
          confirmButtonColor: '#999',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
          this.$router.push({
            path: '/vip',
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .hospital_nav-container {
    height: 243px;
    .titles {
      .right-title {
        display: none;
      }
    }
    .nav-ul {
      li {
        .icon {
          width: 44px;
          height: 44px;
          background-size: contain;
          background-position: center;
        }
        p {
          font-size: 18px;
        }
      }
    }
  }
}
.hospital_nav-container {
  margin-top: 10px;
  padding: 15px 0;
  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-position: center center;
  position: relative;
  // height: 190px;
  height: calc(100vw / 750) * 380;
  max-height: 330;
  margin-bottom: 10px;
  z-index: 1;
  .bj-img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
  }
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    left: 0;
    top: 0;
    z-index: 1;
  }
  .titles {
    z-index: 2;
    padding: 0 12px;
    position: relative;
    color: #fff;
    display: flex;
    justify-content: space-between;
    .right-title {
      font-size: 12px;
    }
  }
  .nav-ul {
    z-index: 2;
    position: relative;
    font-size: 0;
    margin-top: 5px;
    &.isstore {
      margin-top: 30px;
    }
    li {
      font-size: 12px;
      display: inline-block;
      color: $theme-secondary-color;
      width: 25%;
      margin-top: 15px;
      text-align: center;
      a {
        color: $theme-secondary-color;
      }
      .icon01 {
        width: 25px;
        height: 25px;
        background: url('./37.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .zuozhen {
        width: 25px;
        height: 24px;
        background: url('./44.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .cetu {
        width: 20px;
        height: 25px;
        background: url('./45.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .subscribe {
        width: 25px;
        height: 25px;
        background: url('./38.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .icon05 {
        width: 25px;
        height: 25px;
        background: url('./43.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .icon06 {
        width: 25px;
        height: 25px;
        background: url('./42.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .icon07 {
        width: 25px;
        height: 25px;
        background: url('./39.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .icon08 {
        width: 25px;
        height: 25px;
        background: url('./42.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .icon09 {
        width: 25px;
        height: 25px;
        background: url('./40.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .tarin {
        width: 25px;
        height: 25px;
        background: url('./53.png') no-repeat;
        background-size: contain;
        background-position: center center;
        margin: 0 auto 10px;
      }
      .p2 {
        color: $theme-three-color;
      }
    }
  }
}

:deep().van-dialog__content {
  font-size: 16px;
  :deep().van-dialog__message {
    font-size: 16px;
  }
}
</style>
