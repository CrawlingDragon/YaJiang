<template>
  <div class="take-case-container">
    <ul v-if="!noData">
      <li v-for="item in caseArr" :key="item.id">
        <TakeCaseItem :item="item" @clickLook="clickCase"></TakeCaseItem>
      </li>
    </ul>
    <div class="no-take-wrap" v-if="noData">
      <p>您未加入任何医院</p>
      <div class="p2">加入医院后可获取该医院的作物解决方案</div>
      <div class="btn" @click="goLook">去加入医院</div>
    </div>
  </div>
</template>
<script>
// import NoTake from "../no_take/no_take.vue";
import TakeCaseItem from "../take_case/take_case_item/take_case_item.vue";
import axios from "@/http";
import { mapState } from "vuex";
export default {
  name: "all_case",
  components: { TakeCaseItem },
  props: {},
  data() {
    return { caseArr: [], noData: false, action: "template_list", pId: "" };
  },
  computed: {
    ...mapState(["uId"]),
    from() {
      let re = "";
      if (this.action === "dingyue" || this.action === "templatedel") {
        re = "template_list";
      }
      return re;
    }
  },
  watch: {
    // action() {
    //   this.getCase();
    // }
  },
  mounted() {
    this.getCase();
  },
  unmounted() {},
  methods: {
    clickCase(caseStatus) {
      //点击订阅或者取消
      console.log("caseStatus :>> ", caseStatus);
      this.action = caseStatus.status;
      this.pId = caseStatus.pId;
      this.getCase("click");
    },
    goLook() {
      this.$router.replace({
        path: "/into_hospital"
      });
    },
    getCase(click) {
      axios
        .fetchPost("/Mobile/Gbase/getUserproject", {
          uId: this.uId,
          action: this.action,
          pId: this.pId,
          from: this.from
        })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            this.caseArr = data.data;
            if (data.data.length === 0) {
              this.noData = true;
            }
          }
          if (data.code === 201 && click) {
            this.$toast(data.message);
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.take-case-container
  padding-bottom 10px
  ul
    padding 0 12px
    li
      min-height 100px
      background #fff
      box-shadow: 0px 3px 15px 0px rgba(206, 215, 229, 0.75);
      border-radius: 15px;
      &:last-child .item-wrap
        border none
  .no-take-wrap
    height 300px
    p
      padding-top 150px
      color #666666
      font-size 15px
      text-align center
    .p2
      color #333
      font-size 13px
      line-height 20px
      text-align center
    .btn
      width: 112px;
      height: 40px;
      background: #155BBB;
      border: 1px solid #155BBB;
      border-radius: 40px;
      font-size 15px
      color #fff
      text-align center
      line-height 40px
      margin 0 auto
      margin-top 30px
</style>
