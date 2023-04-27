<template>
  <div class="me_hospital-container">
    <Header :indexHeader="false"></Header>
    <ul class="me-ul" v-show="!noData && initShow">
      <li v-for="item in list" :key="item.id">
        <RecommendHospital :list="item"></RecommendHospital>
      </li>
    </ul>
    <div class="title f18" v-show="!noData && initShow">
      已加入{{ total }}家{{ getDefaultMenuName.hospitalName }}
    </div>
    <van-empty
      :description="'您还没有加入过' + getDefaultMenuName.hospitalName"
      v-if="noData"
    ></van-empty>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import RecommendHospital from '@/components/recommend_hospital/recommend_hospital';
import { mapState, mapGetters, useStore } from 'vuex';
import { useTitles } from '../../common/js/useTitles';
import { computed } from 'vue';
export default {
  setup() {
    const store = useStore();
    const getDefaultMenuName = computed(() => store.getters.getDefaultMenuName);
    const text = '我加入的' + getDefaultMenuName.value.hospitalName;
    useTitles(text);
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
    ...mapGetters(['getDefaultMenuName']),
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
<style lang="scss" scoped>
.old {
  .me_hospital-container {
    .me-ul {
      li {
        width: 100%;
        height: 105px;
        .recommend-hospital-wrap {
          padding-bottom: 0;
        }
      }
    }
  }
}
.me_hospital-container {
  .title {
    font-size: 12px;
    color: $f-color-second;
    padding: 15px 0;
    text-align: center;
  }
}
</style>
<style lang="stylus" scoped>
.me_hospital-container
  .me-ul
    padding-left: 12px;
    padding-top: 15px;
    margin-bottom: 15px;
    background #fff
    margin-top 15px
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
