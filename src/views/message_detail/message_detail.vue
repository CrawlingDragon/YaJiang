<template>
  <div class="message_detail-container">
    <Header :indexHeader="false"></Header>
    <div class="content">
      <div class="title f22 l-h">{{ detail.title }}</div>
      <div class="small-bar">
        <div class="left f16">{{ detail.inputtime }} {{ detail.copyfrom }}</div>
        <div class="right f16" @click="GoToHospital(mpublic.mid)">
          {{ mpublic.title }}
        </div>
      </div>
      <div class="text" v-html="detail.content"></div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import { mapState, mapMutations } from 'vuex';
import { useTitles } from '@/common/js/useTitles.ts';
export default {
  setup() {
    useTitles('资讯详情');
  },
  name: 'messageDetail',
  components: { Header },
  props: {},
  created() {},
  data() {
    return {
      // id: this.$route.query.id,
      detail: '',
      mpublic: '',
    };
  },
  computed: {
    ...mapState(['mid']),
    id() {
      return this.$route.query.id;
    },
    catid() {
      return this.$route.query.catid;
    },
    from() {
      return this.$route.query.from;
    },
  },
  watch: {
    // $route() {
    //   this.getMessageDetail();
    // }
  },
  mounted() {
    this.getMessageDetail();
  },
  methods: {
    ...mapMutations(['setMid']),
    getMessageDetail() {
      this.$axios
        .fetchPost('/Mobile/News/detail', {
          mId: this.mid,
          Id: this.id,
          catId: this.catid,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.detail = res.data.data;
            this.mpublic = res.data.data.mpublic;
          }
        });
    },
    GoToHospital(mid) {
      this.setMid(mid);
      setTimeout(() => {
        this.$router.push({
          path: '/hospital',
          query: { mid: mid },
        });
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.message_detail-container {
  .content {
    background: #fff;
    margin-top: 10px;
    padding: 0 12px 20px;
    .title {
      color: #333333;
      font-size: 17px;
      line-height: 20px;
      padding-top: 20px;
      padding-bottom: 14px;
    }
    .small-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      .left {
        color: #363a44;
        font-size: 12px;
      }
      .right {
        color: $theme-color;
        font-size: 12px;
      }
    }
    :deep().text {
      overflow-x: hidden;
    }
  }
  :deep()img {
    max-width: 100% !important;
    height: auto !important;
  }
}
</style>
