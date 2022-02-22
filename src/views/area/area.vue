<template>
  <div class="area-container">
    <Headers ref="header" :index-header="false"></Headers>
    <van-overlay :show="show" class="loading" z-index="99999999999999">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" vertical />
      </div>
    </van-overlay>
    <div class="area-content" :class="{ searchBox: searchBox }">
      <form action="/" class="from">
        <van-search
          v-model="value"
          show-action
          clearable
          placeholder="输入城市名、拼音或字母查询"
          @search="onSearch"
          @update:model-value="onSearch"
          @cancel="onCancel"
          class="search-input"
          :class="{ searchBox: searchBox }"
        />
      </form>
      <div style="background:#ebebeb">
        <div class="now-choose-title">当前选择:{{ viewAddress }}</div>
        <div class="tip-title">定位/最近访问</div>
        <div class="choose-wrap">
          <div
            class="choosed-area location"
            :class="{
              fail:
                geoViewAddress == '定位失败' ||
                geoViewAddress == '定位中...' ||
                geoViewAddress == ''
            }"
            @click="clickGeoAddress"
          >
            <div class="icon"></div>
            <div>{{ geoViewAddress || "定位失败" }}</div>
          </div>
          <div
            class="choosed-area"
            v-show="viewAddress"
            @click="goToIndex(index)"
            v-for="(item, index) in latelyAddressArrayComputed"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
        <div class="tip-title">热门城市</div>
        <ul class="hot-city-ul">
          <li v-for="item in hotCity" :key="item.id" @click="choose(item)">
            {{ item.name }}
          </li>
        </ul>
        <van-index-bar :sticky-offset-top="40" :index-list="indexList">
          <template v-for="item in computedList" :key="item.items">
            <van-index-anchor :index="item.index" />
            <van-cell
              :title="it.name"
              v-for="it in item.items"
              :key="it.name"
              @click="choose(it)"
            />
          </template>
        </van-index-bar>
      </div>
      <div class="search-content" v-show="searchBox">
        <div
          class="item"
          v-for="item in searchAddress"
          :key="item.name"
          @click="choose(item)"
        >
          {{ item.name }}
        </div>
        <van-empty description="未搜索到符合条件的内容" v-show="noData" />
      </div>
    </div>
  </div>
</template>
<script>
import Headers from "@/components/header/header.vue";
import { geo } from "@/common/js/baidu_locationAddress.js";
import { mapGetters, mapMutations, mapState, useStore } from "vuex";
import { computed, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
export default {
  name: "areas",
  metaInfo() {
    return {
      title: "切换地区"
    };
  },
  components: { Headers },
  setup() {
    const router = useRouter();
    const store = useStore();
    const geoViewAddress = computed(() => store.getters.geoViewAddress);
    const geoAddress = computed(() => store.state.geoAddress);
    const { geolocationAgain } = geo();
    onUnmounted(() => {
      if (geoViewAddress.value == "定位中...") {
        store.commit("setGeoAddress", "定位失败");
        return;
      }
    });
    async function clickGeoAddress() {
      //点击定位地址
      // 如果是定位失败。重新定位
      if (geoViewAddress.value == "定位中...") {
        Toast("定位中");
        return;
      }
      if (geoViewAddress.value === "定位失败") {
        store.commit("setGeoAddress", "定位中...");
        await geolocationAgain();
        return;
        // to do
      }
      store.commit("setAxiosAddress", geoAddress.value);
      setTimeout(() => {
        router.push({
          path: "/index"
        });
      }, 300);
    }
    return {
      clickGeoAddress,
      geoViewAddress
    };
  },
  data() {
    return {
      value: "",
      hotCity: [],
      list: [],
      searchAddress: [],
      searchBox: false,
      noData: false,
      show: true
    };
  },
  activated() {
    this.value = "";
    this.searchBox = false;
  },
  computed: {
    ...mapState(["initMid", "geoAddress", "latelyAddressArray"]),
    ...mapGetters(["viewAddress"]),
    initSearchListAll() {
      let arr = [];
      this.list.forEach(item => {
        arr = arr.concat(item.items);
      });
      return arr;
    },
    computedList() {
      let arr = [];
      arr = this.list.filter(item => {
        return item.items.length != 0;
      });
      return arr;
    },
    indexList() {
      let arr = [];
      this.list.forEach(item => {
        if (item.items.length != 0) {
          arr.push(item.index);
        }
      });
      return arr;
    },
    latelyAddressArrayComputed() {
      let arr = [];
      this.latelyAddressArray.forEach(item => {
        let x = item.split(",");
        let y = x[x.length - 1];
        arr.push(y);
      });
      return arr;
    }
  },
  watch: {},
  mounted() {
    this.getAreaList();
  },
  methods: {
    ...mapMutations(["setAxiosAddress"]),
    onSearch(val) {
      if (val != "") {
        this.page = 0;
        this.searchAddress = [];
        this.searchBox = true;
        this.filtrate(val);
        if (this.searchAddress.length == 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      }
      if (val == "") {
        this.searchAddress = [];
        this.searchBox = false;
      }
    },
    filtrate(val) {
      this.initSearchListAll.forEach(item => {
        let name = item.name;
        if (name.includes(val)) {
          this.searchAddress.push(item);
        }
      });
    },
    onCancel() {
      this.searchBox = false;
      this.$router.go(-1);
    },
    choose(it) {
      // console.log("it", it);
      this.setAxiosAddress(it.data);
      setTimeout(() => {
        this.$router.push({ path: "/index" });
        this.searchBox = false;
      }, 100);
    },
    goToIndex(index) {
      // // eslint-disable-next-line no-debugger
      // debugger;
      this.setAxiosAddress(this.latelyAddressArray[index]);

      setTimeout(() => {
        this.$router.push({ path: "/index" });
        this.searchBox = false;
      }, 100);
    },
    getAreaList() {
      this.$axios
        .fetchGet("Mobile/Position/getAreaPostion", { mId: this.initMid })
        .then(res => {
          if (res.data.code == 0) {
            this.hotCity = res.data.data.hotcity.letterlist;
            this.list = res.data.data.lists;
            this.show = false;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.area-container
  background: #fff
  .loading
    width 100%
    padding-top 50%
    height 100vh
    position: fixed
    left 0
    top 0
    right: 0
    bottom 0
  .area-content
    padding-top 12px

    &.searchBox
      height 300px
      overflow hidden
      padding-top 67px
      position fixed
      top 40px
      right 0
      left 0
      z-index 3
    .search-input
      background: #EBEBEB;
      margin 0 12px 0 0
      width auto
      border-radius 8px
      &.searchBox
        position fixed
        top 52px
        left 12px
        right 0
    .tip-title
      font-size 14px
      color: #999999;
      margin 15px 0
      padding-left 12px
    .choose-wrap
      padding-left 12px
    .choosed-area
      min-width 23%
      padding 0 3px
      display inline-block
      // border: 1px solid #E5E5E5;
      background: #fff
      border-radius: 8px;
      height 35px
      line-height 35px
      text-align center
      font-size: 16px;
      font-family: Microsoft YaHei;
      color: #333333;
      margin-right 2%
      margin-bottom 10px
      &.location
        .icon
          width 12px
          height: 15px
          background url('./icon_1.png') center no-repeat
          background-size contain
          margin-right: 3px
        & > div
          display: inline-block
          vertical-align: middle
      &.fail
        color #999
        .icon
          background url('./icon_2.png') center no-repeat
          background-size contain
    .hot-city-ul
      font-size 0
      margin-right 12px
      padding-left 12px
      li
        min-width 23%
        // border: 1px solid #E5E5E5;
        background: #fff
        border-radius: 8px;
        height 35px
        line-height 35px
        text-align center
        font-size: 16px;
        font-family: Microsoft YaHei;
        color: #333333;
        margin-right 1%
        display inline-block
        margin-bottom 10px
  .search-content
    position fixed
    left 0
    right 0
    bottom 0
    top 108px
    background #fff
    z-index 222
    overflow auto
    .item
      height 40px
      line-height 40px
      border-bottom 1px solid #e5e5e5
      text-indent 20px
/deep/.van-index-bar__sidebar
  z-index 1
.now-choose-title
  line-height: 40px
  padding-left 12px
  color #333
  background #fff
</style>
