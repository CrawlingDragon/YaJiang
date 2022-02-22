<template>
  <div class="index-container" ref="index">
    <Header></Header>
    <div class="swiper-box" ref="swiper">
      <van-swipe
        :autoplay="3000"
        :style="{ height: h }"
        ref="swiperRef"
        v-if="life"
      >
        <van-swipe-item
          v-for="image in swiperArr"
          :key="image.id"
          fit="cover"
          @click="goToMessageDetail(image)"
        >
          <van-image fit="cover" :src="image.logo" lazy-load />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="nav-box">
      <router-link to="/index_online" class="item">
        <div class="icon i1"></div>
        <p>找答案</p>
      </router-link>
      <div class="item">
        <div @click="lookForStore" style="display:block;color:#000;">
          <div class="icon i2"></div>
          <p>找农资</p>
        </div>
      </div>
      <router-link to="/look_expert" class="item">
        <div class="icon i3"></div>
        <p>找专家</p>
      </router-link>
      <router-link to="/whole_base_list" class="item">
        <div class="icon i4"></div>
        <p>找基地</p>
      </router-link>
      <router-link to="/live?from=index" class="item">
        <div class="icon i5"></div>
        <p>看直播</p>
      </router-link>
      <router-link to="/into_hospital" class="item" v-if="false">
        <div class="icon i4"></div>
        <p>找医院</p>
      </router-link>
      <router-link to="/ask" class="item" v-if="false">
        <div class="icon i5"></div>
        <p>提问</p>
      </router-link>
    </div>
    <div class="hospital-box">
      <div class="title">
        <div class="h1-title">推荐医院</div>
        <div class="small-title">加入新型庄稼医院，免费享受会员服务</div>
        <div class="look-bar" @click="lookMoreHospital">找医院 ></div>
        <div class="nowAddress" @click="goToArea">
          <div>{{ viewAddress }}</div>
          <div class="icon"></div>
        </div>
      </div>

      <ul class="h-ul">
        <li v-for="item in hospitalArr" :key="item.id">
          <RecommendHospital :list="item"></RecommendHospital>
        </li>
        <van-loading size="24px" class="loading" v-if="!hospitalArr"
          >加载中...</van-loading
        >
      </ul>
    </div>
    <div class="vip-box" @click="goToVip">
      <img src="./49.png" alt="" />
    </div>
    <div class="hospital-box">
      <div class="title">
        <div class="h1-title">推荐专家</div>
        <div class="small-title">
          {{ viewSecondAddress }}优秀专家，精准答疑解惑
        </div>
        <div class="look-bar" @click="goToExpert">找专家 ></div>
      </div>
      <van-loading size="24px" class="loading" v-if="!expertArr"
        >加载中...</van-loading
      >
      <ul class="e-ul">
        <li v-for="item in expertArr" :key="item.id">
          <RecommendExpert :list="item"></RecommendExpert>
        </li>
      </ul>
    </div>
    <div class="online-box">
      <div class="title">
        网诊
        <div class="look-bar" @click="goToAnswer">找答案 ></div>
      </div>
      <ul class="o-ul">
        <li v-for="item in onlineArr" :key="item.id" ref="li">
          <OnlineItem :list="item" @preImage="preverImg"></OnlineItem>
        </li>
        <van-loading size="24px" v-if="!onlineArr" class="loading"
          >加载中...</van-loading
        >
      </ul>
      <div class="look-bar2" @click="goToAnswer">更多网诊 ></div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
import Header from "@/components/header/header.vue";
import RecommendHospital from "@/components/recommend_hospital/recommend_hospital";
import OnlineItem from "@/components/online_item/online_item";
import RecommendExpert from "@/components/recommend_expert/recommend_expert";
import Foot from "@/components/foot/foot";
import { getIndexAdList } from "@/service/banner.js";
import { ImagePreview } from "vant";
import { mapState, mapGetters, mapMutations } from "vuex";
import { onMounted, ref } from "vue";
import lookForStoreFn from "@/common/js/lookForStore.js";
import { inToHospitalLocal } from "@/common/js/into_hospital_local";
// import { useMeta } from "useMeta";
export default {
  setup() {
    // const { meta } = useMeta({ title: "益农宝·为农服务平台" });
    const { lookForStore } = lookForStoreFn(process.env.VUE_APP_SHARE_URL);
    const swiperArr = ref([]);

    async function adlist() {
      const result = await getIndexAdList();
      swiperArr.value = result;
    }

    onMounted(() => {
      adlist();
    });
    return {
      lookForStore,
      adlist,
      swiperArr
    };
  },
  name: "index",
  components: {
    Header,
    RecommendHospital,
    OnlineItem,
    Foot,
    RecommendExpert
  },
  props: {},
  data() {
    return {
      hospitalArr: "",
      expertArr: "",
      onlineArr: "",
      scrollInit: false,
      // shareStoreUrl: process.env.VUE_APP_SHARE_URL,
      h: 0,
      life: true
    };
  },
  created() {
    // this.adlist();
  },
  computed: {
    ...mapState(["initMid", "uId", "axiosAddress", "userInfo"]),
    ...mapGetters(["viewAddress", "viewSecondAddress"])
  },
  watch: {
    uId() {
      this.indexDataAxios();
    },
    axiosAddress() {
      this.indexDataAxios();
    }
    // h(newVal) {
    //   alert(newVal);
    // }
  },
  async mounted() {
    document.title = "益农宝·为农服务平台";
    // 获取首页数据
    this.getIndexData();
    // 轮播初始化
    this.initSwiperHeight();
    window.addEventListener("resize", this.initSwiperHeight);
  },
  updated() {
    document.title = "益农宝·为农服务平台";
  },
  activated() {
    this.life = true;
  },
  deactivated() {
    this.life = false;
    window.removeEventListener("resize", this.initSwiperHeight);
  },
  unmounted() {
    window.removeEventListener("resize", this.initSwiperHeight);
  },
  methods: {
    ...mapMutations(["setMid", "setLatelyAddressArray"]),
    initSwiperHeight() {
      let w = this.$refs.swiper.offsetWidth;
      if (w >= 640) {
        w = 640;
      }
      this.h = w / (750 / 188) + "px";
      if (this.h === "0px") {
        let w = document.clientWidth;
        this.h = w / (750 / 188) + "px";
      }
    },
    async getIndexData() {
      await inToHospitalLocal();
      this.indexDataAxios();
    },
    indexDataAxios() {
      // 获取首页数据
      this.$axios
        .fetchPost("/Mobile/Index/index", {
          location: this.axiosAddress,
          uId: this.uId
        })
        .then(res => {
          if (res.data.code == 0) {
            this.setLatelyAddressArray(this.axiosAddress);
            this.hospitalArr = res.data.data.list_mpublic;
            this.expertArr = res.data.data.list_expert;
            this.onlineArr = res.data.data.list_wen;
            this.scrollInit = true;
          }
        });
    },
    goToLive() {
      this.setMid(this.initMid);
      this.$router.push({ path: "/live", query: { from: "index" } });
    },
    preverImg(item) {
      //网诊的图片预览
      ImagePreview({
        images: item.arr,
        startPosition: item.index,
        closeable: true
      });
    },
    goToAnswer() {
      //  去首页的的网诊
      this.$router.push({ path: "/index_online" }).catch(err => err);
    },
    goToExpert() {
      // 找专家
      this.$router.push({ path: "/look_expert" }).catch(err => err);
    },
    // goToBase() {
    //   // 找基地
    //   this.$router.push({ path: "/whole_base_list" }).catch(err => err);
    // },
    lookMoreHospital() {
      // 查找更多的医院
      this.$router.push({ path: "/into_hospital" }).catch(err => err);
    },
    goToArea() {
      this.$router.push({ path: "/area" }).catch(err => err);
    },
    goToVip() {
      this.$router.push({ path: "/vip" }).catch(err => err);
    },
    goToMessageDetail(item) {
      //轮播图去资讯详情页
      switch (item.module) {
        case "mp":
          this.setMid(item.mid);
          setTimeout(() => {
            this.$router.push({ path: "/hospital" });
          });
          break;
        case "webview":
          window.open(item.mid, "_blank");
          break;
        case "news":
          this.$router.push({
            path: "/message_detail",
            query: { id: item.mid, catid: item.catid }
          });
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.index-container
  padding-bottom 50px
  .swiper-box
    width 100%
    margin-top 10px
    /deep/.van-image
      display block
      width 100%
      height 100%
  .nav-box
    height 100px
    display flex
    align-items center
    background #FFFFFF
    margin-bottom 10px
    .item
      flex 1
      text-align center
      .icon
        width 40px
        height 40px
        color #343434
        font-size 14px
        margin 0 auto
        margin-bottom 10px
        &.i1
          background url('./1.png') no-repeat center
          background-size cover
        &.i2
          background url('./2.png') no-repeat center
          background-size cover
        &.i3
          background url('./3.png') no-repeat center
          background-size cover
        &.i4
          background url('./4.png') no-repeat center
          background-size cover
        &.i5
          background url('./5.png') no-repeat center
          background-size cover
      p
        color #333333
  .hospital-box
    background #fff
    .title
      height 60px
      padding-left 12px
      border-bottom 1px solid #E5E5E5
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
        margin-left 10px
        color #9A9A9A
        font-size 12px
        line-height 1.2
        margin-top 9px
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
        border: 1px solid $theme-color;
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
      border-bottom 1px solid #e5e5e5
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
        border-bottom 1px solid #e5e5e5
  .e-ul
    padding-top 10px
    column-gap 0
    column-count 2
    margin-left 12px
    border-bottom 1px solid #e5e5e5
    padding-bottom 5px
    li
      break-inside avoid
      padding-right 12px
      padding-bottom 10px
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
