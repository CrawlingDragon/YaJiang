<template>
  <div class="expert-container">
    <Header :indexHeader="false"></Header>
    <div class="person-box">
      <div class="name-bar">
        <van-image class="avator" :src="expertData.avatar" fit="cover"></van-image>
        <div class="name f30">
          {{ expertData.name }}
          <span v-if="identity == 1 && id != aiExpertId" class="f16">
            {{ expertData.groupname }}
          </span>
        </div>
        <div v-if="identity == 0" @click="goToCrop" class="name-bar-crop f16">
          {{ expertData.forum }}
        </div>
        <van-overlay :show="skillShow" @click="skillShow = false">
          <div class="wrapper" @click.stop @click="skillShow = false">
            <div class="avatar-box">
              <van-image :src="expertData.avatar" fit="cover" radius="5px"></van-image>
              <p class="avatar-p1 f16">{{ expertData.name }}</p>
            </div>
            <div class="crop-lis">
              <div class="left f16">种植作物</div>
              <div class="crop f16">
                {{ identity == 1 ? expertData.skill : expertData.forum }}
              </div>
            </div>
          </div>
        </van-overlay>
        <div class="p1 f16">{{ expertData.company }} {{ expertData.position }}</div>
      </div>
      <div class="btns">
        <div
          class="btn-look f17"
          v-if="$route.query.from != 'my' && expertData.isme == 0"
          @click="attention"
        >
          <van-icon name="plus" class="plus" v-if="status == 0" />{{
            status == 1 ? '已关注' : '关注'
          }}
        </div>
        <div
          class="btn-ask f17"
          v-if="
            expertData.identity == 1 &&
            $route.query.from != 'my' &&
            id != aiExpertId &&
            expertData.isme != 1
          "
          @click="goToAsk"
        >
          <van-icon name="records" class="records" />提问
        </div>
        <div
          class="edit f17"
          @click="goToMeEdit"
          v-if="$route.query.from == 'my' || expertData.isme == 1"
        >
          编辑资料
        </div>
      </div>
      <div class="fans">
        <!-- <div class="item f17">赞 {{ expertData.digzan }}</div> -->
        <div class="item f17">关注 {{ expertData.tofollower }}</div>
        <div class="item f17">粉丝 {{ expertData.follower }}</div>
      </div>
    </div>
    <div
      class="person-info"
      v-if="expertData.identity == 1 && (expertData.skill != '' || expertData.introduce != '')"
    >
      <div class="title-bar f17" @click="goToPersondetail">
        个人简介
        <div class="look-more">详细资料 ></div>
      </div>
      <p class="goodat f20" v-if="expertData.skill">擅长：{{ expertData.skill }}</p>
      <p class="explan f16" v-if="expertData.introduce">
        {{ expertData.introduce }}
      </p>
    </div>
    <van-tabs
      v-model:active="actives"
      sticky
      class="tabs"
      color="#0D90FF"
      :offset-top="num"
      :class="{ aiTab: id == aiExpertId }"
      @dblclick="updateData"
      @clickTab="fn"
    >
      <van-tab>
        <template #title>
          解答 <span>{{ expertData.posts }} </span>
        </template>
        <van-empty description="暂无解答" v-if="noData" />
        <ul class="answer-ul" v-else>
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <li v-for="item in askedList" :key="item.id">
              <OnlineItem :list="item" @preImage="preverImg"></OnlineItem>
            </li>
          </van-list>
        </ul>
      </van-tab>
      <van-tab sticky v-if="id != aiExpertId">
        <template #title> 提问 {{ expertData.threads }} </template>
        <van-empty description="暂无提问" v-if="noData2" />
        <ul class="answer-ul" v-show="id != aiExpertId" v-else>
          <van-list
            v-model:loading="loading2"
            :finished="finished2"
            finished-text="没有更多了"
            @load="onLoad2"
            :immediate-check="false"
          >
            <li v-for="item in askMeList" :key="item.id">
              <OnlineItem :list="item" @preImage="preverImg"></OnlineItem>
            </li>
          </van-list>
        </ul>
      </van-tab>
      <van-tab sticky v-if="id != aiExpertId">
        <template #title>
          加入的{{ getDefaultMenuName.hospitalName }} {{ expertData.join }}
        </template>
        <van-empty :description="'暂未加入' + getDefaultMenuName.hospitalName" v-if="noData3" />
        <ul class="hospital-ul" v-show="id != aiExpertId" v-else>
          <van-list
            v-model:loading="loading3"
            :finished="finished3"
            @load="onLoad3"
            :immediate-check="false"
          >
            <li v-for="item in hospitalList" :key="item.id">
              <RecommendHospital :list="item"></RecommendHospital>
            </li>
          </van-list>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
var Before_scollH = 0;
import Header from '@/components/header/header';
import OnlineItem from '@/components/online_item/online_item';
import RecommendHospital from '@/components/recommend_hospital/recommend_hospital';
import { ImagePreview } from 'vant';
import { mapState, mapGetters } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
import { login } from '@/common/js/getToken';
import { useTargetScroll } from '@/common/js/useTargetScroll';
import { ref } from 'vue';
export default {
  setup() {
    useTitles('专家');
    const actives = ref(0);
    const scrollTop = useTargetScroll();
    return { scrollTop, actives };
  },
  name: 'expert',
  components: {
    Header,
    OnlineItem,
    RecommendHospital,
  },
  props: {},
  data() {
    return {
      identity: 0, //是否是专家
      expertid: '',
      expertData: '',
      askedList: [], // 解答列表
      askMeList: [], // 提问立标
      hospitalList: [], // 计入的医院列表
      status: '',
      loading: true,
      finished: false,
      page: 0,
      noData: false,
      loading2: false,
      finished2: false,
      page2: 0,
      noData2: false,
      loading3: false,
      finished3: false,
      page3: 0,
      noData3: false,
      skillShow: false,
      scollType: '',
      num: 0,
      // 判断是否是自己
      isSelf: 0,
      id: this.$route.query.id,
      name: '', //tab切换卡的name，用于双击传递值
    };
  },
  computed: {
    from() {
      return this.$route.query.from;
    },
    ...mapState(['uId']),
    ...mapGetters(['aiExpertId', 'getDefaultMenuName']),
  },
  created() {},
  activated() {
    let id = this.$route.query.id;
    if (id !== this.id) {
      this.scrollTop = 0;
      this.id = id;
      this.resetData();
    }
  },
  watch: {
    scollType(newVal) {
      if (newVal == 'down') {
        this.num = 0;
      } else {
        this.num = 40;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler);
    this.getExpertData(this.id);
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  methods: {
    fn(el) {
      this.name = el.name;
    },
    updateData() {
      console.log('this.name', this.name);
      switch (this.name) {
        case 0: // 双击解答，重置数据
          this.page = 0;
          this.askedList = []; // 解答列表
          this.getIAsked();
          break;
        case 1: // 双击提问，重置数据
          this.page2 = 0;
          this.askMeList = []; // 提问立标
          this.getAskMe();
          break;
        case 2: // 双击加入的医院，重置数据
          this.page3 = 0;
          this.hospitalList = []; // 计入的医院列表
          this.getHospitalList();
          break;
      }
    },
    resetData() {
      this.actives = 0;
      this.page = 0;
      this.page2 = 0;
      this.page3 = 0;
      this.askedList = []; // 解答列表
      this.askMeList = []; // 提问立标
      this.hospitalList = []; // 计入的医院列表
      this.getExpertData(this.id);
      // console.log('this.scollType :>> ', this.scollType);
    },
    onLoad() {
      this.getIAsked();
    },
    onLoad2() {
      this.getAskMe();
    },
    onLoad3() {
      this.getHospitalList();
    },
    getExpertData(id) {
      this.$axios
        .fetchPost('Mobile/user/homepage', {
          from: this.from,
          id: this.from === 'ai' ? this.aiExpertId : this.from === 'my' ? this.uId : id,
          uId: this.uId,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.identity = res.data.data.identity;
            this.expertData = res.data.data;
            this.status = res.data.data.status;
            this.expertid = res.data.data.uid;
            document.title = this.expertData.name;
            this.isSelf = res.data.data.isme;
            setTimeout(() => {
              this.getIAsked();
              this.getAskMe();
              this.getHospitalList();
            }, 100);
          }
        });
    },
    getIAsked() {
      // 解答，==> 就是我答的接口
      this.page += 1;
      this.noData = false;
      this.$axios
        .fetchPost('/Mobile/user/getWenList', {
          uId: this.isSelf === 1 ? this.uId : this.expertid,
          isuser: this.isSelf,
          page: this.page,
          pagesize: 12,
          action: 'answer',
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.loading = false;
            this.askedList = this.askedList.concat(res.data.data);
          } else if (res.data.code == 201) {
            if (this.page == 1) {
              this.noData = true;
            }
            this.loading = false;
            this.finished = true;
          }
        });
    },
    getAskMe() {
      //提问 ===> 就是我
      this.page2 += 1;
      this.noData2 = false;
      this.$axios
        .fetchPost('/Mobile/user/getWenList', {
          uId: this.isSelf === 1 ? this.uId : this.expertid,
          isuser: this.isSelf,
          page: this.page2,
          pagesize: 12,
          action: 'ask',
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.loading2 = false;
            this.askMeList = res.data.data;
          } else if (res.data.code == 201) {
            if (this.page2 == 1) {
              this.noData2 = true;
            }
            this.finished2 = false;
            this.finished2 = true;
          }
        });
    },
    getHospitalList() {
      // 我加入的 医院
      this.page3 += 1;
      this.noData3 = false;
      this.$axios
        .fetchPost('/Mobile/user/myJoinHospital', {
          uId: this.isSelf === 1 ? this.uId : this.expertid,
          isuser: this.isSelf,
          page: this.page3,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.hospitalList = res.data.data.list;
            this.loading3 = false;
          } else if (res.data.code == 201) {
            if (this.page3 == 1) {
              this.noData3 = true;
            }
            this.loading3 = false;
            this.finished3 = true;
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
    // onClickTab(name) {
    //   // if (name == 2) {
    //   //   this.getHospitalList();
    //   // }
    // },
    goToAsk() {
      // 点击提问按钮
      this.$router.push({
        path: '/ask',
        query: { expert: this.expertData.name, expertId: this.expertData.id },
      });
    },
    goToMeEdit() {
      this.$router.push({
        path: '/me_edit',
      });
    },
    goToPersondetail() {
      // 点击去个人详细简介
      this.$router.push({
        path: 'expert_detail',
        query: { id: this.expertData.id, uid: this.uId },
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
        if (!this.uId) {
          // 未登录的情况下，点击关注
          login();
          return;
        }
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
    goToCrop() {
      this.skillShow = true;
    },
    scrollHandler() {
      var After_scollH =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var differH = After_scollH - Before_scollH;
      if (differH == 0) {
        return false;
      }
      this.scollType = differH > 0 ? 'down' : 'up';
      Before_scollH = After_scollH;
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .expert-container {
    .btns {
      .btn-look,
      .btn-ask,
      .edit {
        width: 95px;
        i {
          font-size: 22px;
        }
      }
    }
    .hospital-ul {
      li {
        width: 100% !important;
        height: 105px !important;
      }
    }
  }
}
.expert-container {
  .look-more {
    color: $theme-color;
  }
  .edit {
    color: #fff;
    border: 2px solid #fff;
  }
  .tabs {
    :deep().van-tab--active {
      color: $theme-color;
    }
    :deep().van-tab {
      flex: 1 auto;
    }
  }
}
.title-bar {
  border-bottom: 1px solid $border-color;
}
:deep().van-tabs__wrap {
  border-bottom: 1px solid $border-color;
}
:deep().van-tab--active {
  color: $theme-color;
}
.answer-ul {
  li {
    border-bottom: 1px solid $border-color;
  }
}
</style>
<style lang="stylus" scoped>
.expert-container
  .person-box
    margin-top 10px
    min-height 232px
    background url('./bj.png') no-repeat
    background-position center center
    background-size cover
    padding 40px 12px 20px
    color #333
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
        background #fff
      .name
        color #fff
        font-size 20px
        margin-bottom 10px
        span
          font-size 12px
          margin-left 10px
      .p1
        color #fff
        font-size 12px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .name-bar-crop
        font-size 12px
        color #fff
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
      color #fff
      .plus
        margin-right 4px
        font-size 15px
    .btn-ask
      border 2px solid #F49B32
      color #F49B32
      .records
        margin-right 4px
        font-size 15px

  .fans
    margin-top 34px
    display flex
    .item
      display inline-block
      text-align center
      flex 1
      height 27px
      line-height 27px
      border-right 1px solid  #fff
      font-size 14px
      color #fff
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
        color $theme-color
        position absolute
        right 15px
        top 0
    .goodat
      padding 15px 50px 5px 12px
      color #343434
      font-size 15px
      line-height 15px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .explan
      margin 5px 12px 0
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
      color $theme-color
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
      :deep().van-list__finished-text
        position absolute
        bottom 0
        line-height 40px
        left 0
        right 0
        text-align center
      :deep().van-list__placeholder
        position absolute
        bottom 0
        line-height 40px
        left 0
        right 0
        text-align center
.van-overlay
  z-index 2
  top 40px
.wrapper
  background #f6f7f8
  position fixed
  left 0
  top 40px
  bottom 0
  right 0
  z-index 999
  .avatar-box
    width 100%
    height 150px
    background #fff
    text-align center
    .van-image
      margin 25px auto 10px
      width 65px
      height 65px
    .avatar-p1
      color #333
      font-size 20px
  .crop-lis
    margin-top 10px
    min-height 50px
    padding 18px 15px 15px
    background #fff
    display flex
    .left
      width 103px
      color #363A44
      margin-right 15px
.aiTab
  .van-tabs__nav
    flex 0
  :deep().van-tab--active
    width 100px
    display block
    flex 0
    text-align left
    line-height 43px
    padding-left 12px
    .van-tab__text--ellipsis
      width 70px
  :deep().van-tabs__line
    display none
:deep().van-empty__image
  display none
</style>
