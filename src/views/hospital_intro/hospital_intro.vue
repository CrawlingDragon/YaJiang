<template>
  <div class="hospital_intro-container">
    <Header header="indexHeader" navHeader="简介" :mid="mid"></Header>
    <div class="basic-info-box">
      <div class="title f22">基本信息</div>
      <div class="item">
        <div class="left">名称：</div>
        <div class="text">
          {{ intro.name }}
        </div>
      </div>
      <div class="item">
        <div class="left">属性：</div>
        <div class="text">{{ intro.level }}</div>
      </div>
      <div class="item">
        <div class="left">诊疗科室：</div>
        <div class="text">{{ intro.zuowu }}</div>
      </div>
      <div class="item">
        <div class="left">地址：</div>
        <div class="text">{{ intro.address }}</div>
      </div>
      <div class="item num-item">
        <span class="number num1"> 专家 {{ intro.enum }} </span
        ><span v-if="intro.isstore == 1" class="number num2">会员 {{ intro.mnum }}</span
        ><span class="number num3">
          {{ intro.isstore == 1 ? '处方' : '网诊' }} {{ intro.rnum }}</span
        >
      </div>
      <div class="title2 f20" v-if="mpublic.length != 0">直属下级</div>
      <ul class="lower-level-ul" v-if="mpublic.length != 0">
        <li
          v-for="item in intro.mpublic"
          :key="item.mid"
          @click="goToHospital(item.mid)"
          class="f18"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="introduce-info">
      <div class="title f22">介绍</div>
      <div class="text f18">{{ intro.introduce }}</div>
      <!-- <van-image class="img"></van-image>
      <div class="p1">医院门头</div>
      <van-image class="img"></van-image>
      <div class="p1">专家坐诊区</div> -->
      <div class="text" v-html="intro.case_info"></div>
    </div>
    <div
      class="join-btn f22"
      v-if="intro.ismember == 0 && intro.ismember == 1"
      @click="goToApplyVip"
    >
      申请加入医院
      <div class="free f14">免费</div>
    </div>
    <div class="joined f22" v-if="intro.ismember == 1">{{ intro.addtime }} 加入医院成为会员</div>
    <div class="look-more f18" @click="goToVip" v-show="intro.isstore == 1">了解更多会员权益 ></div>
  </div>
</template>
<script>
import Header from '@/components/hospital_header/hospital_header';
import { mapState, mapMutations } from 'vuex';
import { useTitles } from '../../common/js/useTitles';
export default {
  setup() {
    const title = useTitles('简介');
    return { title };
  },
  name: 'hospitalIntro',
  components: { Header },
  props: {},
  data() {
    return {
      intro: '',
      mpublic: [],
      HistoryLength: 0,
    };
  },
  // beforeRouteEnter (to, from, next) {
  //   // ...next
  //   // console.log('to :>> ', to);
  //   // console.log('from :>> ', from);
  //   // next()
  // },
  computed: {
    ...mapState(['uId', 'mid', 'hospitalName']),
  },
  watch: {},
  mounted() {
    this.getDetail();
    this.title = this.hospitalName;
  },
  methods: {
    ...mapMutations(['setMid']),
    getDetail() {
      this.$axios
        .fetchPost('/Mobile/Mpublic/getMpublicShow', {
          mId: this.mid,
          uId: this.uId,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.intro = res.data.data;
            this.mpublic = res.data.data.mpublic;
          }
        });
    },
    goToApplyVip() {
      this.$router.push({
        path: '/apply_vip',
      });
    },
    goToVip() {
      //会员权益
      this.$router.push({
        path: '/vip',
      });
    },
    goToHospital(mid) {
      this.setMid(mid);
      this.$router.replace({
        path: '/hospital',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .hospital_intro-container {
    .basic-info-box {
      margin-top: 17px;
      margin-bottom: 16px;
      .item {
        font-size: 18px;
      }
    }
  }
}
.hospital_intro-container {
  .basic-info-box {
    .lower-level-ul {
      li {
        color: $theme-color;
        border: 1px solid $theme-color;
      }
    }
  }
  .look-more {
    color: $theme-color;
  }
}
</style>
<style lang="stylus" scoped>
.hospital_intro-container
  .basic-info-box
    margin-top 10px
    padding 15px 0 0 15px
    background #fff
    margin-bottom 10px
    padding-bottom 10px
    .title
      color #333333
      font-size 16px
    .num-item
      padding-bottom 5px
    .item
      display flex
      color #656565
      font-size 14px
      line-height 26px
      padding-right: 5px;
      .number
        padding 0 10px
        border-right 1px solid #999
        line-height 18px
        margin-top 5px
        &.num1
          padding-left 0
        &.num3
          border none
      .left
        width auto
      .text
        flex 1
        .isstore
          color #fff
          background #ff6600
          float right
          margin-right 12px
          width 52px
          height 20px
          text-align center
          line-height 20px
          border-radius 100px
          font-size 12px
    .title2
      color #333333
      font-size 16px
      border-top 1px solid #e5e5e5
      margin-top 15px
      line-height 40px
    .lower-level-ul
      font-size 0
      padding-bottom 5px
      li
        display inline-block
        margin-right 20px
        padding 8px 20px
        color $theme-color
        border 1px solid $theme-color
        border-radius 4px
        font-size 14px
        margin-bottom 15px
  .introduce-info
    background #fff
    padding 15px
    padding-bottom 0
    :deep()img
      max-width 100%
      width 100%
      display block
    .title
      color #333333
      font-size 16px
      line-height 40px
    .text
      font-size 12px
      line-height 22px
      color #656565
      margin-bottom 10px
      padding-bottom 10px
    .img
      width 100%
      height 181px
    .p1
      height 36px
      line-height 36px
      text-align center
      color #656565
      font-size 12px
  .join-btn
    margin 25px 12px
    background #FF6500
    color #ffffff
    text-align center
    height 50px
    line-height 50px
    border-radius 8px
    position relative
    font-size 15px
    .free
      position absolute
      top 6px
      right 6px
      font-size 12px
      line-height 12px
  .joined
    margin 25px 12px
    color #ffffff
    text-align center
    height 50px
    line-height 50px
    color #363A44
    font-size 15px
  .look-more
    text-align center
    color $theme-color
    font-size 12px
    padding 0 15px 15px
</style>
