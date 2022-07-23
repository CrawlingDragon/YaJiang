<template>
  <!-- 首页推荐的header -->
  <div class="header-container">
    <div class="wrap van-hairline--top van-hairline--bottom">
      <div class="search-icon" v-if="indexHeader" @click="goToSearch">
        <van-icon name="search" :size="size" />
      </div>
      <div class="tabbar" v-if="indexHeader">
        <div class="item f22" :class="{ active: tabbarActive == 0 }" @click="goToIndex">推荐</div>
        <div
          class="item f22"
          :class="{ active: tabbarActive == 1 }"
          @click="goToOnline"
          @dblclick="updateFetch"
        >
          {{ getDefaultMenuName.questionName }}
        </div>
      </div>
      <div class="no_index_header f22" v-if="!indexHeader" @click="clickLogo">
        <van-image
          :src="headerBottomBar.icon"
          class="logo"
          fit="scale-down"
          radius="10%"
        ></van-image>
        {{ headerBottomBar.name }}
      </div>
      <div class="right-nav van-hairline--left">
        <div class="index-icon" @click.stop="goToIndex">
          <!-- <van-icon name="wap-home-o" /> -->
        </div>
        <div class="fast-nav-icon" @click="openFastNav"></div>
      </div>
      <fastNav v-model:showFlag="fastNavShowFlag" @changeFlag="closeFaseNav"></fastNav>
    </div>
  </div>
</template>
<script>
import fastNav from '@/components/fast_nav/fast_nav.vue';
import { mapState, useStore, mapGetters } from 'vuex';
import { inject, computed } from 'vue';
export default {
  name: 'headers',
  components: { fastNav },
  props: {
    indexHeader: {
      type: Boolean,
      default: true,
    },
    tabbarActive: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const store = useStore();
    const headerBottomBar = computed(() => store.getters.getterGlobalTitle);
    const size = inject('size');
    return { size, headerBottomBar };
  },
  data() {
    return {
      fastNavShowFlag: false,
      user: {},
    };
  },
  computed: {
    ...mapState(['uId']),
    ...mapGetters(['initMid', 'getDefaultMenuName']),
  },
  watch: {
    $route() {
      this.fastNavShowFlag = false;
    },
  },
  mounted() {},
  methods: {
    updateFetch() {
      //点击网诊，或者找答案 tab栏目，提交数据更新
      this.$emit('updateFetchData');
    },
    clickLogo() {
      this.$emit('clickLogoImg');
      this.$router.push({ path: '/index' }).catch((err) => err);
    },
    goToSearch() {
      // 路由  搜索网诊
      this.$router
        .push({
          path: '/search_online',
        })
        .catch((err) => err);
      this.fastNavShowFlag = false;
    },
    goToOnline() {
      // 路由  网诊
      this.$router.push({ path: '/index_online' });
      this.fastNavShowFlag = false;
    },
    goToIndex() {
      // 路由 首页
      this.$router.push({ path: '/index' }).catch((err) => err);
    },
    openFastNav() {
      // 打开快速导航
      this.fastNavShowFlag = !this.fastNavShowFlag;
    },
    closeFaseNav(boolean) {
      // 关闭快速导航
      this.fastNavShowFlag = boolean;
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
    }
    .index-icon {
      display: inline-block;
      background: url('./46.png') no-repeat;
      background-position: center center;
      background-size: contain;
      width: 33px;
      height: 33px;
    }
    .fast-nav-icon {
      display: inline-block;
      background: url('./sx_47.png') no-repeat;
      background-position: center center;
      background-size: contain;
      width: 33px;
      height: 33px;
    }
    .tabbar > .item.active {
      line-height: 55px !important;
    }
    .no_index_header {
      .logo {
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.header-container {
  height: 40px;
  line-height: 40px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  .wrap {
    display: flex;
    max-width: 640px;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    background: #ffffff;
  }
  .search-icon {
    margin-left: 22px;
    margin-right: 20px;
    font-size: 25px;
    color: #9d9d9d;
    .van-icon {
      line-height: inherit;
    }
  }
  .tabbar {
    font-size: 15px;
    line-height: inherit;
    flex: 1;
    & > .item {
      display: inline-block;
      color: #363a44;
      margin-right: 20px;
      box-sizing: border-box;
      &.active {
        position: relative;
        color: $theme-color;
        font-size: 17px;
        &:after {
          content: '';
          position: absolute;
          left: -3px;
          right: -3px;
          bottom: 0;
          border-bottom: 2px solid $theme-color;
        }
      }
    }
  }
  .right-nav {
    width: 85px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #9d9d9d;
  }
  .index-icon {
    display: inline-block;
    background: url('./46.png') no-repeat;
    background-position: center center;
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }
  .fast-nav-icon {
    display: inline-block;
    background: url('./sx_47.png') no-repeat;
    background-position: center center;
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
    .van-icon {
      line-height: inherit;
    }
  }
  .no_index_header {
    flex: 1;
    display: flex;
    align-items: center;
    color: $f-color;
    .logo {
      width: 20px;
      height: 20px;
      margin-left: 12px;
      margin-right: 10px;
      border-radius: 10px;
      border: 1px solid $border-color;
    }
  }
}
</style>
