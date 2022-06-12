<template>
  <div class="diseases-container">
    <Header header="x" @clickFastRightIcon="clickHeader" @rightIcon="showHeader"></Header>
    <div
      class="title f22"
      @click.stop="showBox"
      :class="{ lessIndex: titleZindex, noDataClass: !kindList.length }"
    >
      {{ initDis }}
      <van-icon name="play" class="arrow-icon" :size="size" />
    </div>
    <div class="my-container">
      <van-popup
        v-model:show="show"
        class="pop"
        :overlay="false"
        position="top"
        :closeable="true"
        duration="0"
      >
        <div class="list">
          <div
            class="item f20"
            v-for="item in kindList"
            :key="item.catid"
            @click="changeDis(item)"
            :class="{ active: initDis === item.catname }"
          >
            {{ item.catname }}
          </div>
        </div>
      </van-popup>
    </div>

    <ul class="diseases-ul" v-if="!noData">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <li v-for="item in list" :key="item.id" @click="goToDetail(item)">
          <div class="wrap">
            <van-image class="img" :src="item.thumb" fit="cover"></van-image>
            <p class="p1 f20">{{ item.title }}</p>
          </div>
        </li>
      </van-list>
    </ul>
    <van-empty v-else description="暂无数据"></van-empty>
  </div>
</template>
<script>
import Header from '@/components/hospital_header/hospital_header';
import { mapGetters } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
import { inject } from 'vue';
export default {
  name: 'diseases',
  components: { Header },
  setup() {
    useTitles('病虫害库');
    const size = inject('size');
    return { size };
  },
  props: {},
  data() {
    return {
      show: false,
      kindList: [],
      list: [],
      loading: false,
      finished: false,
      page: 0,
      catId: '',
      titleZindex: false,
      initDis: '蔬菜虫害',
    };
  },
  computed: {
    ...mapGetters(['initMid']),
    noData() {
      return this.finished && this.list.length === 0;
    },
  },
  watch: {
    $route() {},
  },
  created() {},
  mounted() {
    this.getKind();
  },
  methods: {
    clickHeader() {
      this.titleZindex = false;
    },
    showHeader() {
      this.titleZindex = true;
      this.show = false;
    },
    changeDis(item) {
      //重新选择病虫害
      this.catId = item.catid;
      this.page = 0;
      this.list = [];
      this.show = false;
      this.onLoad();
      this.initDis = item.catname;
    },
    onLoad() {
      this.page += 1;
      this.$axios
        .fetchPost('/Mobile/Picture/getList', {
          catId: this.catId,
          page: this.page,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = this.list.concat(res.data.data);
            this.loading = false;
          } else if (res.data.code == 201) {
            // if (this.page === 1) {}
            this.finished = true;
          }
        });
    },
    getKind() {
      this.$axios.fetchPost('Mobile/Picture/getCategorys', { mId: this.initMid }).then((res) => {
        if (res.data.code == 0) {
          this.kindList = res.data.data;
        }
      });
    },
    // 返回一个特定的 DOM 节点，作为挂载的父节点
    getContainer() {
      return document.querySelector('.my-container');
    },
    showBox() {
      if (!this.kindList.length) {
        return;
      }
      this.show = true;
    },
    goToDetail(item) {
      this.$router.push({
        path: '/diseases_detail',
        query: {
          catid: item.catid,
          id: item.id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .diseases-container {
    .title {
      top: 12px;
    }
    .list {
      padding: 15px 42px 15px 15px;
    }
    :deep().pop {
      margin-top: 55px;
      .van-popup__close-icon {
        font-size: 50px;
        top: 22px;
        right: 22px;
      }
    }
  }
}
.diseases-container {
  & > .title {
    color: $f-color;
    display: flex;
    align-items: center;
    .arrow-icon {
      color: $theme-color;
      transform: rotate(90deg);
    }
  }
  .list {
    padding: 15px;
    .item {
      &.active {
        background: $theme-color;
        color: #fff;
      }
    }
  }
  :deep().pop {
    .van-popup__close-icon {
      top: 22px;
      right: 22px;
    }
  }
}
</style>
<style lang="stylus" scoped>
.diseases-container
  position relative
  & > .title
    position fixed
    left 12px
    color $theme-color
    z-index 5
    width 200px
    top 10px
    &.lessIndex
      z-index 3
    &.noDataClass
      color #666
  .diseases-ul
    padding-left 12px
    font-size 0
    margin-top 10px
    li
      width 50%
      padding-right 12px
      display inline-block
      margin-bottom 20px
      .wrap
        .img
          width 100%
          height 152px
          background #FFDCC4
        .p1
          height 48px
          line-height 48px
          color #333
          font-size 15px
          padding-left 10px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          background #fff

:deep().pop
  width 100%
  height auto
  margin-top 40px
  background #f6f7f8
  .list
    padding 15px
    background #fff
    color #333333
    font-size 15px
    & > .item
      padding 5px 9px
      display inline-block
      background #F6F6F6
      border-radius 4px
      margin-right 15px
      margin-bottom 10px
    &.list2
      & > .item
        padding 5px 15px
</style>
