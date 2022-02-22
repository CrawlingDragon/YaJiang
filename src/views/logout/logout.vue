<template>
  <div></div>
</template>
<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    // const uId = computed(() => store.state.uId);
    // const global = getCurrentInstance();
    // const axios = global.appContext.config.globalProperties.$axios;
    onMounted(() => {
      console.log("tuich");
      store.dispatch("cleanUserInfo");
      router.push({ path: "/index" });
      // axios.fetchPost("/Mobile/Logout/logout", { uId: uId.value }).then(res => {
      //   if (res.data.code == 0) {
      //     store.dispatch("cleanUserInfo");
      //     router.push({ path: "/index" });
      //   }
      // });
    });
  }
};
</script>
<style lang=""></style>
