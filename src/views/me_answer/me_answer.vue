<template>
  <div class="me_answer-container">
    <Header :header="'xx'"></Header>
    <van-tabs
      v-model:active="activeValue"
      class="tabs"
      sticky
      @clickTab="tabClickFn"
      @dblclick="tabDblclickFn"
    >
      <van-tab title="我问的" class="tab">
        <div class="wrap">
          <van-list
            v-model:loading="loading1"
            :finished="finished1"
            finished-text="没有更多了"
            @load="onLoad1"
            v-if="!noData1"
          >
            <div class="item" v-for="item in ask" :key="item.id">
              <OnlineItem :list="item"></OnlineItem>
            </div>
          </van-list>
        </div>
        <van-empty description="暂无提问" v-if="noData1"></van-empty>
      </van-tab>
      <van-tab title="我答的" class="tab">
        <div class="wrap">
          <van-list
            v-model:loading="loading2"
            :finished="finished2"
            finished-text="没有更多了"
            @load="onLoad2"
            v-if="!noData2"
          >
            <div class="item" v-for="item in answer" :key="item.id">
              <OnlineItem :list="item"></OnlineItem>
            </div>
          </van-list>
        </div>
        <van-empty description="暂无解答" v-if="noData2"></van-empty>
      </van-tab>
      <van-tab title="咨询我的" class="tab">
        <!-- v-if="identity == 1" -->
        <div class="wrap">
          <van-list
            v-model:loading="loading3"
            :finished="finished3"
            finished-text="没有更多了"
            @load="onLoad3"
            v-if="!noData3"
          >
            <div class="item" v-for="item in information" :key="item.id">
              <OnlineItem :list="item"></OnlineItem>
            </div>
          </van-list>
        </div>
        <van-empty description="暂无咨询" v-if="noData3"></van-empty>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Header from '@/components/hospital_header/hospital_header.vue';
import OnlineItem from '@/components/online_item/online_item.vue';
import { mapState, mapGetters } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
import { useTargetScroll } from '@/common/js/useTargetScroll';
var Before_scollH = 0;
export default {
  setup() {
    useTitles('问答管理');
    const { scrollTop } = useTargetScroll();
    return { scrollTop };
  },
  name: 'meAnswer',
  components: { Header, OnlineItem },
  props: {},
  data() {
    return {
      activeValue: 0,
      ask: [],
      answer: [],
      information: [],
      identity: 0,
      noData1: false,
      loading1: false,
      finished1: false,
      page1: 0,
      noData2: false,
      loading2: false,
      finished2: false,
      page2: 0,
      noData3: false,
      loading3: false,
      finished3: false,
      page3: 0,
      scollType: '',
      num: 0,
      name: 0,
    };
  },
  computed: {
    ...mapState(['uId', 'mid']),
    ...mapGetters(['initMid']),
  },
  watch: {
    scollType(newVal) {
      if (newVal == 'down') {
        this.num = 0;
      } else {
        this.num = 30;
      }
    },
  },
  mounted() {
    // window.addEventListener('scroll', this.scrollHandler);
    this.getUserInfo();
  },
  // unmounted() {
  //   window.removeEventListener('scroll', this.scrollHandler);
  // },
  methods: {
    // scrollHandler() {
    //   var After_scollH =
    //     window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //   var differH = After_scollH - Before_scollH;
    //   if (differH == 0) {
    //     return false;
    //   }
    //   this.scollType = differH > 0 ? 'down' : 'up';
    //   Before_scollH = After_scollH;
    // },
    // scroll() {
    //   // console.log('val :>> ', val);
    //   // val
    // },
    tabClickFn(obj) {
      //单击tab切换，获取对应tab
      this.name = obj.name;
    },
    tabDblclickFn() {
      // 双击tab切换，更新数据
      let active = this.name;
      switch (active) {
        case 0:
          this.page1 = 0;
          this.ask = [];
          this.myAsk();
          break;
        case 1:
          this.page2 = 0;
          this.answer = [];
          this.myAnswer();
          break;
        case 2:
          this.page3 = 0;
          this.information = [];
          this.myInformation();
          break;
      }
    },
    onLoad1() {
      this.loading1 = true;
      this.myAsk();
    },
    onLoad2() {
      this.myAnswer();
    },
    onLoad3() {
      this.myInformation();
    },
    myAsk() {
      this.page1 += 1;
      // 我问的
      this.$axios
        .fetchPost('/Mobile/User/getWenList', {
          uId: this.uId,
          action: 'ask',
          page: this.page1,
          isuser: 1,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.ask = this.ask.concat(res.data.data);
            this.loading1 = false;
          } else if (res.data.code == 201) {
            // console.log("this.page1 :>> ", this.page1);
            if (this.page1 == 1) {
              this.noData1 = true;
            }
            this.finished1 = true;
          }
        });
    },
    myAnswer() {
      // 我答的
      this.page2 += 1;
      this.$axios
        .fetchPost('/Mobile/User/getWenList', {
          uId: this.uId,
          page: this.page2,
          action: 'answer',
          isuser: 1,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.answer = this.answer.concat(res.data.data);
            // this.answer = [];
            this.loading2 = false;
          } else if (res.data.code == 201) {
            if (this.page2 == 1) {
              this.noData2 = true;
            }
            this.finished2 = true;
          }
        });
    },
    myInformation() {
      // 咨询我的
      this.page3 += 1;
      this.$axios
        .fetchPost('/Mobile/User/getWenList', {
          uId: this.uId,
          action: 'tome',
          page: this.page3,
          isuser: 1,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.information = this.information.concat(res.data.data);
            this.loading3 = false;
          }
          if (res.data.code == 201) {
            if (this.page3 == 1) {
              this.noData3 = true;
            }
            this.finished3 = true;
          }
        });
    },
    getUserInfo() {
      this.$axios
        .fetchPost('Mobile/User/userCenter', {
          uId: this.uId,
          mId: this.initMid,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.user = res.data.data;
            this.identity = res.data.data.identity;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .me_answer-container {
    .tabs {
      :deep().van-tabs__wrap {
        top: 0px;
        height: 54px;
      }
    }
  }
}
.me_answer-container {
  .tabs {
    // height: 1000px;
    // height: 100%;
    // overflow: hidden;
    .tab {
      .wrap {
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 0 12px;
      }
      .item {
        border-bottom: 1px solid #e5e5e5;
        &:last-child {
          border: none;
        }
      }
    }
    :deep().van-tabs__wrap {
      position: fixed;
      z-index: 1111111;
      height: 39px;
      top: 0px;
      width: 256px;
    }
    :deep().van-tabs__line {
      background: $theme-color !important;
    }
    :deep().van-tab {
      flex: 1 auto;
    }
  }
}
</style>
