<template>
  <div class="fast_nav-conatiner" v-if="showFlag">
    <div class="title van-hairline--top van-hairline--bottom f22">
      快速导航
      <van-icon name="cross" class="van-hairline--left" @click="hide" />
    </div>
    <div class="nav-list" v-if="bar.hospitalColumnState === 1">
      <div class="small-title f18">{{ bar.hospitalColumnName }}</div>
      <van-grid :column-num="old ? 3 : 4" :border="false" style="">
        <van-grid-item v-for="item in bar.hospitalColumnMenu" @click="goToRouterPage(item.url)">
          <div class="p f20" @click="goToHospital">{{ item.name }}</div>
        </van-grid-item>
        <!-- <van-grid-item @click="goToExpert">
          <div class="p f20">找专家</div>
        </van-grid-item>
        <van-grid-item @click="goToBase" v-if="false">
          <div class="p f20">找基地</div>
        </van-grid-item>
        <van-grid-item @click="goToAnswer">
          <div class="p f20">找答案</div>
        </van-grid-item>
        <van-grid-item @click="goToZuoXun">
          <div class="p f20">坐诊巡诊</div>
        </van-grid-item>
        <van-grid-item @click="goToCetu">
          <div class="p f20">测土配方</div>
        </van-grid-item>
        <van-grid-item @click="goToAsk">
          <div class="p f20">提问</div>
        </van-grid-item> -->
      </van-grid>
    </div>

    <div class="nav-list" v-if="bar.platformColumnState === 1">
      <div class="small-title f18">{{ bar.platformColumnName }}</div>
      <van-grid :column-num="old ? 3 : 4" :border="false">
        <van-grid-item
          @click="goToRouterPage(item.url, item.type)"
          v-for="item in bar.platformColumnMenu"
        >
          <div class="p f20">{{ item.name }}</div>
        </van-grid-item>
        <!-- <van-grid-item @click="goToDiseases">
          <div class="p f20">病虫害</div>
        </van-grid-item>
        <van-grid-item @click="goToLive">
          <div class="p">直播</div>
        </van-grid-item>
        <van-grid-item>
          <div class="p f20" @click="goToMessage">资讯</div>
        </van-grid-item>
        <van-grid-item @click="goToAi">
          <div class="p f18">AI智能专家</div>
        </van-grid-item>
        <van-grid-item @click="goToAboutUs">
          <div class="p f20">关于我们</div>
        </van-grid-item> -->
      </van-grid>
      <!-- <van-grid :column-num="4" :border="false"> </van-grid> -->
    </div>

    <div class="btns" v-if="!uId">
      <div class="btn1 f20" @click="goToLogin('login')">登录</div>
      <div class="btn2 f20" @click="goToLogin('sign')">注册</div>
    </div>
    <div class="logined" v-else>
      <van-image
        width="35"
        height="35"
        round
        :src="avatar"
        class="avator"
        fit="cover"
        @click="goToRouterPage('/me')"
      />
      <p class="name f20" @click="goToRouterPage('/me')">{{ userName }}</p>
      <div class="login-out f16" @click="loginOutFn">退出登录</div>
    </div>
    <div class="index-btn" @click="goToRouterPage('/')">
      <div class="btn-content">
        <!-- <div class="logo"></div> -->
        <van-image class="logo" fit="scale-down" :src="headerBottomBar.icon"></van-image>
        <div class="name f18">{{ headerBottomBar.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, useStore, mapGetters } from 'vuex';
import { Dialog } from 'vant';
import { computed, ref, onMounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useCustomRouter } from '@/common/js/useCustomRouter';
import { loginOut, login } from '@/common/js/getToken';
import { inject } from 'vue';
export default {
  props: {
    showFlag: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    // const route = useRoute();
    const router = useRouter();
    const { goPage } = useCustomRouter();
    const userName = computed(() => store.state.userInfo.username);
    const avatar = computed(() => store.state.userInfo.avatar);
    const uId = computed(() => store.state.uId);
    const old = computed(() => store.state.old);

    // 全局title 和icon
    const headerBottomBar = computed(() => store.getters.getterGlobalTitle);

    // 关闭快速导航窗
    function hide() {
      emit('update:showFlag', false);
    }

    // 登录注册按钮
    function goToLogin(loginType) {
      if (loginType === 'sign') {
        // 注册按钮，修改登连接的type
        login('register');
      } else {
        // 否则正常的登录
        login();
      }
    }
    const size = inject('size');

    // inject 快速导航栏目
    const headerFastBar = inject('headerFastBar', {});

    // 快速导航的路由
    function goToRouterPage(url, type = undefined) {
      // 专家，直播，基地，坐诊，巡诊，测土，培训视频，注意判断初始mid
      // 培训有直播，回放功能
      // 看视频只是单纯的看视频
      if (type) {
        //如果有type显示类型,type:0-内部模块；type：1-外部模块，小程序； type：2-外部模块，url链接
        if (type === '0') {
          goPage(url);
        } else if (type === '1') {
          // 跳转小程序
        } else if (type === '2') {
          window.open(url, '_blank');
        }
      } else {
        goPage(url);
      }
      // 不管是不是在当前路由，都要关闭快速导航窗口
      emit('update:showFlag', false);
    }

    return {
      userName,
      avatar,
      uId,
      // pathName,
      hide,
      goToLogin,
      size,
      old,
      headerBottomBar,
      goToRouterPage,
      ...toRefs(headerFastBar), // {bar}
    };
  },
  name: 'fast_nav',
  computed: {
    ...mapState(['uId']),
    ...mapGetters(['initMid', 'aiExpertId']),
  },
  methods: {
    ...mapActions(['cleanUserInfo']),
    loginOutFn() {
      // 退出登录按钮
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
          // 退出登录函数
          loginOut();
          this.cleanUserInfo();
        });
    },
    // goToIndex() {
    //   // 路由 去首页
    //   this.$router.push({ path: '/' }).catch((err) => err);
    //   this.closeBox();
    // },
    // goToHospital() {
    //   this.$router.push({ path: '/into_hospital' }).catch((err) => err);
    // },
    // goToExpert() {
    //   this.setMid(this.initMid);
    //   this.$router.push({ path: '/look_expert' }).catch((err) => err);
    // },
    // goToLive() {
    //   this.setMid(this.initMid);
    //   this.$router.push({ path: '/live', query: { from: 'index' } }).catch((err) => err);
    // },
    // goToMessage() {
    //   this.$router.push({ path: '/message' }).catch((err) => err);
    // },
    // goToBase() {
    //   this.setMid(this.initMid);
    //   this.$router.push({ path: '/whole_base_list' }).catch((err) => err);
    // },
    // goToAnswer() {
    //   //  去首页的的网诊
    //   this.$router.push({ path: '/index_online' }).catch((err) => err);
    // },
    // goToZuoXun() {
    //   //  去坐诊巡诊页面，和我的坐诊巡诊页面是一样
    //   const path = this.$route.path;
    //   if (path === '/login') {
    //     this.$emit('update:showFlag', false);
    //   }
    //   this.$router.push({ path: '/whole_zuozhen_list' }).catch((err) => err);
    // },
    // goToCetu() {
    //   const path = this.$route.path;
    //   if (path === '/login') {
    //     this.$emit('update:showFlag', false);
    //   }
    //   this.$router.push({ path: '/whole_cetu_list' });
    // },
    // goToAsk() {
    //   const path = this.$route.path;
    //   if (path === '/login') {
    //     this.$emit('update:showFlag', false);
    //   }
    //   this.$router.push({ path: '/ask' }).catch((err) => err);
    // },
    // goToVideo() {
    //   // 培训视频
    //   this.$router.push({ path: '/video_list' }).catch((err) => err);
    // },
    // goToDiseases() {
    //   this.$router.push({ path: '/diseases' }).catch((err) => err);
    // },
    // goToAi() {
    //   // 去ai页面
    //   this.$router.push({ path: '/expert', query: { from: 'ai' } }).catch((err) => err);
    // },
    // goToAboutUs() {
    //   this.$router.push({ path: '/about_us' }).catch((err) => err);
    // },
    // goToMe() {
    //   this.closeBox();
    //   this.$router.push({ path: '/me' }).catch((err) => err);
    // },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .fast_nav-conatiner {
    .title {
      height: 55px;
      line-height: 55px;
      .van-icon {
        width: 71px;
        height: 100%;
        font-size: 38px !important;
        line-height: 55px;
        color: $f-color-second;
      }
    }
    .login-out {
      color: $theme-color;
    }
    .btns {
      .btn1 {
        height: 49px;
        line-height: 49px;
        color: $theme-color;
        border: 1px solid $border-color;
      }
      .btn2 {
        height: 49px;
        line-height: 49px;
        background: $theme-color;
        border: 1px solid $border-color;
      }
    }
  }
}

.index-btn {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  .btn-content {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
    margin: 0 auto;
    background: rgb(248, 248, 248);
    border-radius: 36px;
    line-height: 1.12;
    font-size: 12px;
    position: relative;
    border: 1px solid $border-color;
    color: $theme-color;
  }
  .logo {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 100%;
    overflow: hidden;
    border: 1px solid $border-color;
  }
}
.btn1 {
  color: $theme-color;
  border: 1px solid $border-color;
}
.btn2 {
  background: $theme-color;
  border: 1px solid $border-color;
}
.login-out {
  color: $theme-color;
}
</style>
<style lang="stylus" scoped>
.fast_nav-conatiner
  position fixed
  top 0
  bottom 0
  right 0
  left 50%
  transform translateX(-50%)
  background #f6f7f8
  z-index 11
  max-width 640px
  width 100%
  .title
    height 40px
    line-height 40px
    padding-left 12px
    color #363A44
    font-size 14px
    background #fff
    border-bottom 1px solid $border-color
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
    border-bottom 1px solid $border-color
    overflow hidden
    width 100%
    .small-title
      font-size 12px
      color #363A44
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
    :deep().van-grid-item__content
      padding-top 7px
      padding-bottom 7px
  .btns
    background #fff
    text-align center
    line-height 1.2
    padding 25px 21px
    display flex
    & > div
      display inline-block
      width 50%
      height 36px
      text-align center
      line-height 36px
      border-radius 4px
      border-radius: 49px;
      &:first-child
        margin-right 8px
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
      font-size 16px
      margin 0 12px
</style>
