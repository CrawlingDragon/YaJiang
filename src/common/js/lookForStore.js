import { Dialog } from 'vant';
import { useStore } from 'vuex';
import { computed } from 'vue';
// import { useRouter, useRoute } from 'vue-router';
import { login } from '@/common/js/getToken';
export default function lookForStoreFn(href) {
  const store = useStore();
  const uId = computed(() => store.state.uId);
  // const router = useRouter();
  // const route = useRoute();
  function lookForStore() {
    // const href = import.meta.env.VUE_APP_SHARE_URL;
    // const path = route.path;
    if (!uId.value) {
      Dialog.alert({
        title: '提示',
        message: '找农资,请先登录',
      }).then(() => {
        // on close111
        login();
      });

      return;
    }

    // alert(useHref.value);
    window.location.href = href;
  }
  return {
    lookForStore,
  };
}
