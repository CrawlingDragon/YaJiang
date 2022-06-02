<template>
  <div class="search-online">
    <Header :indexHeader="false"></Header>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        clearable
        placeholder="搜索问答"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="content01" v-if="zuowu != ''">
      <div class="title">作物</div>
      <div
        class="text-box"
        v-for="item in zuowu"
        :key="item.fid"
        @click="goToCrop(item.name, item.threads, item.fid)"
      >
        <van-image class="img" :src="item.icon"></van-image>
        <div class="text">
          <div class="p1">{{ item.name }}</div>
          <div class="p2">网诊：{{ item.threads }}次</div>
        </div>
      </div>
    </div>
    <div class="content02" v-if="online.length != ''">
      <div class="title">线上网诊</div>
      <ul class="online-ul">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <li v-for="item in online" :key="item.id">
            <OnlineItem :list="item"></OnlineItem>
          </li>
        </van-list>
      </ul>
    </div>
    <van-empty description="未搜索到符合条件的内容" v-show="noData" />
  </div>
</template>
<script>
import Header from '@/components/header/header';
import OnlineItem from '@/components/online_item/online_item';
import { useTitles } from '@/common/js/useTitles';
export default {
  setup() {
    useTitles('搜索网诊');
  },
  name: 'searchOnline',
  components: { Header, OnlineItem },
  props: {},
  data() {
    return {
      value: '',
      zuowu: [],
      online: [],
      noData: false,
      loading: true,
      finished: false,
      page: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...
    if (from.name != 'askDetail') {
      // this.value = ''
      next((vm) => {
        vm.value = '';
        vm.zuowu = [];
        vm.online = [];
      });
    }
    next();
  },

  methods: {
    onLoad() {
      this.getSearchResult();
    },
    onSearch(val) {
      // console.log("val :>> ", val);
      if (val != '') {
        this.page = 0;
        this.online = [];
        this.zuowu = [];
        this.finished = false;
        this.onLoad();
      }
    },
    getSearchResult() {
      this.noData = false;
      this.page += 1;
      this.$axios
        .fetchPost('Mobile/Wen/index', {
          keyword: this.value,
          page: this.page,
          isall: 'all',
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.loading = false;
            this.zuowu = res.data.zwdata;
            this.online = this.online.concat(res.data.data);
          } else if (res.data.code == 201) {
            if (this.page == 1) {
              this.online = [];
              this.noData = true;
            } else {
              this.finished = true;
            }
          }
        });
    },
    onCancel() {
      this.$router.push({
        path: '/index',
      });
    },
    goToCrop(name, time, fid) {
      this.$router.push({
        path: '/searchOnlineCrop',
        query: { crop: name, time: time, fid: fid },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .search-online {
    .content02 {
      .title {
        display: none;
      }
    }
  }
}
.search-online {
  li {
    border-bottom: 1px solid $border-color;
  }
}
</style>
<style lang="stylus" scoped>
.search-online
  .content01
    .title
      padding 15px 0
      color #363A44
      font-size 12px
      padding-left 12px
    .text-box
      background #fff
      display flex
      padding 15px 12px
      align-items center
      .img
        width 60px
        height 60px
        margin-right 15px
        border-radius 10px
      .text
        flex 1
        .p1
          color #333333
          font-size 15px
          line-height 15px
          margin-bottom 7px
        .p2
          color #363A44
          font-size 12px
  .content02
    .title
      padding 15px 0
      color #363A44
      font-size 12px
      padding-left 12px
    .online-ul
      background #fff
      padding 0 12px
      li
        border-bottom 1px solid $border-color
        &:last-child
          border none
</style>
