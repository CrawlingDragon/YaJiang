<template>
  <div class="hospital_fast_nav-container" v-show="showFlag">
    <div class="wrap">
      <div class="top">
        <div class="kind f22">医院导航</div>
        <van-icon name="cross" class="cross" @click="closeNav" />
      </div>
      <div class="nav-box">
        <div class="title f18">会员服务<span>专属会员服务，一站式解决作物问题</span></div>
        <van-grid class="nav-ul" :border="false" :gutter="10" :column-num="old ? 3 : 4">
          <van-grid-item text="线上网诊" @click="goToOnline" />
          <template v-for="nav in hospitalSettingNav">
            <van-grid-item
              :text="nav.name"
              @click="goCustomPage(nav.label)"
              v-if="hospitalIsStore == 1 && nav.state == 1"
            />
          </template>
          <!-- 
          <van-grid-item text="测土配方" @click="goToCeTu" v-if="hospitalIsStore == 1" />
          <van-grid-item text="专家挂号" @click="goToRegistration" v-if="hospitalIsStore == 1" />
          <van-grid-item text="直播" @click="goToLive" v-if="false" /> -->

          <van-grid-item text="资讯" @click="goToMessage" />
          <van-grid-item text="专家" @click="goToExpert" />
          <van-grid-item
            text="优质基地"
            @click="goToGoodBase"
            v-if="hospitalIsStore == 1"
            v-show="false"
          />
          <van-grid-item text="会员提问" @click="goToAsk" v-if="hospitalIsStore == 1" />
          <van-grid-item text="简介" @click="goToIntro" />
        </van-grid>
      </div>
      <div
        class="join-btn f20"
        @click="goToApply"
        v-if="hospitalIsStore == 1 && hospitalIsMember == 0"
      >
        <!-- v-if="hospitalIsStore == 1 && hospitalIsMember == 0" -->
        申请加入医院
        <span class="free f14">免费</span>
      </div>
      <div class="joined" v-if="joinTime">{{ joinTime }} 加入医院成为会员</div>
      <div class="know-vip f18" @click="goToVip" v-show="hospitalIsStore == 1">
        了解更多会员权益 >
      </div>
      <div class="go-index" @click="gotoHospitalIndex">
        <div class="box f18">
          <van-image class="logo" :src="hospitalLogo"></van-image>
          <div class="name">{{ hospitalName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, useStore } from 'vuex';
import { Dialog } from 'vant';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useHospitalNav } from '@/common/js/useHospitalNav';
export default {
  name: 'hospitalFastNav',
  setup() {
    const store = useStore();
    const router = useRouter();
    const old = computed(() => store.state.old);

    //快速导航配置内容
    const hospitalSettingNav = computed(() => store.state.hospitalSettingNav);
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

    return { old, hospitalSettingNav, goCustomPage };
  },
  props: {
    showFlag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'mid',
      'uId',
      'joinTime',
      'hospitalName',
      'hospitalIsStore',
      'hospitalIsMember',
      'hospitalLogo',
    ]),
  },
  watch: {},
  mounted() {},
  methods: {
    closeNav() {
      this.$emit('changeFlag', false);
    },
    goToOnline() {
      // 路由  网上巡诊
      this.$router
        .push({
          path: 'hospital_online',
        })
        .catch((err) => err);
      this.$emit('changeFlag', false);
    },
    goToZuo() {
      // 路由 坐诊巡诊
      if (this.uId == '' || this.uId == undefined) {
        this.$router.push({
          path: 'zuozhen_list',
        });
        return;
      }
      if (this.hospitalIsMember == 0) {
        this.$dialog
          .confirm({
            message: '抱歉坐诊巡诊是会员服务，请先申请加入医院再访问',
            cancelButtonText: '申请加入会员',
            confirmButtonText: '好的',
            cancelButtonColor: '#155BBB',
            confirmButtonColor: '#999',
          })
          .then(() => {})
          .catch(() => {
            this.$router.push({
              path: '/apply_vip',
            });
          });
      } else {
        this.$router
          .push({
            path: 'zuozhen_list',
          })
          .catch((err) => err);
      }
      this.$emit('changeFlag', false);
    },
    goToCeTu() {
      // 路由 测土配方
      if (this.uId == '' || this.uId == undefined) {
        this.$router.push({
          path: 'cetu_list',
        });
        return;
      }
      if (this.hospitalIsMember == 0) {
        this.$dialog
          .confirm({
            message: '抱歉测土配方是会员服务，请先申请加入医院再访问',
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
        this.$router
          .push({
            path: 'cetu_list',
          })
          .catch((err) => err);
      }

      this.$emit('changeFlag', false);
    },
    goToRegistration() {
      // 路由 专家挂号
      if (this.uId == '' || this.uId == undefined) {
        this.$router.push({
          path: '/expert_registration',
        });
        return;
      }
      if (this.hospitalIsMember == 0) {
        this.$dialog
          .confirm({
            message: '抱歉专家挂号是会员服务，请先申请加入医院再访问',
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
        this.$router
          .push({
            path: '/expert_registration',
          })
          .catch((err) => err);
      }
      this.$emit('changeFlag', false);
    },
    goToMessage() {
      // 路由 资讯
      this.$router.push({ path: '/hospital_message' }).catch((err) => err);
      this.$emit('changeFlag', false);
    },
    goToAsk() {
      // 路由 提问
      if (this.hospitalIsMember == 0) {
        this.$dialog
          .confirm({
            message: '抱歉会员提问是会员服务，请先申请加入医院再访问',
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
      this.$emit('changeFlag', false);
    },
    goToExpert() {
      // 路由 医院专家
      this.$router
        .push({
          path: '/hospital_expert',
        })
        .catch((err) => err);
      this.$emit('changeFlag', false);
    },
    goToGoodBase() {
      // 路由 优质基地
      this.$router
        .push({
          path: '/good_base',
        })
        .catch((err) => err);
      this.$emit('changeFlag', false);
    },
    goToLive() {
      // 路由 直播
      this.$router
        .push({
          path: '/live',
        })
        .catch((err) => err);
      this.$emit('changeFlag', false);
    },
    goToIntro() {
      // 路由 简介
      this.$router.replace({
        path: '/hospital_intro',
      });
      // .catch((err) => err);
      this.$emit('changeFlag', false);
    },
    gotoHospitalIndex() {
      // 路由 去医院首页
      this.$router
        .push({
          path: '/hospital',
        })
        .catch((err) => err);
      this.$emit('changeFlag', false);
    },
    goToVip() {
      this.$router
        .push({
          path: '/vip',
        })
        .catch((err) => err);
      this.$emit('changeFlag', false);
    },
    goToApply() {
      this.$router
        .push({
          path: '/apply_vip',
        })
        .catch((err) => err);
      this.$emit('changeFlag', false);
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .hospital_fast_nav-container {
    .top {
      height: 55px;
      line-height: 55px;

      .cross {
        width: 71px;
        font-size: 40px;
        line-height: 55px;
      }
    }
    .nav-box {
      .title {
        span {
          display: none;
        }
      }
    }
    .nav-ul {
      :deep().van-grid-item__text {
        font-size: 20px;
      }
    }
  }
}
.hospital_fast_nav-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #f6f7f8;
  z-index: 111;
  .wrap {
    background: #fff;
  }
  .top {
    display: flex;
    height: 40px;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid $border-color;
    .kind {
      font-size: 14px;
      color: #363a44;
      margin-left: 12px;
      flex: 1;
    }
    .cross {
      width: 45px;
      border-left: 1px solid #e5e5e5;
      height: 100%;
      text-align: center;
      font-size: 15px;
      line-height: 40px;
      color: #9d9d9d;
    }
  }
  .join-btn {
    width: auto;
    margin: 24px 16px 0;
    color: #fff;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    position: relative;
    border-radius: 49px;
    background: $theme-three-color;
    .free {
      position: absolute;
      right: 23px;
      top: 8px;
      font-size: 12px;
      line-height: 12px;
    }
  }
  .go-index {
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    color: $theme-color;
    font-size: 14px;
    text-align: center;
    .box {
      border-radius: 36px;
      display: inline-block;
      padding: 8px 20px;
      line-height: 1.12;
      border: 1px solid $border-color;
      color: $theme-color;
      .logo {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        vertical-align: middle;
        border-radius: 100%;
        overflow: hidden;
      }
      & > .name {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .joined {
    color: #363a44;
    font-size: 12px;
    text-align: center;
    margin: 40px auto 16px;
    line-height: 1.12;
  }
  .know-vip {
    color: $theme-color;
    font-size: 12px;
    padding: 16px 0 24px;
    text-align: center;
    line-height: 1.12;
  }
  .nav-box {
    background: #fff;
    .title {
      font-size: 12px;
      padding-left: 12px;
      line-height: 41px;
      color: $f-color;
    }
    span {
      margin-left: 9px;
      color: $f-color-second;
      font-size: 12px;
    }
  }
}
.nav-ul {
  font-size: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
  :deep().van-grid-item__content {
    background: #f6f6f6;
    text-align: center;
    padding: 8px 0;
    border-radius: 8px;
  }
  :deep().van-grid-item__text {
    color: $f-color;
    font-size: 16px;
    padding: 0;
  }
}
</style>
