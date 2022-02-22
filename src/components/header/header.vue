<template>
  <!-- 首页推荐的header -->
  <div class="header-container ">
    <div class="wrap van-hairline--top van-hairline--bottom">
      <div class="search-icon" v-if="indexHeader" @click="goToSearch">
        <van-icon name="search" />
      </div>
      <div class="tabbar" v-if="indexHeader">
        <div
          class="item"
          :class="{ active: tabbarActive == 0 }"
          @click="goToIndex"
        >
          推荐
        </div>
        <div
          class="item"
          :class="{ active: tabbarActive == 1 }"
          @click="goToOnline"
        >
          网诊
        </div>
      </div>
      <div class="no_index_header" v-if="!indexHeader" @click="clickLogo">
        <van-image :src="require('@/assets/logo.png')" class="logo"></van-image>
        益农宝·为农服务平台
      </div>
      <div class="right-nav van-hairline--left">
        <div class="index-icon" @click.stop="goToIndex">
          <!-- <van-icon name="wap-home-o" /> -->
        </div>
        <div class="fast-nav-icon" @click="openFastNav"></div>
      </div>
      <fastNav
        v-model:showFlag="fastNavShowFlag"
        @changeFlag="closeFaseNav"
      ></fastNav>
    </div>
  </div>
</template>
<script>
import fastNav from "@/components/fast_nav/fast_nav";
import { mapState } from "vuex";
export default {
  name: "headers",
  components: { fastNav },
  props: {
    indexHeader: {
      type: Boolean,
      default: true
    },
    tabbarActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fastNavShowFlag: false,
      user: {}
    };
  },
  computed: { ...mapState(["uId", "initMid"]) },
  watch: {
    $route() {
      this.fastNavShowFlag = false;
    }
  },
  mounted() {},
  methods: {
    clickLogo() {
      this.$emit("clickLogoImg");
      this.$router.push({ path: "/index" }).catch(err => err);
    },
    goToSearch() {
      // 路由  搜索网诊
      this.$router
        .push({
          path: "/search_online"
        })
        .catch(err => err);
      this.fastNavShowFlag = false;
    },
    goToOnline() {
      // 路由  网诊
      this.$router.push({ path: "/index_online" }).catch(err => err);
      this.fastNavShowFlag = false;
    },
    goToIndex() {
      // 路由 首页
      this.$router.push({ path: "/index" }).catch(err => err);
    },
    openFastNav() {
      // 打开快速导航
      this.fastNavShowFlag = !this.fastNavShowFlag;
    },
    closeFaseNav(boolean) {
      // 关闭快速导航
      this.fastNavShowFlag = boolean;
    }
  }
};
</script>
<style lang="stylus" scoped>
.header-container
  height 40px
  line-height 40px
  position fixed
  top 0
  right 0
  left 0
  z-index 2
  width 100%
  .wrap
    display flex
    max-width 640px
    height 100%
    width 100%
    margin 0 auto
    background #FFFFFF
  .search-icon
    margin-left 22px
    margin-right 20px
    font-size 25px
    color #9D9D9D
    .van-icon
      line-height inherit
  .tabbar
    font-size 15px
    line-height inherit
    flex 1
    & > .item
      display inline-block
      color #999999
      margin-right 20px
      box-sizing border-box
      &.active
        color $theme-color
        font-size 17px
        border-bottom 2px solid $theme-color
  .right-nav
    width 85px
    display flex
    justify-content space-around
    align-items center
    color #9D9D9D
    .index-icon
      display inline-block
      background url('./46.png') no-repeat
      background-position center center
      background-size 20px 20px
      width 20px
      height 20px
    .fast-nav-icon
      display inline-block
      background url('./sx_47.png') no-repeat
      background-position center center
      background-size 20px 20px
      width 20px
      height 20px
    .van-icon
      line-height inherit
  .no_index_header
    flex 1
    display flex
    align-items center
    color $theme-color
    .logo
      width 20px
      height 20px
      margin-left 12px
      margin-right 10px
</style>
