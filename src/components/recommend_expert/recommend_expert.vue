<template>
  <!-- 首页推荐专家列表 -->
  <div class="recommend_expert-container" @click="goToExpert(list.uid)">
    <div class="top">
      <van-image class="img" :src="list.avatar" fit="cover"></van-image>
      <div class="right">
        <div class="name f22 l-h">{{ list.realname }}</div>
        <div class="title f20 l-h">{{ list.groupname }}</div>
        <div class="address" v-if="list.company">{{ list.company }}</div>
        <div class="address time" v-if="list.addtime && routeName != 'index' && routeName != '/'">
          {{ list.addtime }}
        </div>
      </div>
    </div>
    <div class="kind" v-if="list.skill != '' && list.skill != '暂未设置'">
      <div class="item" v-for="item in skillArr" :key="item">{{ item }}</div>
    </div>
    <div class="join">
      <div class="answer-number" v-show="list.cnt_answer != 0">{{ list.cnt_answer }}次解答</div>
      <div
        class="join-number"
        v-show="!isSelfExpert"
        v-if="list.cnt_joinhospital >= 1"
        :class="{
          noBorder: list.cnt_answer == 0 || list.cnt_joinhospital == 0,
        }"
      >
        {{ list.cnt_joinhospital }}家加入{{ getDefaultMenuName.hospitalName }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Recommend_expert',
  components: {},
  props: {
    list: {
      type: Object,
      default: function () {
        return {};
      },
    },
    isSelfExpert: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      routeName: '',
    };
  },
  computed: {
    ...mapGetters(['getDefaultMenuName']),
    skillArr() {
      if (!this.list.skill) {
        return [];
      }
      let skill = this.list.skill;
      let arr = skill.split(',');
      return arr;
    },
  },
  watch: {},
  mounted() {
    this.routeName = this.$route.name;
  },
  methods: {
    goToExpert(id) {
      this.$router.push({
        path: '/expert',
        query: { id: id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .recommend_expert-container {
    height: 100%;
    padding: 0;
    .top {
      .img {
        width: 90px;
        height: 90px;
      }
      .right {
        display: flex;
        align-items: center;
        .name {
          margin-bottom: 0;
          margin-right: 15px;
          color: $f-color;
          width: auto;
        }
        .title {
          flex: 1;
          margin: 0;
          color: $f-color-second;
          overflow: auto;
          white-space: normal;
          text-overflow: initial;
        }
        .address {
          display: none;
        }
      }
    }

    .join,
    .kind {
      display: none;
    }
  }
}
</style>
<style lang="stylus" scoped>
.recommend_expert-container
  background #F5F5F5
  padding 10px 7px 14px 10px
  border-radius 8px
  height 155px
  .top
    display flex
    padding-bottom 5px
    .img
      width 60px
      height 60px
      margin-right 10px
      overflow hidden
      border-radius 10px
    .right
      flex 1
      min-width 0
      .name
        font-size 14px
        color #333333
        line-height 1.12
        margin-bottom 9px
      .title
        font-size 12px
        line-height 1.12
        margin-bottom 5px
        color #363A44
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .address
        font-size 12px
        line-height 1.12
        margin-bottom 5px
        color #363A44
        //line-height 16px
        overflow hidden
        text-overflow ellipsis
        word-break break-all
        white-space nowrap
        // display -webkit-box
        // -webkit-line-clamp 2
        // -webkit-box-orient vertical
  .kind
    font-size 0
    max-height 45px
    overflow hidden
    .item
      display inline-block
      padding 2px 5px
      height 21px
      line-height 18px
      margin-right 3px
      font-size 12px
      background #F7D9C5
      color #FF6500
      border-radius 14px
      margin-bottom 3px
  .join
    display flex
    color #333333
    font-size 12px
    margin-top 10px
    .answer-number
      padding-right 10px
    .join-number
      border-left 1px solid #363A44
      padding-left 10px
      &.noBorder
        border none
</style>
