<template>
  <div class="area-container" teleport="body">
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
      <div style="background: #ebebeb">
        <div class="now-choose-title">当前选择:{{ currentSelectAddress }}</div>
        <div class="tip-title">定位/最近访问</div>
        <div class="choose-wrap">
          <div
            class="choosed-area location"
            :class="{
              fail:
                geoViewAddress == '定位失败' ||
                geoViewAddress == '定位中...' ||
                geoViewAddress == '',
            }"
            @click="clickGeoAddress"
          >
            <div class="icon"></div>
            <div>{{ geoViewAddress || '定位失败' }}</div>
          </div>
          <!--  最近选择地址 -->
          <div class="choosed-area" @click="goToIndexOnline('全部地区')">全部地区</div>
          <div
            class="choosed-area"
            @click="goToIndexOnline(index)"
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
        <van-index-bar
          :sticky-offset-top="40"
          :index-list="indexList"
          :style="{ top: barTop + 'px' }"
        >
          <!-- class="bar" -->
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
import Headers from '@/components/header/header.vue';
import { geo } from '@/common/js/baidu_locationAddress.js';
import { mapState, useStore } from 'vuex';
import { computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import storage from 'good-storage';

export default {
  name: 'index_online_address',
  metaInfo() {
    return {
      title: '切换地区',
    };
  },
  components: { Headers },
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();
    const geoViewAddress = computed(() => store.getters.geoViewAddress);
    const geoAddress = computed(() => store.state.geoAddress);
    const { geolocationAgain } = geo();
    onUnmounted(() => {
      console.log('geoAddress', geoAddress);
      if (geoViewAddress.value == '定位中...') {
        store.commit('setGeoAddress', '定位失败');
        return;
      }
    });
    async function clickGeoAddress() {
      //点击定位地址
      // 如果是定位失败。重新定位
      if (geoViewAddress.value == '定位中...') {
        Toast('定位中');
        return;
      }
      if (geoViewAddress.value === '定位失败') {
        store.commit('setGeoAddress', '定位中...');
        await geolocationAgain();
        return;
        // to do
      }
      //路由到首页网诊
      setTimeout(() => {
        emit('update:fetchAddress', geoAddress.value);
        router.push({
          path: '/index_online',
          // query: { address: geoAddress.value, axiosAddress: geoAddress.value },
        });
      }, 300);
    }
    return {
      clickGeoAddress,
      geoViewAddress,
    };
  },
  emits: ['update:fetchAddress'],
  data() {
    return {
      value: '',
      hotCity: [],
      list: [],
      searchAddress: [],
      searchBox: false,
      noData: false,
      show: true,
      barTop: 64,
      storageArr: storage.get('onlineLatelyAddressArray', []),
    };
  },
  activated() {
    this.value = '';
    this.searchBox = false;
    this.storageArr = storage.get('onlineLatelyAddressArray', []);
    console.log(' this.storageArr', this.storageArr);
  },
  computed: {
    ...mapState(['geoAddress', 'latelyAddressArray']),
    initSearchListAll() {
      let arr = [];
      this.list.forEach((item) => {
        arr = arr.concat(item.items);
      });
      return arr;
    },
    computedList() {
      let arr = [];
      arr = this.list.filter((item) => {
        return item.items.length != 0;
      });
      return arr;
    },
    indexList() {
      let arr = [];
      this.list.forEach((item) => {
        if (item.items.length != 0) {
          arr.push(item.index);
        }
      });
      return arr;
    },
    latelyAddressArrayComputed() {
      let arr = [];
      this.storageArr.forEach((item) => {
        let x = item.split(',');
        let y = x[x.length - 1];
        arr.push(y);
      });
      return arr;
    },
    currentSelectAddress() {
      return this.$route.query.address;
    },
    currentAxiosAddress() {
      return this.$route.query.axiosAddress;
    },
  },

  mounted() {
    this.getAreaList();
  },

  methods: {
    onSearch(val) {
      if (val != '') {
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
      if (val == '') {
        this.searchAddress = [];
        this.searchBox = false;
      }
    },
    filtrate(val) {
      this.initSearchListAll.forEach((item) => {
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
      setTimeout(() => {
        this.$router.push({
          path: '/index_online',
          // query: { address: it.data, axiosAddress: it.data },
        });
        this.$emit('update:fetchAddress', it.data);
        this.searchBox = false;
      }, 100);
    },
    goToIndexOnline(index) {
      //  选择最近选择地址
      if (index === '全部地区') {
        this.$router.push({
          path: '/index_online',
        });
        this.$emit('update:fetchAddress', '全部地区');
      } else {
        let storageArr = storage.get('onlineLatelyAddressArray', []);
        let address = storageArr[index];
        this.$router.push({
          path: '/index_online',
        });
        this.$emit('update:fetchAddress', address);
      }
      this.searchBox = false;
    },
    getAreaList() {
      this.$axios.fetchGet('Mobile/Position/getAreaPostion').then((res) => {
        if (res.data.code == 0) {
          this.hotCity = res.data.data.hotcity.letterlist;
          this.list = res.data.data.lists;
          this.show = false;
          // this.computedBarTop();
        }
      });
    },
    computedBarTop() {
      let h = this.$refs.historyRef.getBoundingClientRect().height;
      console.log('h', h);
      if (h > 0) {
        this.barTop = h + 64;
      } else {
        this.barTop = 64;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.area-container
  background: #fff
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 9999999999999
  overflow auto
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
    padding-top 50px
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
      color: #363A44;
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
      margin-right 1%
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
        margin-right 2%
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
:deep().van-index-bar__sidebar
  z-index 1
.now-choose-title
  line-height: 40px
  padding-left 12px
  color #333
  background #fff
.bar
  z-index 9999999
  position fixed
  background #fff
  left 0
  top 54px
  right 0
  bottom 0
  width 100%
  height 100%
  overflow auto
</style>
