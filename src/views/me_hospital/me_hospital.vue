<template>
  <div class="me_hospital-container">
    <Header :indexHeader="false"></Header>
    <ul class="me-ul" v-show="!noData && initShow">
      <li v-for="item in list" :key="item.id">
        <RecommendHospital :list="item"></RecommendHospital>
      </li>
    </ul>
    <div class="title" v-show="!noData && initShow">已加入{{ total }}家医院</div>
    <van-empty description="您还没有加入过医院" v-if="noData"></van-empty>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import RecommendHospital from '@/components/recommend_hospital/recommend_hospital';
import { mapState } from 'vuex';
import { useMeta } from 'vue-meta';
export default {
  setup() {
    useMeta({
      title: '我加入的医院',
    });
  },
  name: 'meHospital',
  components: { Header, RecommendHospital },

  props: {},
  data() {
    return {
      list: [],
      total: '',
      noData: false,
      initShow: false,
    };
  },
  computed: {
    ...mapState(['uId']),
  },
  created() {},
  watch: {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.noData = false;
      this.$axios
        .fetchPost('/Mobile/user/myJoinHospital', { uId: this.uId, isuser: 1 })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = res.data.data.list;
            this.total = res.data.data.total;
            this.initShow = true;
          } else if (res.data.code == 201) {
            this.noData = true;
          }
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
.me_hospital-container
  .me-ul
    margin-left: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    li
      display: inline-block;
      padding-right: 12px;
      padding-bottom: 12px;
      width: 50%;
      height: 285px;
      vertical-align: top;
      position: relative;
      .recommend-hospital-wrap
        overflow hidden
        padding-bottom 5px
        /deep/.p3
          display -webkit-box
          overflow hidden
          text-overflow ellipsis
          word-break break-all
          -webkit-line-clamp 3
          -webkit-box-orient vertical
  .title
    font-size 12px
    color #999999
    padding 15px 0
    text-align center
</style>
