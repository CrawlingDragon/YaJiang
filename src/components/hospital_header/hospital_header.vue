<template>
  <!-- 医院推荐的header -->
  <div class="header-container">
    <div class="wrap van-hairline--top van-hairline--bottom">
      <div class="left-bar" v-if="header == 'indexHeader'">
        <p class="p1 f22" @dblclick="updateData">{{ navHeader }}</p>
        <van-icon name="wap-nav" class="hospital-icon" @click="showNavFast" :size="size" />
      </div>
      <div class="left-bar" v-if="header == 'logoHeader'">
        <van-image class="logo" :src="logoImg"></van-image>
        <div class="p2 f22">为农服务平台</div>
      </div>
      <div class="left-bar" v-if="header == 'searchHeader'">
        <van-icon name="location-o" class="address-icon" />
        <div class="address">{{ address }}</div>
        <van-icon name="search" class="search" @click="goToSearchHospital" />
      </div>
      <div
        class="left-bar"
        v-if="header != 'indexHeader' && header != 'logoHeader' && header != 'searchHeader'"
      >
        <slot></slot>
      </div>
      <div class="right-nav van-hairline--left">
        <div class="index-icon" @click="goToIndex"></div>
        <div class="fast-nav-icon" @click="rightIcon"></div>
      </div>
      <fastNav v-model:showFlag="flag" @changeFlag="closeFast"></fastNav>
      <hospitalFastNav :showFlag="flagHospital" @changeFlag="close"></hospitalFastNav>
    </div>
  </div>
</template>
<script>
import fastNav from '@/components/fast_nav/fast_nav';
import hospitalFastNav from '@/components/hospital_fast_nav/hospital_fast_nav';
import logoImgs from './1.png';
import { mapState } from 'vuex';
import { inject, ref } from 'vue';
export default {
  name: 'hospitalHeaders',
  components: { fastNav, hospitalFastNav },
  props: {
    header: {
      type: String,
      default: 'indexHeader',
    },
    navHeader: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
  },
  setup() {
    const size = inject('size');
    const logoImg = ref('');
    logoImg.value = logoImgs;
    return {
      size,
      logoImg,
    };
  },
  data() {
    return {
      flag: false,
      flagHospital: false,
    };
  },
  computed: {
    ...mapState(['mid', 'uId', 'initMid']),
  },
  watch: {
    $route() {
      this.flag = false;
    },
  },
  mounted() {},
  methods: {
    updateData() {
      this.$emit('updateData');
    },
    rightIcon() {
      this.flag = true;
      this.$emit('rightIcon');
    },
    closeFast() {
      this.$emit('clickFastRightIcon');
      // 主要二级快速导航关闭
      this.flag = false;
    },
    showNavFast() {
      // 打开医院快速导航
      this.flagHospital = true;
    },
    close(boolean) {
      // 关闭医院快速导航
      this.flagHospital = boolean;
    },
    goToIndex() {
      this.$router
        .push({
          path: '/index',
        })
        .catch((err) => err);
    },
    goToSearchHospital() {
      this.$router
        .push({
          path: '/search_hospital',
          query: { location: this.address },
        })
        .catch((err) => err);
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .header-container {
    height: 55px;
    line-height: 55px;
    .right-nav {
      width: 114px;
      .index-icon {
        width: 33px;
        height: 33px;
        background-size: cover;
      }

      .fast-nav-icon {
        width: 33px;
        height: 33px;
        background-size: cover;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.old {
  .logo {
    width: 36px !important;
    height: 36px !important;
  }
}
.header-container {
  .p2 {
    font-size: 15px;
    color: $theme-color;
  }
  .no_index_header {
    color: $theme-color;
  }
}
</style>
<style lang="stylus" scoped>
.header-container
  height 40px
  line-height 40px
  position fixed
  top 0
  right 0
  left 0
  z-index 4
  .wrap
    width 100%
    height 100%
    max-width 640px
    display flex
    background #FFFFFF
    margin 0 auto
  .left-bar
    flex 1
    display flex
    align-items center
    .p1
      font-size 15px
      color #333
      margin-left 12px
    .hospital-icon
      font-size 18px
      margin-left 10px
      margin-top -2px
      color #333
    .logo
      width 20px
      height 20px
      margin-left 12px
      margin-right 10px
    .p2
      font-size 15px
      color $theme-color
    .address-icon
      font-size 25px
      margin-left 15px
      color #9D9D9D
      margin-right 6px
    .address
      font-size 15px
      color #363A44
      margin-right 25px
    .search
      font-size 25px
      color #9D9D9D
  .right-nav
    width 85px
    display flex
    justify-content space-around
    color #9D9D9D
    align-items center
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
