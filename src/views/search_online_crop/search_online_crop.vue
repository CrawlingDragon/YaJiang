<template>
  <div class="searchOnlineCrop-container">
    <Header :indexHeader="false"></Header>
    <div class="title">共{{ this.$route.query.time }}次{{ crop }}网诊记录</div>
    <ul class="crop-ul">
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
</template>
<script>
import Header from '@/components/header/header';
import OnlineItem from '@/components/online_item/online_item';
import { useTitles } from '@/common/js/useTitles';

export default {
  setup() {
    useTitles('搜索结果');
  },
  name: 'searchOnlineCrop',

  components: { Header, OnlineItem },
  props: {},
  data() {
    return {
      crop: this.$route.query.crop,
      fid: this.$route.query.fid,
      online: [],
      loading: false,
      finished: false,
      page: 0,
    };
  },
  created() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    onLoad() {
      this.getSearchResult();
    },
    getSearchResult() {
      this.page += 1;
      this.$axios
        .fetchPost('Mobile/Wen/index', {
          fId: this.fid,
          page: this.page,
          isall: 'all',
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.loading = false;
            this.online = this.online.concat(res.data.data);
          } else if (res.data.code == 201) {
            this.finished = true;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.searchOnlineCrop-container {
  .title {
    padding: 21px 0 15px 12px;
    font-size: 14px;
    color: #363a44;
  }
  .crop-ul {
    padding-left: 12px;
    background: #fff;
    li {
      border-bottom: 1px solid $border-color;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
