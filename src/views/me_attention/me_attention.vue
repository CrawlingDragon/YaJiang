<template>
  <div class="me_attention-container">
    <Header :indexHeader="false"></Header>
    <ul v-if="!noDataExpert" class="expert-ul">
      <li v-for="item in expertList" :key="item.id">
        <RecommendExpert :list="item"></RecommendExpert>
      </li>
    </ul>
    <van-empty description="暂无关注专家" v-if="noDataExpert"></van-empty>
  </div>
</template>
<script>
import Header from '@/components/header/header.vue';
import RecommendHospital from '@/components/recommend_hospital/recommend_hospital.vue';
import RecommendExpert from '@/components/recommend_expert/recommend_expert.vue';
import { mapState } from 'vuex';
import { useTitles } from '@/common/js/useTitles.ts';

export default {
  name: 'meAttention',
  components: { Header, RecommendExpert, RecommendHospital },
  setup() {
    useTitles('我关注的专家');
  },
  data() {
    return {
      expertList: [],
      noDataExpert: false,
    };
  },
  computed: {
    ...mapState(['uId']),
  },
  watch: {},
  mounted() {
    this.experts();
  },
  methods: {
    experts() {
      this.noDataExpert = false;
      this.$axios
        .fetchPost('Mobile/user/getFavoriteExpert', {
          uId: this.uId,
          pagesize: 40,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.expertList = res.data.data;
          } else if (res.data.code == 201) {
            this.noDataExpert = true;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .me_attention-container {
    .expert-ul {
      width: 100%;
      column-count: auto;
      padding-right: 12px;
      margin: 0;
      padding-left: 12px;
      padding-bottom: 18px;
      li {
        break-inside: auto;
        height: 90px;
        padding: 0;
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
.me_attention-container
  .expert-ul
    column-count 2
    column-gap 0
    padding 12px 0 12px 12px
    background #fff
    margin-top 12px
    li
      break-inside avoid
      padding-right 12px
      margin-bottom 12px
      :deep().join-number
        display none
  .hospital-ul
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
        :deep().p3
          display -webkit-box
          overflow hidden
          text-overflow ellipsis
          word-break break-all
          -webkit-line-clamp 3
          -webkit-box-orient vertical
</style>
