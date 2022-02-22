<template>
  <div class="into_hospital-conatiner">
    <Header header="searchHeader" :address="viewAddress"></Header>
    <div class="box" v-if="list_joinin != ''">
      <div class="title">加入的医院</div>
      <ul>
        <li v-for="item in list_joinin" :key="item.id">
          <RecommendHospital :list="item"></RecommendHospital>
        </li>
      </ul>
    </div>
    <div class="box" v-if="list_fav != ''">
      <div class="title">关注的医院</div>
      <ul>
        <li v-for="item in list_fav" :key="item.id">
          <RecommendHospital :list="item"></RecommendHospital>
        </li>
      </ul>
    </div>
    <div class="box" v-if="list_area != ''">
      <div class="title">新型庄稼医院</div>
      <ul>
        <li v-for="item in list_area" :key="item.id">
          <RecommendHospital :list="item"></RecommendHospital>
        </li>
      </ul>
    </div>
    <van-loading
      size="24px"
      vertical
      style="height:200px;padding-top:130px"
      v-if="loading"
      >加载中...</van-loading
    >
    <Foot></Foot>
  </div>
</template>
<script>
import Header from "@/components/hospital_header/hospital_header";
import RecommendHospital from "@/components/recommend_hospital/recommend_hospital";
import { mapGetters, mapState } from "vuex";
import Foot from "@/components/foot/foot";
import { inToHospitalLocal } from "@/common/js/into_hospital_local";

export default {
  name: "intoHospital",
  components: { Header, RecommendHospital, Foot },
  props: {},

  data() {
    return {
      list_joinin: "",
      list_fav: "",
      list_area: "",
      loading: true
    };
  },
  watch: {
    axiosAddress() {
      this.getList();
    },
    uId() {
      this.getList();
    }
  },
  computed: {
    ...mapState(["uId", "mid", "axiosAddress"]),
    ...mapGetters(["viewAddress"])
  },
  async mounted() {
    await inToHospitalLocal();
    this.getList();
    document.title = "进院";
  },
  activated() {
    document.title = "进院";
  },
  methods: {
    getList() {
      this.$axios
        .fetchPost("Mobile/Entrance/index", {
          uId: this.uId,
          location: this.axiosAddress
        })
        .then(res => {
          if (res.data.code == 0) {
            this.list_joinin = res.data.data.list_joinin;
            this.list_fav = res.data.data.list_fav;
            this.list_area = res.data.data.list_area;
            this.$nextTick(() => {
              this.loading = false;
            });
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.into_hospital-conatiner
  padding-bottom 50px
  .box
    margin-top 10px
    background #fff
    .title
      height 40px
      line-height 40px
      color #333
      font-size 17px
      border-bottom 1px solid #e5e5e5
      padding-left 12px
    ul
      margin-left 12px
      margin-top 10px
      padding-bottom 15px
      li
        width 50%
        display inline-block
        padding-right 12px
        padding-bottom 12px
        height 300px
        vertical-align top
        position relative
        .recommend-hospital-wrap
          height 100%
          /deep/.p3
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            padding-right 5px
          /deep/.p1
            padding-right 5px
          /deep/.p2
            padding-right 5px
          /deep/.number
           position absolute
           bottom 10px
</style>
