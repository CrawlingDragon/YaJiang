<template>
  <div class="index-container" ref="index">
    <Header></Header>
    <div class="swiper-box">
      <Swiper />
    </div>
    <div class="nav-wrap">
      <IndexNav />
    </div>
    <div class="hospital-box">
      <div class="title">
        <div class="h1-title f22">推荐医院</div>
        <div class="small-title">加入新型庄稼医院，免费享受会员服务</div>
        <div class="look-bar f18" @click="goRouterSwitch('into_hospital')">找医院 ></div>
        <!-- <div class="nowAddress" @click="goToArea">
          <div>{{ viewAddress }}</div>
          <div class="icon"></div>
        </div> -->
      </div>

      <ul class="h-ul">
        <li v-for="item in hospitalArr" :key="item.id">
          <RecommendHospital :list="item"></RecommendHospital>
        </li>
        <van-loading size="24px" class="loading" v-if="!hospitalArr">加载中...</van-loading>
      </ul>
    </div>
    <div class="vip-box" @click="goRouterSwitch('vip')">
      <img src="./49.png" alt="" />
    </div>
    <div class="hospital-box">
      <div class="title">
        <div class="h1-title f22">推荐专家</div>
        <div class="small-title">{{ viewSecondAddress }}优秀专家，精准答疑解惑</div>
        <div class="look-bar f18" @click="goRouterSwitch('look_expert')">找专家 ></div>
      </div>
      <van-loading size="24px" class="loading" v-if="!expertArr">加载中...</van-loading>
      <ul class="e-ul">
        <li v-for="item in expertArr" :key="item.id">
          <RecommendExpert :list="item"></RecommendExpert>
        </li>
      </ul>
    </div>
    <div class="online-box">
      <div class="title f22">
        网诊
        <div class="look-bar f18" @click="goRouterSwitch('index_online')">找答案 ></div>
      </div>
      <ul class="o-ul">
        <li v-for="item in onlineArr" :key="item.id" ref="li">
          <OnlineItem :list="item" @preImage="preverImg"></OnlineItem>
        </li>
        <van-loading size="24px" v-if="!onlineArr" class="loading">加载中...</van-loading>
      </ul>
      <div class="look-bar2" @click="goRouterSwitch('index_online')" style="border-top: none">
        <div class="btn f18">更多网诊 ></div>
      </div>
    </div>
    <div
      class="help-bar"
      v-if="getterIndexMenu.bottomContent.content1 || getterIndexMenu.bottomContent.content2"
    >
      <p class="f18">{{ getterIndexMenu.bottomContent.content1 }}</p>
      <p class="f18">
        {{ getterIndexMenu.bottomContent.content2
        }}<a :href="`tel:${getterIndexMenu.bottomContent.content3}`">{{
          getterIndexMenu.bottomContent.content3
        }}</a>
        <!-- 服务咨询热线: <a href="tel:0571-87661693">0571-87661693</a> -->
      </p>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue';
import RecommendHospital from '@/components/recommend_hospital/recommend_hospital.vue';
import OnlineItem from '@/components/online_item/online_item.vue';
import RecommendExpert from '@/components/recommend_expert/recommend_expert.vue';
import Foot from '@/components/foot/foot.vue';
import Swiper from '@/components/swiper/swiper.vue';
import IndexNav from '@/components/index_nav/index_nav.vue';
import { ImagePreview } from 'vant';
import { mapState, mapGetters, mapMutations, useStore } from 'vuex';
import { onMounted, ref, watch, onActivated, computed } from 'vue';
import { inToHospitalLocal } from '@/common/js/into_hospital_local';
import { useTitles } from '@/common/js/useTitles';
import { fetchPost } from '../../http';

export default {
  setup() {
    const store = useStore();
    const title = computed(() => store.getters.getterGlobalTitle.name);
    useTitles(title.value);
  },
  name: 'index',
  components: {
    Header,
    RecommendHospital,
    OnlineItem,
    Foot,
    RecommendExpert,
    Swiper,
    IndexNav,
  },
  props: {},
  data() {
    return {
      hospitalArr: '',
      expertArr: '',
      onlineArr: '',
    };
  },

  computed: {
    ...mapState(['uId', 'axiosAddress', 'userInfo']),
    ...mapGetters(['viewAddress', 'viewSecondAddress', 'getterIndexMenu', 'initMid']),
  },
  watch: {
    uId() {
      this.indexDataAxios();
    },
    axiosAddress() {
      this.indexDataAxios();
    },
  },
  async mounted() {
    // 获取首页数据
    this.getIndexData();
  },
  methods: {
    ...mapMutations(['setMid', 'setLatelyAddressArray']),
    async getIndexData() {
      // await inToHospitalLocal();
      this.indexDataAxios();
    },
    indexDataAxios() {
      // 获取首页数据
      this.$axios
        .fetchPost('/Mobile/Index/index', {
          location: '杭州',
          uId: this.uId,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.setLatelyAddressArray(this.axiosAddress);
            this.hospitalArr = res.data.data.list_mpublic;
            this.expertArr = res.data.data.list_expert;
            this.onlineArr = res.data.data.list_wen;
          }
        });
    },
    // goToLive() {
    //   this.setMid(this.initMid);
    //   this.$router.push({ path: '/live', query: { from: 'index' } });
    // },
    preverImg(item) {
      //网诊的图片预览
      ImagePreview({
        images: item.arr,
        startPosition: item.index,
        closeable: true,
      });
    },
    goRouterSwitch(name) {
      switch (name) {
        case 'index_online':
          //  去首页的的网诊
          this.$router.push({ path: '/index_online' });
          break;
        case 'look_expert':
          // 找专家
          this.$router.push({ path: '/look_expert' });
          break;
        case 'vip':
          this.$router.push({ path: '/vip' });
          break;
        case 'into_hospital':
          // 找医院
          this.$router.push({ path: '/into_hospital' });
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .index-container {
    padding-bottom: 96px;
    .hospital-box .title {
      text-align: left;
      display: flex;
      align-items: center;
      .h1-title {
        margin-top: 0;
      }
      .small-title {
        display: none;
      }
      .look-bar {
        padding: 9px 10px;
        background: $theme-color;
        border-radius: 36px;
        top: 11px;
        line-height: 18px;
        color: #fff;
      }
    }

    .online-box .title {
      height: 56px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      .look-bar {
        padding: 9px 10px;
        background: $theme-color;
        border-radius: 36px;
        top: 11px;
        line-height: 18px;
        color: #fff;
      }
    }
    .hospital-box {
      .h-ul {
        li {
          display: inline-block;
          padding-right: 12px;
          padding-bottom: 12px;
          width: 100%;
          height: 105px;
          vertical-align: top;
          position: relative;
          &:nth-child(3),
          &:nth-child(4) {
            display: none;
          }
        }
      }
    }
    .vip-box {
      display: none;
    }
    .e-ul {
      width: 100%;
      column-count: auto;
      padding-right: 12px;
      margin: 0;
      padding-left: 12px;
      padding-bottom: 0;
      li {
        break-inside: auto;
        height: 90px;
        padding: 0;
        margin-bottom: 16px;
      }
    }

    .look-bar2 {
      height: 85px;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        padding: 9px 13px;
        background: $theme-color;
        display: inline-block;
        line-height: 1.12;
        color: #fff;
        border-radius: 36px;
      }
    }
  }
}
.index-container {
  .help-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 21px 0;
    color: $f-color-second;
    a {
      color: $theme-color;
      display: inline;
    }
  }

  .title {
    border-bottom: 1px solid $border-color;
  }

  .nowAddress {
    border: 1px solid $border-color;
  }
  .e-ul {
    padding-top: 10px;
    column-gap: 0;
    column-count: 2;
    margin-left: 12px;
    // border-bottom: 1px solid $border-color;
    padding-bottom: 5px;
    li {
      break-inside: avoid;
      padding-right: 12px;
      padding-bottom: 10px;
    }
  }
  .o-ul {
    margin-left: 12px;
    li {
      width: 100%;
      border-bottom: 1px solid $border-color;
    }
  }
}
</style>
<style lang="stylus" scoped>
.index-container
  padding-bottom 50px
  .swiper-box
    width 100%
    margin-top 10px
    :deep().van-image
      display block
      width 100%
      height 100%
  .nav-wrap
    min-height 100px
    width 100%
  .hospital-box
    background #fff
    .title
      height 60px
      padding-left 12px
      padding-right 12px
      border-bottom 1px solid $border-color
      line-height 40px
      font-size 17px
      color #343434
      overflow hidden
      box-sizing border-box
      text-align center
      position relative
      .h1-title
        font-size: 17px;
        line-height 1.2
        margin-top 11px
      .small-title
        color #9A9A9A
        font-size 12px
        line-height 1.2
        margin-top 5px
      .look-bar
        text-align center
        color #165CBC
        font-size 12px
        position absolute
        right 10px
        top 9px
        padding 5px
        line-height 1.2
      .nowAddress
        position absolute
        left 10px
        top 10px
        padding 3px 8px
        background: #FFFFFF;
        border: 1px solid $border-color;
        border-radius: 8px;
        color $theme-color
        line-height: 1.1
        font-size: 15px;
        display: flex
        align-items: center
        justify-content: center
        .icon
          width 14px
          height: 12px
          background: url('./address-icon.png') no-repeat
          background-size contain
          background-origin:center center
          margin-left 3px
    .h-ul
      margin-left: 12px;
      margin-top: 10px;
      margin-bottom: 10px;
      li
        display: inline-block;
        padding-right: 12px;
        padding-bottom: 12px;
        width 50%
        height: 285px;
        vertical-align: top;
        position: relative;
  .look-bar2
    height 33px
    text-align center
    color #666666
    font-size 12px
    line-height 33px
    background #fff
    border-top 1px solid #e5e5e5
    .btn
      display: inline-block;
  .vip-box
    width 100%
    margin-bottom 10px
    padding 5px 12px
    background #fff
    img
      display block
      width 100%
      height 100%
  .online-box
    background #fff
    margin-top 10px
    .title
      font-size 17px
      color #343434
      height 40px
      line-height 40px
      border-bottom 1px solid $border-color
      background #fff
      text-align center
      position relative
      .look-bar
        text-align center
        color #165CBC
        font-size 12px
        position absolute
        right 10px
        top 9px
        padding 5px
        line-height 1.2
    .o-ul
      margin-left 12px
      li
        width 100%
        border-bottom 1px solid $border-color

  .tips
    line-height 30px
    font-size 14px
    color #999
    text-align center
  .loading
    text-align center
    height: 100px
    line-height: 100px
    width 100%
    margin: 0 auto;
    display: block;
</style>
