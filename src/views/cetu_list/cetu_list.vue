<template>
  <div class="cetu_list-container">
    <Header :indexHeader="false" v-if="from == 'me'"></Header>
    <HeaderHospital navHeader="测土配方" v-else></HeaderHospital>
    <ul class="cetu_ul" v-show="!noData">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <li v-for="item in list" :key="item.ids" @click="goToDetail(item.id)">
          <div class="top">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="time">{{ item.showtime }}</div>
          </div>
          <div class="hospital" v-if="from == 'me'">{{ item.mpublic }}</div>
        </li>
      </van-list>
    </ul>
    <van-empty description="暂无土壤检测报告" v-show="noData"></van-empty>
  </div>
</template>
<script>
import Header from "@/components/header/header";
import HeaderHospital from "@/components/hospital_header/hospital_header";
import { mapState } from "vuex";
import { useMeta } from "vue-meta";
export default {
  name: "cetuList",
  components: { Header, HeaderHospital },
  props: {},
  setup() {
    const { meta } = useMeta({
      title: "土壤检测"
    });
    return { meta };
  },
  created() {},
  data() {
    return {
      list: [],
      noData: false,
      from: this.$route.query.from,
      loading: false,
      finished: false,
      page: 0,
      meUid: ""
    };
  },
  computed: {
    ...mapState(["mid", "uId", "hospitalName"])
  },
  mounted() {
    if (this.from != "me") {
      this.meUid = "";
      this.meta.title = this.hospitalName;
    } else {
      this.meUid = this.uId;
    }
  },
  methods: {
    onLoad() {
      this.getMeList();
    },
    // getList() {
    //   // 获取测土配方列表 医院
    //   this.noData = false;
    //   this.$axios
    //     .fetchPost("/Mobile/Treatment/getTestingsoil", { mId: this.mid,page:this.page })
    //     .then((res) => {
    //       if (res.data.code == 0) {
    //         this.list = res.data.data;
    //       } else if (res.data.code == 201) {
    //         this.noData = true;
    //       }
    //     });
    // },
    getMeList() {
      // 获取测土配方列表  个人
      this.page += 1;
      this.$axios
        .fetchPost("/Mobile/Treatment/getTestingsoil", {
          uId: this.meUid,
          mId: this.mid,
          page: this.page
        })
        .then(res => {
          if (res.data.code == 0) {
            this.loading = false;
            this.list = this.list.concat(res.data.data);
          } else if (res.data.code == 201) {
            if (this.page == 1) {
              this.noData = true;
            }
            this.finished = true;
          }
        });
    },
    goToDetail(id) {
      this.$router.push({
        path: "/soil_detail",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.cetu_list-container
  .cetu_ul
    padding-left 12px
    background #fff
    margin-top 10px
    li
      border-bottom 1px solid #e5e5e5
      padding 14px 0 12px
      min-height 50px
      &:last-child
        border none
      .top
        display flex
        align-items center
        flex-wrap nowrap
        .title
          min-width 0
          flex 1
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          font-size 15px
          color #000
        .time
          width 100px
          margin-left 15px
          font-size 12px
          color #999
      .hospital
        width 100%
        color #999999
        font-size 12px
        line-height 22px
</style>
