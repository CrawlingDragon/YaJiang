<template>
  <div class="live_list-container">
    <Header header="logoHeader"></Header>
    <div class="title">{{ detail.title }}</div>
    <div class="hospital-name" @click="goToHospital()">{{ detail.name }}</div>
    <div class="list-content" v-html="detail.content"></div>
  </div>
</template>
<script>
import Header from '@/components/hospital_header/hospital_header';
import { mapMutations } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
export default {
  setup() {
    useTitles('直播节目单');
  },
  name: 'liveList',
  components: { Header },
  props: {},
  data() {
    return {
      detail: '',
      mid: this.$route.query.mid,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getDetail();
  },
  methods: {
    ...mapMutations(['setMid']),
    getDetail() {
      this.$axios.fetchPost('/Mobile/Live/getLiveMenu', { mId: this.mid }).then((res) => {
        if (res.data.code == 0) {
          this.detail = res.data.data;
        }
      });
    },
    goToHospital() {
      this.setMid(this.detail.mid);
      this.$router.push({
        path: '/hospital',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.live_list-container {
  background: #fff;
  .list-content {
    background: #fff;
  }
  .title {
    text-align: center;
    padding: 0 12px;
    padding: 12px;
    font-size: 20px;
  }
  .hospital-name {
    text-align: right;
    color: #155bbb;
    padding-right: 12px;
    margin-bottom: 20px;
    font-size: 14px;
    cursor: pointer;
  }
  :deep()img {
    max-width: 100%;
  }
}
</style>
