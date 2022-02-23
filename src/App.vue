<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content}` : `首页` }}</template>
  </metainfo>

  <router-view v-slot="{ Component }">
    <keep-alive
      exclude="Login,mLogin,findPassword,sign,lookExpert,live,messageDetail"
      include="searchOnline,applyVip,index,area,intoHospital,indexOnline"
    >
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// import { useMeta } from "vue-meta";

export default {
  setup() {
    // useMeta({
    //   title: "",
    //   htmlAttrs: { lang: "en", amp: true }
    // });
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['uId']),
  },
  watch: {
    // uId(newVal) {
    //   // console.log('newVal', newVal);
    //   if (newVal != '') {
    //     this.getUserInfo();
    //     // console.log('Uid changed');
    //   }
    // },
  },
  mounted() {
    // this.getUserInfo();
    this.getAiId();
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setAiExpertId']),
    // getUserInfo() {
    //   if (!this.uId) {
    //     return;
    //   }
    //   this.$axios
    //     .fetchPost('Mobile/User/userCenter', {
    //       uId: this.uId,
    //     })
    //     .then((res) => {
    //       if (res.data.code == 0) {
    //         this.setUserInfo(res.data.data);
    //       }
    //     });
    // },
    getAiId() {
      this.$axios.fetchPost('Mobile/Sysconfig/getAiExpert').then((res) => {
        if (res.data.code == 0) {
          this.setAiExpertId(res.data.data);
        }
      });
    },
  },
};
</script>
<style lang="stylus">
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align left
  background #EBEBEB
  min-height 100%
  position relative
  padding-top 40px
  max-width 640px
  margin 0 auto
body
  background #EBEBEB
</style>
