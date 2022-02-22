<template>
  <teleport to="body">
    <div class="about-us">
      <Header :indexHeader="false"></Header>
      <div class="content">
        <p class="p1">
          新型庄稼医院，是依托中农在线“智慧农资”服务平台，通过移动互联网、物联网等信息技术，采用线上线下相结合的方式，为广大农户提供“实体+在线”服务，并通过大数据、人工智能等手段逐步将各地庄稼医院的数据和服务连接成为农服务一张网。
        </p>
        <p class="p1">
          新型庄稼医院归属于农合联，由各地农合联监督管理，地方农资公司承建运营，中农在线负责平台支撑，是现代农业社会化服务中心的标配。通过提供专业的农技服务指导、农资商品提供、惠农贷款、农产品上行助力等方式，为实施乡村振兴战略提供重要途径和抓手。
        </p>
        <p class="p1">
          益农宝·为农服务平台是新型庄稼医院的移动用户端，为农民提供在线问诊、病虫害图库、视频培训、人工智能识别、在线直播、土壤检测、优质农资商品交易等服务。
        </p>
        <van-image
          class="img"
          fit="cover"
          :src="require('./us.png')"
        ></van-image>
      </div>
      <div class="bottom">
        <div class="small-title">申请开通庄稼医院，系统性服务会员</div>
        <div class="number">
          已开通
          <div class="num" v-for="item in mpnum" :key="item.id">{{ item }}</div>
          家医院
        </div>
        <div class="btn" @click="call">申请开通庄稼医院</div>
      </div>
      <div class="tip" v-if="false">
        <p class="p2">绍兴市已开通{{ us.mpnum }}家庄稼医院</p>
        <p class="p2">收录{{ us.enum }}位专家</p>
        <p class="p2">累积处方{{ us.rnum }}次</p>
      </div>
      <a :href="'tel:' + tel" ref="tel"></a>
    </div>
  </teleport>
</template>
<script>
import Header from "@/components/header/header";
import { mapState } from "vuex";
export default {
  metaInfo: {
    title: "关于我们"
  },
  name: "aboutUs",
  components: { Header },
  props: {},
  data() {
    return {
      us: "",
      mpnumData: 0,
      tel: ""
    };
  },
  computed: {
    ...mapState(["initMid"]),
    mpnum() {
      let x = this.mpnumData;
      if (x < 10) {
        x = "0" + "0" + x;
      }
      return x.toString().split("");
    }
  },
  watch: {},
  mounted() {
    this.getAbout();
  },
  methods: {
    getAbout() {
      this.$axios.fetchPost("Mobile/Mpublic/getAboutUs").then(res => {
        if (res.data.code == 0) {
          this.us = res.data.data;
          this.mpnumData = res.data.data.mpnum;
          this.tel = res.data.data.telephone;
        }
      });
    },
    call() {
      var that = this;
      this.$dialog
        .confirm({
          title: "开通新型庄稼医院",
          message: "建院咨询请联系中农在线\n" + this.tel,
          confirmButtonText: "取消",
          confirmButtonColor: "#999999",
          cancelButtonText: "拨打电话",
          cancelButtonColor: "#155BBB"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
          that.$refs.tel.click();
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.about-us
  background #fff
  height 100%
  padding-top 40px
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  overflow-y: auto
  .content
    padding 10px 12px 15px
    .p1
      color #333
      font-size 15px
      line-height 20px
      margin-bottom 5px
      text-indent: 2em
      &:last-child
        margin-bottom 0
  .bottom
    background #fff
    padding 12px
    margin-top 10px
    margin-bottom 40px
    .small-title
      color #333333
      font-size 16px
      padding 8px 0 15px
      text-align center
    .number
      color #999999
      font-size 12px
      text-align center
      display flex
      align-items center
      justify-content center
      .num
        display inline-block
        width 27px
        height 38px
        line-height 38px
        border 1px dashed rgba(123, 179, 255, 1)
        border-radius 5px
        margin 0 5px
        font-size 30px
        color #333
        font-family HYLingXinJ
        font-weight bold
    .btn
      margin 20px 12px 0
      background #FF6600
      border-radius 4px
      color #FFFFFF
      font-size 15px
      height 50px
      line-height 50px
      text-align center
  .tip
    text-align center
    color #999999
    font-size 12px
    line-height 25px
    margin-top 25px
    padding-bottom 20px
</style>
