<template>
  <div class="expert_registration-container">
    <Header :navHeader="'专家' + expertText.guahaoName"></Header>
    <div class="registration-box">
      <div class="title">
        <div class="left"></div>
        <div class="mid f22">上午</div>
        <div class="right f22">下午</div>
      </div>
      <div class="item-box">
        <div class="item" v-for="item in list" :key="item.week">
          <div class="left f20">
            {{ item.week }} <br />
            <span class="days f16">{{ item.ymd }}</span>
          </div>
          <div class="mid">
            <div class="p1 f18" v-if="item.data.am.realname == '无号源'" @click="clickNo">
              无号源
            </div>
            <div class="now f17" v-if="item.data.am.realname == '即将放号'" @click="rightNow">
              {{ item.data.am.realname }}
            </div>
            <div
              class="number f18"
              v-if="item.data.am.realname != '无号源' && item.data.am.realname != '即将放号'"
              @click="registration(item.data.am, '上午')"
            >
              总{{ item.data.am.nums }} 剩{{ item.data.am.surplus }}
            </div>
            <div class="expert f17" v-if="item.data.am.realname != '无号源'">
              {{ item.data.am.realname }}
            </div>
          </div>
          <div class="right">
            <div class="p1 f18" v-if="item.data.pm.realname == '无号源'" @click="clickNo">
              无号源
            </div>
            <div class="now f17" v-if="item.data.pm.realname == '即将放号'" @click="rightNow">
              {{ item.data.pm.realname }}
            </div>
            <div
              class="number f18"
              v-if="item.data.pm.realname != '无号源' && item.data.pm.realname != '即将放号'"
              @click="registration(item.data.pm, '下午')"
            >
              总{{ item.data.pm.nums }} 剩{{ item.data.pm.surplus }}
            </div>
            <div class="expert f17" v-if="item.data.pm.realname != '无号源'">
              {{ item.data.pm.realname }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/hospital_header/hospital_header';
import { mapState, useStore } from 'vuex';
import { Dialog } from 'vant';
import { computed } from 'vue';
import { useTitles } from '../../common/js/useTitles';
export default {
  setup() {
    const store = useStore();
    // 专家挂号+后台配置文案
    const expertText = computed(() => store.getters.getDefaultMenuName);
    useTitles('专家' + expertText.value.guahaoName);
    return {
      expertText,
    };
  },
  name: 'expertRegistration',
  components: { Header, [Dialog.Component.name]: Dialog.Component },
  props: {},
  data() {
    return {
      list: [],
    };
  },
  created() {},
  computed: {
    ...mapState(['mid', 'uId', 'hospitalName']),
  },
  watch: {},
  mounted() {
    this.getList();
    // this.meta.title = this.hospitalName;
  },
  methods: {
    clickNo() {
      this.$toast('抱歉,该时间段没有专家号');
    },
    getList() {
      // 获取挂号-医院排版
      this.$axios.fetchPost('Mobile/Mpublic/getSubscribeData', { mId: this.mid }).then((res) => {
        if (res.data.code == 0) {
          this.list = res.data.data;
        }
      });
    },
    registration(item, halfDay) {
      if (item.surplus == 0) {
        this.$toast('抱歉,该时间段没有专家号');
        return;
      }
      let title = `确定${this.expertText.guahaoName}${this.timeFormat(
        parseInt(item.ymd) * 1000
      )}${halfDay}${item.realname}的号吗?`;

      let obj = {
        mId: this.mid,
        eId: item.eid,
        uId: this.uId,
        ymd: item.ymd,
        apm: item.apm,
      };

      this.$dialog
        .confirm({
          message: title,
          confirmButtonText: '取消',
          confirmButtonColor: '#999',
          cancelButtonText: '确定',
          cancelButtonColor: '#155BBB',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
          this.$axios.fetchPost('Mobile/Mpublic/AddSubscribeData', obj).then((res) => {
            if (res.data.code == 0) {
              this.getList();
              this.$dialog
                .confirm({
                  title: this.expertText.guahaoName + '成功',
                  message: res.data.message,
                  cancelButtonText: this.expertText.guahaoName + '记录',
                  cancelButtonColor: '#155BBB',
                  confirmButtonText: '关闭',
                  confirmButtonColor: '#999',
                })
                .then(() => {
                  // on confirm
                })
                .catch(() => {
                  // on cancel
                  this.$router.push({
                    path: '/me_registration',
                  });
                });
            } else {
              this.$dialog
                .alert({
                  message: res.data.message,
                  confirmButtonText: '知道了',
                  confirmButtonColor: '#155BBB',
                })
                .then(() => {
                  // on close
                });
              // this.$toast(res.data.message);
            }
          });
        });
    },
    rightNow() {
      // 即将放号
      this.$toast('每天7点开始放号');
    },
    //时间戳转化成时间格式
    timeFormat(timestamp) {
      function add0(m) {
        return m < 10 ? '0' + m : m;
      }
      //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp);
      var month = time.getMonth() + 1;
      var date = time.getDate();
      return month + '月' + add0(date) + '日';
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .expert_registration-container {
    .title {
      height: 55px;
      line-height: 55px;
    }
  }
}
.mid,
.right {
  .number {
    color: $theme-color;
    border: 1px solid $border-color;
  }
}
.expert_registration-container {
  .title {
    border-bottom: 1px solid $border-color;
  }
  .item-box {
    .item {
      border-bottom: 1px solid $border-color;
    }
  }
}
</style>
<style lang="stylus" scoped>
.expert_registration-container
  .title
    margin-top 10px
    background #fff
    height 40px
    line-height 40px
    font-size 0
    border-bottom 1px solid $border-color
    padding 0 12px
    display flex
    & > div
      flex 1
      font-size 15px
      color #333
    .mid
      text-align center
      flex 2
    .right
      text-align center
      flex 2
  .item-box
    background #fff
    padding 0 12px
    .item
      background #fff
      border-bottom 1px solid $border-color
      display flex
      height 75px
      align-items center
      justify-content center
      &:last-child
        border none
      & > div
        flex 1
      .left
        font-size 15px
        color #333
        .days
          color #999
          font-size 12px
      .mid, .right
        text-align center
        flex 2
        font-size 12px
        color #999
        .number
          color $theme-color
          padding 9px 12px
          border 1px solid $theme-color
          border-radius 4px
          display inline-block
          line-height 12px
          margin-bottom 5px
        .now
          color #363A44
          padding 9px 12px
          border 1px solid #363A44
          border-radius 4px
          display inline-block
          line-height 12px
          margin-bottom 5px
</style>
