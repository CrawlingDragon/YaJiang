<template>
  <div class="period-content van-hairline--bottom">
    <div class="progress">
      <ProgressItem :item="{ classname: period.classname, percent: period.percent }">
        <!-- <span class="p1">{{ period.classname }}</span> -->
      </ProgressItem>
    </div>
    <div class="item" v-for="item in period.lists" :key="item.id">
      <div class="left">{{ item.classname }}</div>
      <div class="mid">
        <div class="finished" v-if="item.isdeal === 1">
          <van-icon name="clock-o" class="clock" />
          <span>已完成</span>
        </div>
        <div class="finish" v-else>
          <van-icon name="passed" class="passsed" /><span>待完成</span>
        </div>
      </div>
      <div class="right">
        <div class="btn btn2" v-if="item.isdeal === 1" @click="detail(item)">详情</div>
        <div class="btn btn1" @click="issue(item)" v-else>发布</div>
      </div>
    </div>
    <van-dialog
      v-model:show="show"
      message="该农事管理内容为选填，可点击确认直接完成"
      show-confirm-button
      show-cancel-button
      confirm-button-text="直接完成"
      cancel-button-text="去发布"
      @confirm="confirmDialog"
      @cancel="cancelDialog"
    >
      <div class="van-dialog__message">该农事管理内容为选填，可点击确认直接完成</div>
      <div class="close" @click.stop @click="show = false">
        <van-icon name="close" size="25" />
      </div>
    </van-dialog>
  </div>
</template>
<script>
import ProgressItem from './progress_item.vue';
import axios from '@/http';
import { mapState } from 'vuex';
export default {
  name: 'period',
  components: { ProgressItem },
  props: {
    period: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return { show: false, activeItem: '' };
  },
  computed: {
    ...mapState(['uId']),
  },
  watch: {},
  mounted() {},
  unmounted() {},
  methods: {
    confirmDialog() {
      this.confirmIssue(this.activeItem.id, this.uId);
    },
    cancelDialog() {
      this.$router.push({
        path: '/base_edit',
        query: { classId: this.activeItem.id, editCase: 'no' },
      });
    },
    issue(item) {
      let iswrite = item.iswrite;
      this.activeItem = item;
      if (iswrite == 0) {
        // 弹窗
        this.show = true;
        //确定农事记录
        // this.$dialog
        //   .confirm({
        //     message: "该农事管理内容为选填，可点击确认直接完成",
        //     confirmButtonText: "直接完成",
        //     cancelButtonText: "去发布"
        //   })
        //   .then(() => {
        //     // on close
        //     this.confirmIssue(item.id, this.uId);
        //   })
        //   .catch(() => {
        //     this.$router.push({
        //       path: "/base_edit",
        //       query: { classId: item.id, editCase: "no" }
        //     });
        //   });
      } else {
        // 编辑农事发布
        this.$router.push({
          path: '/base_edit',
          query: { classId: item.id, editCase: 'no' },
        });
      }
    },
    detail(item) {
      this.$router.push({
        path: '/base_fram_detail',
        query: { id: item.rid },
      });
    },
    confirmIssue(classid, uId) {
      axios
        .fetchPost('/Mobile/Gbase/subFarmerDatacommit', { classid, uId })
        .then((res) => {
          let data = res.data;
          if (data.code === 0) {
            window.location.reload();
          }
          this.$toast(data.message);
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
.period-content
  padding-top 20px
  .progress
    margin-bottom 20px
    .p1
      color #999
      margin-right 5px
  .item
    display flex
    padding 0 12px
    align-items flex-start
    padding-bottom 20px
    .left
      width 150px
      min-width 0
      font-size 17px
      color #333333
      margin-right 20px
    .mid
      flex 1
      .finished
        font-size 14px
        color #363A44
        .clock
          margin-right 6px
          font-size 18px
          margin-top -2px
          position relative
          top 4px
      .finish
        font-size 14px
        color #FF6600
        .passsed
          margin-right 6px
          font-size 18px
          margin-top -2px
          position relative
          top 4px
    .right
      width auto
      height 25px
      .btn
        width: 55px;
        height: 25px;
        text-align center
        border-radius 25px
        font-size 14px
        line-height 25px
        &.btn2
          background: #F1FAFE;
          border: 1px solid $border-color;
          color #155BBB
        &.btn1
          border 1px solid #FF6600
          background #FF6600
          color #fff
.close
  position absolute
  top 2px
  right 2px
  color #999
  :deep().progress-item
    :deep().right
      width auto !important
</style>
