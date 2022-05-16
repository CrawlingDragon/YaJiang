<template>
  <div class="deal-box">
    <van-checkbox
      v-model="checkbox"
      icon-size="20px"
      class="checkbox"
      checked-color="#338aff"
    ></van-checkbox>
    我已阅读并同意<span @click="show = true">用户协议</span>与<span
      @click="privacyShow = true"
      >隐私政策</span
    >
  </div>
  <van-overlay :show="show" @click="show = false" z-index="20" :lock-scroll="false">
    <!-- 用户协议 -->
    <div class="wrapper" @click.stop>
      <div class="close-btn" @click="closeDeal">
        <van-icon name="cross" />
      </div>
      <h3>{{ privacyData.title }}</h3>
      <p class="text" v-html="privacyData.content"></p>
    </div>
  </van-overlay>
  <van-overlay
    :show="privacyShow"
    @click="privacyShow = false"
    z-index="20"
    :lock-scroll="false"
  >
    <!-- 隐私政策 -->
    <div class="wrapper" @click.stop>
      <div class="close-btn" @click="closePrivacy">
        <van-icon name="cross" />
      </div>
      <h3>{{ dealData.title }}</h3>
      <p class="text" v-html="dealData.content"></p>
    </div>
  </van-overlay>
</template>

<script>
import { watch, ref } from 'vue';
// import { useTitles } from '@/common/js/useTitles';;

export default {
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    // content: {
    //   type: Object,
    //   default: function() {
    //     return {};
    //   }
    // },
    // PrivacyContent: {
    //   type: Object,
    //   default: function() {
    //     return {};
    //   }
    // }
  },

  setup(props, { emit }) {
    const checkbox = ref(false);
    const show = ref(false);
    const privacyShow = ref(false);
    watch(checkbox, (newVal) => {
      emit('update:checked', newVal);
    });

    function closeDeal() {
      show.value = false;
    }
    function closePrivacy() {
      privacyShow.value = false;
    }
    return { checkbox, show, privacyShow, closeDeal, closePrivacy };
  },
  data() {
    return {
      dealData: {},
      privacyData: {},
    };
  },
  created() {
    this.getUserAgreement();
    this.getUserPrivacy();
  },
  methods: {
    getUserAgreement() {
      this.$axios.fetchGet('/Mobile/User/user_agreement').then((res) => {
        if (res.data.code === 0) {
          this.dealData = res.data.data;
        }
      });
    },
    getUserPrivacy() {
      this.$axios.fetchGet('/Mobile/User/service_agreement').then((res) => {
        if (res.data.code === 0) {
          this.privacyData = res.data.data;
        }
      });
    },
  },
};
</script>

<style lang="stylus">
.deal-box
  position relative
  padding-left 30px
  font-size 13px
  color #363A44
  .checkbox
    position absolute
    left 0
    top 0
  & > span
    color #333333
.wrapper
  width 100%
  height 100%
  margin 0 auto
  overflow auto
  background #fff
  padding 12px
  position relative
  font-family: Microsoft YaHei;
  .close-btn
    color #9D9D9D
    font-size 28px
    position absolute
    left 19px
    top 22px
  h3
    text-align center
    font-size 19px
    line-height 58px
  .text
    font-size 14px
</style>
