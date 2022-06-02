<template>
  <div class="preview">
    <Header :indexHeader="false" :goBackHeader="true"></Header>
    <van-sticky :offset-top="top">
      <div class="step-title-bar" :style="{ borderWidth: old ? '15px' : '10px' }">
        <div class="title-content" ref="title">
          <div
            v-for="(item, index) in navBar"
            :key="item.classname"
            :ref="setItemRefItem"
            class="item-wrap"
            :class="{ active: active1 === index }"
            @click="clickHandle(item, index)"
          >
            <div class="item f20">
              {{ item.classname }}
            </div>
            <van-icon name="arrow" class="arrow" />
          </div>
        </div>
      </div>
    </van-sticky>
    <div class="steps" v-for="item in caseArr" :key="item.id" :ref="setItemRefIt">
      <div class="step-box">
        <div class="title f22">{{ item.classname }}</div>
        <div class="step" v-for="it in item.lists" :key="it.id">
          <div class="small-title f15">{{ it.classname }}</div>
          <div class="right">
            <div class="time f20">{{ it.timepoint }}</div>
            <div class="text f20">
              {{ it.content }}
            </div>
            <div class="pharmacy" v-if="it.druginfo.length !== 0">
              <div class="pharmacy-title">用肥用药：</div>
              <div class="pharmacy-item" v-for="drug in it.druginfo" :key="drug.specid">
                <van-image class="img" :src="drug.thumb" fit="fill"></van-image>
                <div class="pharmacy-text">
                  <div class="p1 f20">{{ drug.name }}</div>
                  <div class="p2 f17">用法用量说明：{{ drug.quantity }}</div>
                </div>
                <a :href="drug.url" class="bug f20">购买</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header/header.vue';
import axios from '@/http';
import { mapState } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
export default {
  name: 'preview',
  metaInfo: {
    title: '预览',
  },
  components: { Header },
  setup() {
    useTitles('作物解决方案');
  },
  data() {
    return {
      w: 0,
      caseArr: [],
      active1: 0,
      top: 0,
      re: [],
      active: 0,
      offTop: [],
      item: [],
      it: [],
    };
  },
  computed: {
    ...mapState(['uId', 'old']),
    top() {
      //van-sticky的top值
      if (this.old) {
        return 55;
      } else {
        return 40;
      }
    },
    pId() {
      return this.$route.query.pId;
    },
    navBar() {
      let arr = [];
      if (this.caseArr.length !== 0) {
        this.caseArr.forEach((item, index) => {
          arr.push({
            classname: item.classname,
            index: index,
            option: this.offTop[index],
          });
        });
      }
      return arr;
    },
  },
  watch: {
    caseArr() {
      this.$nextTick(() => {
        this.re = this.it;
        this.re.forEach((item) => {
          this.offTop.push(item.offsetTop - 100);
        });
      });
    },
  },
  mounted() {
    this.getPreviewData();
    window.addEventListener('scroll', this.handleScroll, false);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll, false);
  },
  methods: {
    setItemRefItem(el) {
      this.item.push(el);
    },
    setItemRefIt(el) {
      this.it.push(el);
    },
    clickHandle(top, index) {
      this.$nextTick(() => {
        // this.active1 = index;
        this.top = this.it[index].offsetTop - 100;
        window.scrollTo({
          top: this.top,
          behavior: 'smooth',
        });
      });
    },
    handleScroll() {
      let aa = document.documentElement.scrollTop || document.body.scrollTop;
      setTimeout(() => {
        // let nav = this.navBar.concat([]);
        const arr = [...this.navBar].reverse();
        // console.log(aa);
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].option <= aa) {
            this.active = arr.length - 1 - i;
            break;
          }
        }
        this.active1 = this.active;
      }, 200);
    },
    getPreviewData() {
      axios
        .fetchPost('/Mobile/Gbase/getUserproject', {
          uId: this.uId,
          action: 'template_preview',
          pId: this.pId,
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 0) {
            this.caseArr = data.data.list;
            this.getNavWidth();
          }
          if (data.errcode) {
            alert(data.message);
          }
        });
    },
    getNavWidth() {
      this.$nextTick(() => {
        this.item.forEach((it) => {
          let w1 = it.offsetWidth;
          this.w += w1;
        });
        this.$refs.title.style.width = this.w + 20 + 'px';
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.preview {
  .step-title-bar {
    border-top: 8px solid $border-color;
  }
  .img {
    border: 1px solid $border-color;
  }
}
</style>
<style lang="stylus" scoped>
.preview
  .step-title-bar
    width 100%
    overflow auto
    padding 10px 12px
    background #fff
    // border-top:8px solid #e5e5e5
    .title-content
      .item-wrap
        display inline-block
        .item
          padding 8px 13px
          background: #F1FAFE;
          border-radius: 8px;
          color #155BBB
          font-size 14px
          display inline-block
        .arrow
          display inline-block
          padding 0 9px
          vertical-align middle
          color #D5E3FD
          font-size 11px
        &:last-child
          .arrow
            display none
        &.active
          .item
            background #155BBB
            color #FFFFFF
  .steps
    background #fff
    padding-left 20px
    .step-box
      border-left 2px solid #D5E3FD;
      padding-left 16px
      .title
        font-size 17px
        color #155BBB
        font-weight: bold;
        position relative
        margin-bottom 20px
        &::before
          content ""
          width 18px
          height 18px
          border 5px solid #155BBB
          border-radius 100%
          position absolute
          left -26px
          top 0
          box-sizing border-box
          background #fff
      .step
        padding-bottom 20px
        .small-title
          font-size 15px
          color #333
          font-weight: bold;
          position relative
          &::before
            content ""
            width 15px
            height 15px
            border 3px solid #D5E3FD
            border-radius 100%
            position absolute
            left -25px
            top 2px
            box-sizing border-box
            background #155BBB
        .right
          margin-top 18px
          margin-right 12px
          background #F2F7F7
          position relative
          padding 10px 10px 10px
          color #666666
          font-size 15px
          line-height 1.2
          &:before
            content ''
            width 10px
            height 10px
            background url('./bj-icon.png') no-repeat
            background-size 100% 100%
            position absolute
            left 10px
            top -10px
          .time
            line-height 1.2
            margin-bottom 12px
          .text
            line-height 1.4
            margin-bottom 0
          .pharmacy
            .pharmacy-title
              margin-top 15px
            .pharmacy-item
              display flex
              margin-top 10px
              position relative
              padding-right 55px
              .img
                width 60px
                height 60px
                background: #FFFFFF;
                border: 1px solid $border-color;
                margin-right 10px
              .pharmacy-text
                .p1
                  color #666666
                  font-size 14px
                  margin-bottom 10px
                  line-height 1.2
                .p2
                  color #363A44
                  font-size 14px
              .bug
                position absolute
                right 10px
                bottom 10px
                color #ff6600
                border 1px solid #ff6600
                border-radius 10px
                padding 5px
</style>
