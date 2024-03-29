<template>
  <div class="expert-container">
    <Header :indexHeader="false"></Header>
    <div class="person-box">
      <div class="name-bar">
        <van-image class="avator" :src="expertData.avatar"></van-image>
        <div class="name">
          {{ expertData.name }}<span>{{ expertData.groupname }}</span>
        </div>
        <div class="p1">{{ expertData.company }}</div>
      </div>
      <div class="btns">
        <div class="btn-look" v-if="expertData.id != uId" @click="attention">
          <van-icon name="plus" class="plus" v-if="status == 0" />{{
            status == 1 ? '已关注' : '关注'
          }}
        </div>
        <div
          class="btn-ask"
          v-if="expertData.identity == 1 && expertData.id != uId"
          @click="goToAsk"
        >
          <van-icon name="records" class="records" />提问
        </div>
        <div class="edit" v-if="expertData.id == uId">编辑资料</div>
      </div>
      <div class="fans">
        <div class="item">关注 {{ expertData.tofollower }}</div>
        <div class="item">粉丝 {{ expertData.follower }}</div>
      </div>
    </div>
    <div class="person-info" v-if="expertData.identity == 1">
      <div class="title-bar" @click="goToPersondetail">
        个人简介
        <div class="look-more">详细资料 ></div>
      </div>
      <p class="goodat">擅长：{{ expertData.skill }}</p>
      <p class="explan">
        {{ expertData.introduce }}
      </p>
    </div>
    <van-tabs v-model="active" sticky class="tabs" color="#155BBB" @click="onClickTab">
      <van-tab>
        <template #title> 解答 {{ expertData.posts }} </template>
        <ul class="answer-ul">
          <li v-for="item in askedList" :key="item.id">
            <OnlineItem :list="item" @preImage="preverImg"></OnlineItem>
          </li>
        </ul>
      </van-tab>
      <van-tab sticky>
        <template #title> 提问 {{ expertData.threads }} </template>
        <ul class="answer-ul">
          <li v-for="item in askMeList" :key="item.id">
            <OnlineItem :list="item" @preImage="preverImg"></OnlineItem>
          </li>
        </ul>
      </van-tab>
      <van-tab sticky>
        <template #title> 加入的医院 {{ expertData.join }} </template>
        <ul class="hospital-ul">
          <li v-for="item in hospitalList" :key="item.id">
            <RecommendHospital :list="item"></RecommendHospital>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import OnlineItem from '@/components/online_item/online_item';
import RecommendHospital from '@/components/recommend_hospital/recommend_hospital';
import { ImagePreview } from 'vant';
import { mapState } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
export default {
  setup() {
    useTitles('个人主页');
  },
  name: 'meHomePage',
  components: {
    Header,
    OnlineItem,
    RecommendHospital,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  props: {},
  data() {
    return {
      active: 0,
      id: this.$route.query.id,
      expertData: '',
      askedList: [], // 解答列表
      askMeList: [], // 提问立标
      hospitalList: [], // 计入的医院列表
      status: '',
    };
  },
  computed: {
    ...mapState(['uId']),
  },
  watch: {
    id(newVal) {
      this.getExpertData(newVal);
    },
  },
  mounted() {
    this.getExpertData();
  },
  methods: {
    getExpertData() {
      this.$axios
        .fetchPost('Mobile/user/homepage', {
          id: this.uId,
          uId: this.uId,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.expertData = res.data.data;
            this.status = res.data.data.status;
            setTimeout(() => {
              this.getIAsked();
              this.getAskMe();
            }, 100);
          }
        });
    },
    getIAsked() {
      // 解答，==> 就是我答的接口
      this.$axios
        .fetchPost('/Mobile/user/getWenList', {
          uId: this.uId,
          page: 1,
          pagesize: 12,
          action: 'answer',
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.askedList = res.data.data;
          }
        });
    },
    getAskMe() {
      //提问 ===> 就是我
      this.$axios
        .fetchPost('/Mobile/user/getWenList', {
          uId: this.uId,
          page: 1,
          pagesize: 12,
          action: 'tome',
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.askMeList = res.data.data;
          }
        });
    },
    getHospitalList() {
      // 我加入的 医院
      this.$axios
        .fetchPost('/Mobile/user/myJoinHospital', { uId: this.uId })
        .then((res) => {
          if (res.data.code == 0) {
            this.hospitalList = res.data.data.list;
          }
        });
    },
    preverImg(item) {
      //网诊的图片预览
      ImagePreview({
        images: item.arr,
        startPosition: item.index,
        closeable: true,
      });
    },
    onClickTab(name) {
      if (name == 2) {
        this.getHospitalList();
      }
    },
    goToAsk() {
      // 点击提问按钮
      this.$router.push({
        path: '/ask',
      });
    },
    goToPersondetail() {
      // 点击去个人详细简介
      this.$router.push({
        path: 'expert_detail',
        query: { id: this.expertData.id, uId: this.uId },
      });
    },
    attention() {
      let status = this.status;
      if (status == 1) {
        //  取消
        this.$axios
          .fetchPost('/Mobile/User/addOrCancelAttention', {
            uId: this.uId,
            followId: this.expertData.id,
            action: 'cancel',
          })
          .then((res) => {
            if (res.data.code == 0) {
              this.status = 0;
            }
          });
      } else {
        //  关注
        this.$axios
          .fetchPost('/Mobile/User/addOrCancelAttention', {
            uId: this.uId,
            followId: this.expertData.id,
            action: 'add',
          })
          .then((res) => {
            if (res.data.code == 0) {
              this.status = 1;
            }
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.expert-container {
  .btn-look {
    color: $theme-color;
  }
  .edit {
    color: $theme-color;
    border: 2px solid $theme-color;
  }
  .title-bar {
    border-bottom: 1px solid $border-color;
  }
  .tabs {
    :deep().van-tabs__wrap {
      border-bottom: 1px solid $border-color;
    }
    .answer-ul {
      li {
        border-bottom: 1px solid $border-color;
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
.expert-container
  .person-box
    margin-top 10px
    min-height 232px
    background-position center center
    background-size cover
    padding 40px 12px 20px
    .name-bar
      position relative
      padding-left 80px
      min-height 65px
      .avator
        position absolute
        left 0
        top 0
        width 65px
        height 65px
        border-radius 5px
        overflow hidden
      .name
        color #333
        font-size 20px
        margin-bottom 10px
        span
          font-size 12px
          color #333
          margin-left 10px
      .p1
        font-size 12px
        color #333
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
  .btns
    padding-left 80px
    font-size 0
    display flex
    margin-top 15px
    & > div
      font-size 14px
      width 80px
      height 30px
      text-align center
      border-radius 30px
      display flex
      align-items center
      justify-content center
      margin-right 22px
    .btn-look
      border 2px solid #fff
      color $theme-color
      .plus
        margin-right 4px
        font-size 15px
    .btn-ask
      border 2px solid #F49B32
      color #F49B32
      .records
        margin-right 4px
        font-size 15px
    .edit
      color $theme-color
      border 2px solid $theme-color
  .fans
    margin-top 34px
    display flex
    .item
      display inline-block
      text-align center
      flex 1
      height 27px
      line-height 27px
      border-right 1px solid #333
      font-size 14px
      color #333
      &:last-child
        border none
  .person-info
    margin-top 10px
    background #fff
    padding-bottom 12px
    .title-bar
      height 40px
      line-height 40px
      padding-left 12px
      color #666666
      font-size 12px
      border-bottom 1px solid $border-color
      position relative
      .look-more
        color #165CBB
        position absolute
        right 15px
        top 0
    .goodat
      padding 15px 50px 14px 12px
      color #343434
      font-size 15px
      line-height 15px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .explan
      padding 0 12px
      color #9A9A9A
      font-size 12px
      display -webkit-box
      -webkit-line-clamp 3
      -webkit-box-orient vertical
      overflow hidden
  .tabs
    margin-top 10px
    background #fff
    :deep().van-tabs__wrap
      border-bottom 1px solid $border-color
    :deep().van-tab--active
      color #155BBB
    .answer-ul
      padding 0 12px
      li
        border-bottom 1px solid $border-color
        &:last-child
          border none
    .hospital-ul
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
</style>
