<template>
  <div class="fast_nav-conatiner" v-if="showFlag">
    <div class="title van-hairline--top van-hairline--bottom">
      快速导航
      <van-icon name="cross" class="van-hairline--left" @click="closeBox" />
    </div>
    <div class="nav-list">
      <div class="small-title">新型庄稼医院</div>
      <van-grid :column-num="4" :border="false" style="">
        <van-grid-item>
          <div class="p" @click="goToHospital">找医院</div>
        </van-grid-item>
        <van-grid-item @click="goToExpert">
          <div class="p">找专家</div>
        </van-grid-item>
        <van-grid-item @click="goToBase">
          <div class="p">找基地</div>
        </van-grid-item>
        <van-grid-item v-if="false">
          <a :href="shareUrl" class="p" target="_blank">专享商城</a>
        </van-grid-item>

        <van-grid-item @click="lookForStore()">
          <div class="p">专享商城</div>
        </van-grid-item>
      </van-grid>
      <van-grid :column-num="4" :border="false">
        <van-grid-item @click="goToAnswer">
          <div class="p">找答案</div>
        </van-grid-item>
        <van-grid-item @click="goToZuoXun">
          <div class="p">坐诊巡诊</div>
        </van-grid-item>
        <van-grid-item @click="goToCetu">
          <div class="p">测土配方</div>
        </van-grid-item>
        <van-grid-item @click="goToAsk">
          <div class="p">提问</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="nav-list">
      <div class="small-title">平台服务</div>
      <van-grid :column-num="4" :border="false">
        <van-grid-item>
          <a :href="fromStoreUrl" class="p" target="_blank">农资商城</a>
        </van-grid-item>
        <van-grid-item @click="goToVideo">
          <div class="p">培训视频</div>
        </van-grid-item>
        <van-grid-item @click="goToDiseases">
          <div class="p">病虫害</div>
        </van-grid-item>
        <van-grid-item @click="goToLive">
          <div class="p">直播</div>
        </van-grid-item>
        <van-grid-item>
          <div class="p" @click="goToMessage">资讯</div>
        </van-grid-item>
        <van-grid-item @click="goToAi">
          <div class="p">AI智能专家</div>
        </van-grid-item>
        <van-grid-item @click="goToAboutUs">
          <div class="p">关于我们</div>
        </van-grid-item>
      </van-grid>
      <van-grid :column-num="4" :border="false"> </van-grid>
    </div>
    <div class="btns" v-if="!uId">
      <div class="btn1" @click="goToLogin">登录</div>
      <div class="btn2" @click="goToSign">注册</div>
    </div>
    <div class="logined" v-else>
      <van-image
        width="35"
        height="35"
        round
        :src="avatar"
        class="avator"
        fit="cover"
        @click="goToMe"
      />
      <p class="name" @click="goToMe">{{ userName }}</p>
      <div class="login-out" @click="loginOutFn">退出登录</div>
    </div>
    <div class="index-btn" @click="goToIndex">
      <div class="btn-content">
        <div class="logo"></div>
        <div class="name">益农宝·为农服务平台</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, useStore } from 'vuex';
import { Dialog } from 'vant';
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import lookForStoreFn from '@/common/js/lookForStore.js';
import { loginOut, login } from '@/common/js/getToken';

export default {
  props: {
    showFlag: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    // const router = useRouter();
    const userName = computed(() => store.state.userInfo.username);
    const avatar = computed(() => store.state.userInfo.avatar);
    const uId = computed(() => store.state.uId);
    const pathName = ref('');

    onMounted(() => {
      pathName.value = route.name;
    });

    // hooks
    // 找农资hook
    const { lookForStore } = lookForStoreFn(process.env.VUE_APP_SHARE_URL, hide);
    function hide() {
      emit('update:showFlag', false);
    }
    function goToLogin() {
      if (pathName.value == 'Login') {
        emit('update:showFlag', false);
      } else {
        // router.push({
        //   path: '/login',
        // });
        login();
      }
    }
    return {
      userName,
      avatar,
      uId,
      pathName,
      lookForStore,
      hide,
      goToLogin,
    };
  },
  name: 'fast_nav',
  components: {},
  data() {
    return {
      fromStoreUrl: process.env.VUE_APP_STORE_URL,
      shareUrl: process.env.VUE_APP_SHARE_URL,
    };
  },
  computed: {
    ...mapState(['initMid', 'aiExpertId', 'uId']),
  },
  methods: {
    ...mapMutations(['setMid']),
    ...mapActions(['cleanUserInfo']),
    closeBox() {
      this.$emit('changeFlag', false);
    },

    goToSign() {
      this.$router.push({
        path: '/sign',
      });
    },
    loginOutFn() {
      Dialog.confirm({
        message: '确认要退出登录吗',
        cancelButtonColor: '#155BBB',
        cancelButtonText: '确定',
        confirmButtonText: '取消',
        confirmButtonColor: '#999',
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel

          // this.$router.push({ path: '/login' });
          loginOut();
          this.cleanUserInfo();
        });
    },
    goToIndex() {
      // 路由 去首页
      this.$router.push({ path: '/' }).catch((err) => err);
      this.closeBox();
    },
    goToHospital() {
      this.$router.push({ path: '/into_hospital' }).catch((err) => err);
    },
    goToExpert() {
      this.setMid(this.initMid);
      this.$router.push({ path: '/look_expert' }).catch((err) => err);
    },
    goToLive() {
      this.setMid(this.initMid);
      this.$router.push({ path: '/live', query: { from: 'index' } }).catch((err) => err);
    },
    goToMessage() {
      this.$router.push({ path: '/message' }).catch((err) => err);
    },
    goToBase() {
      this.setMid(this.initMid);
      this.$router.push({ path: '/whole_base_list' }).catch((err) => err);
    },
    goToAnswer() {
      //  去首页的的网诊
      this.$router.push({ path: '/index_online' }).catch((err) => err);
    },
    goToZuoXun() {
      //  去坐诊巡诊页面，和我的坐诊巡诊页面是一样
      const path = this.$route.path;
      if (path === '/login') {
        this.$emit('update:showFlag', false);
      }
      this.$router.push({ path: '/whole_zuozhen_list' }).catch((err) => err);
    },
    goToCetu() {
      const path = this.$route.path;
      if (path === '/login') {
        this.$emit('update:showFlag', false);
      }
      this.$router.push({ path: '/whole_cetu_list' });
    },
    goToAsk() {
      const path = this.$route.path;
      if (path === '/login') {
        this.$emit('update:showFlag', false);
      }
      this.$router.push({ path: '/ask' }).catch((err) => err);
    },
    goToVideo() {
      this.$router.push({ path: '/video_list' }).catch((err) => err);
    },
    goToDiseases() {
      this.$router.push({ path: '/diseases' }).catch((err) => err);
    },
    goToAi() {
      // 去ai页面
      this.$router.push({ path: '/expert', query: { from: 'ai' } }).catch((err) => err);
    },
    goToAboutUs() {
      this.$router.push({ path: '/about_us' }).catch((err) => err);
    },
    goToMe() {
      this.closeBox();
      this.$router.push({ path: '/me' }).catch((err) => err);
    },
  },
};
</script>
<style lang="stylus" scoped>
.fast_nav-conatiner
  position fixed
  top 0
  bottom 0
  right 0
  left 50%
  transform translateX(-50%)
  background #EBEBEB
  z-index 11
  max-width 640px
  width 100%
  .title
    height 40px
    line-height 40px
    padding-left 12px
    color #999999
    font-size 14px
    background #fff
    border-bottom 1px solid #E5E5E5
    .van-icon
      width 45px
      font-size 14px
      float right
      line-height 40px
      text-align center
      border-left 1px solid #E5E5E5
  .nav-list
    background #fff
    padding-top 15px
    padding-bottom 13px
    border-bottom 1px solid #E5E5E5
    overflow hidden
    width 100%
    .small-title
      font-size 12px
      color #999999
      line-height 12px
      margin 0 0 15px 11px
    .p
      width 100%
      height 26px
      background rgba(246, 246, 246, 1)
      border-radius 8px
      color #333333
      font-size 15px
      text-align center
      line-height 26px
      margin 0 auto
      display block
    /deep/.van-grid-item__content
      padding-top 7px
      padding-bottom 7px
  .btns
    background #fff
    text-align center
    line-height 1.2
    padding 25px 21px
    & > div
      display inline-block
      width 80px
      height 30px
      text-align center
      line-height 30px
      border-radius 4px
      &:first-child
        margin-right 30px
    .btn1
      color $theme-color
      border 1px solid $theme-color
      font-size 16px
      vertical-align middle
    .btn2
      background $theme-color
      color #fff
      font-size 16px
      border 1px solid $theme-color
      vertical-align middle
  .logined
    background #fff
    height 76px
    display flex
    align-items center
    .avator
      margin 0 15px 0 12px
    .name
      font-size 16px
      color #333
      flex 1
    .login-out
      color $theme-color
      font-size 16px
      margin 0 12px
  .index-btn
    position absolute
    bottom 30px
    left 0
    right 0
    text-align center
    .btn-content
      display inline-block
      width auto
      margin 0 auto
      background rgb(248, 248, 248)
      border 1px solid $theme-color
      border-radius 4px
      line-height 30px
      font-size 16px
      // align-items center
      padding 0 15px
      color $theme-color
      position relative
      .logo
        width 20px
        height 20px
        margin-right 5px
        background url('../../assets/logo.png') no-repeat
        background-size 100% 100%
        background-position center
      & > div
        display inline-block
        vertical-align middle
</style>
