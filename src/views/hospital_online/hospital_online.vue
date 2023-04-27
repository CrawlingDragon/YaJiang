<template>
  <div class="hospital_online-container">
    <Header
      header="indexHeader"
      :navHeader="'线上' + getDefaultMenuName.questionName"
      :mid="mid"
      @updateData="updateData"
    ></Header>
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
      <ul v-show="!noData">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <li v-for="item in list" :key="item.id">
            <OnlineItem :list="item" @preImage="preverImg"></OnlineItem>
          </li>
        </van-list>
      </ul>
      <van-empty description="暂无数据" v-show="noData"></van-empty>
    </van-pull-refresh>
  </div>
</template>
<script>
import Header from '@/components/hospital_header/hospital_header';
import OnlineItem from '@/components/online_item/online_item';
import { mapState, mapGetters } from 'vuex';
import { ImagePreview } from 'vant';
import { useTitles } from '@/common/js/useTitles';
import { useTargetScroll } from '@/common/js/useTargetScroll';
import { onActivated } from 'vue';

export default {
  setup() {
    const title = useTitles('线上网诊');
    useTargetScroll();
    return { title };
  },
  name: 'hospitalOnline',
  components: {
    Header,
    OnlineItem,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },

  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 0,
      noData: false,
      refreshLoading: false,
      hospitalMid: 0, //临时保存医院的mid
    };
  },
  created() {},
  computed: {
    ...mapState(['mid', 'hospitalName']),
    ...mapGetters(['getDefaultMenuName']),
  },
  watch: {
    hospitalMid(newVal, oldVal) {
      //用临时医院mid，代替 vuex mid ，来watch
      this.resetData();
    },
  },
  mounted() {
    this.title = this.hospitalName;
  },
  activated() {
    this.hospitalMid = this.mid;
  },
  methods: {
    updateData() {
      this.resetData();
    },
    onLoad() {
      this.getList();
    },
    preverImg(item) {
      //网诊的图片预览
      ImagePreview({
        images: item.arr,
        startPosition: item.index,
        closeable: true,
      });
    },
    getList() {
      // 获取网诊列表
      this.page += 1;
      this.noData = false;
      this.$axios
        .fetchPost('/Mobile/Wen/index', {
          mId: this.mid,
          page: this.page,
          isall: 'self',
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = this.list.concat(res.data.data);
            this.loading = false;
          } else if (res.data.code == 201) {
            if (this.page == 1) {
              this.noData = true;
            }
            this.finished = true;
          }
        });
    },
    resetData() {
      this.page = 0;
      this.noData = false;
      this.list = [];
      this.getList();
    },
    onRefresh() {
      // 下拉舒心
      setTimeout(() => {
        this.resetData();
        this.refreshLoading = false;
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.hospital_online-container {
  ul {
    background: #fff;
    margin-top: 10px;
    padding-left: 12px;
    li {
      border-bottom: 1px solid $border-color;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
