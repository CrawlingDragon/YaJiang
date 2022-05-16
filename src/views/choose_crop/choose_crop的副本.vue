<template>
  <div class="choose_crop-container">
    <form action="/" class="from">
      <van-search
        v-model="chooseValue"
        show-action
        placeholder="请输入作物名"
        @search="onSearch"
        @cancel="onCancel"
        clearable
        @update:model-value="onSearch"
      />
    </form>
    <div class="history-box">
      <div class="title">当前选择：{{ cropName }}</div>
      <div class="history-ul" v-show="hispitalList.length != 0">
        <div class="small-title">最近选择/全部作物</div>
        <li v-for="item in hispitalList" :key="item.fid" @click="choose(item)">
          {{ item.name }}
        </li>
      </div>
    </div>
    <van-index-bar class="bar" :index-list="letterList" v-show="!searchResultShow">
      <div v-for="item in list" :key="item.id">
        <van-index-anchor :index="item.letter" />
        <van-cell
          :title="it.name"
          v-for="it in item.index"
          :key="it.fid"
          @click="choose(it)"
        />
      </div>
    </van-index-bar>
    <ul class="search_result-ul" v-show="searchResultShow">
      <!-- <van-empty description="抱歉没有该作物,请选择其他" v-show="noResult" /> -->
      <div class="noData" v-show="noResult">
        抱歉没有该作物,可选择<span
          class="other"
          @click="choose({ name: '其他', fid: 195 })"
          >其他</span
        >
      </div>
      <li v-for="item in searchResult" :key="item.fid" @click="choose(item)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { useTitles } from '@/common/js/useTitles';

export default {
  setup() {
    useTitles('搜索作物');
  },
  name: 'chooseCrop',
  components: {},
  props: {},
  data() {
    return {
      chooseValue: '',
      list: [],
      hispitalList: [],
      cropName: this.$route.query.crop,
      searchResult: [],
      searchResultShow: false,
      noResult: false,
    };
  },
  created() {},
  computed: {
    ...mapState(['uId']),
    letterList() {
      let arr = [];
      this.list.forEach((el) => {
        arr.push(el.letter);
      });
      return arr;
    },
    crops() {
      let arr = [];
      this.list.forEach((el) => {
        arr = arr.concat(el.index);
      });
      return arr;
    },
  },
  watch: {
    searchResult(newVal) {
      if (newVal.length == 0) {
        this.noResult = true;
      } else {
        this.noResult = false;
      }
    },
  },
  mounted() {
    this.getCropList();
  },
  methods: {
    onSearch(val) {
      this.searchResult = [];
      this.crops.forEach((el) => {
        if (el.name.indexOf(val) >= 0) {
          this.searchResult.push(el);
        }
      });
      this.searchResultShow = true;
      if (val == '') {
        this.searchResultShow = false;
      }
    },
    choose(item) {
      //搜索历史 选择作物
      this.$router.push({
        path: '/index_online',
        query: { fid: item.fid, name: item.name },
      });
      this.searchResultShow = false;
    },
    onCancel() {
      this.$router.push({
        path: '/index_online',
        query: { fid: '', name: '' },
      });
      this.searchResultShow = false;
    },
    getCropList() {
      this.$axios
        .fetchPost('Mobile/Mpublic/getCropIndexQuery', { uId: this.uId })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = res.data.data;
            if (res.data.historydata) {
              this.hispitalList = res.data.historydata;
            }
          }
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
.choose_crop-container
  padding-top 5px
  position relative
  .from
    position fixed
    top 0px
    left 0
    right 0
    z-index 1111
    &.showResult
      height 100%
      bottom 0
      overflow hidden
  .history-box
    margin-top 10px
    .title
      height 40px
      line-height 40px
      color #333333
      font-size 15px
      padding-left 12px
      background #fff
    .history-ul
      padding-left 12px
      font-size 0
      .small-title
        font-size 12px
        color #363A44
        line-height 12px
        padding 15px 0
      li
        min-width 65px
        padding 0 5px
        height 25px
        line-height 25px
        color #333333
        background #fff
        font-size 15px
        display inline-block
        margin-right 15px
        margin-bottom 10px
        border-radius 8px
        text-align center
  .search_result-ul
    position fixed
    top 55px
    left 0
    right 0
    bottom 0
    background #EBEBEB
    z-index 111
    li
      line-height 40px
      border-bottom 1px solid #e5e5e5
      background #fff
      height 40px
      color #333333
      font-size 14px
      padding 0 12px
    .noData
      height 300px
      line-height 300px
      text-align center
      .other
        color $theme-color
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
