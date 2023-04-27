import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Dialog } from 'vant';

export function useHospitalNav() {
  const store = useStore();
  const uId = computed(() => store.state.uId);
  const getDefaultMenuName = computed(() => store.getters.getDefaultMenuName);
  const router = useRouter();
  const hospitalIsMember = computed(() => store.state.hospitalIsMember);
  // 路由 坐诊巡诊
  function goToZuo() {
    if (uId.value == '' || uId.value == undefined) {
      router.push({
        path: '/zuozhen_list',
      });
      return;
    }
    if (hospitalIsMember.value == 0) {
      Dialog.confirm({
        message: `抱歉坐诊巡诊是会员服务，请先申请加入${getDefaultMenuName.value.hospitalName}再访问`,
        cancelButtonText: '申请加入会员',
        confirmButtonText: '好的',
        cancelButtonColor: '#155BBB',
        confirmButtonColor: '#999',
      })
        .then(() => {})
        .catch(() => {
          router.push({
            path: '/apply_vip',
          });
        });
    } else {
      router.push({ path: '/zuozhen_list' }).catch((err) => err);
    }
  }

  // 路由 测土配方
  function goToCeTu() {
    if (uId.value == '' || uId.value == undefined) {
      router.push({
        path: '/cetu_list',
      });
      return;
    }
    if (hospitalIsMember.value == 0) {
      Dialog.confirm({
        message: `抱歉测土配方是会员服务，请先申请加入${getDefaultMenuName.value.hospitalName}再访问`,
        cancelButtonText: '申请加入会员',
        confirmButtonText: '好的',
        cancelButtonColor: '#155BBB',
        confirmButtonColor: '#999',
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
          router.push({ path: '/apply_vip' });
        });
    } else {
      router.push({ path: 'cetu_list' }).catch((err) => err);
    }
  }
  function goToRegistration() {
    // 路由 专家挂号
    if (uId.value == '' || uId.value == undefined) {
      router.push({
        path: '/expert_registration',
      });
      return;
    }
    if (hospitalIsMember.value == 0) {
      Dialog.confirm({
        message: `抱歉专家挂号是会员服务，请先申请加入${getDefaultMenuName.value.hospitalName}再访问`,
        cancelButtonText: '申请加入会员',
        confirmButtonText: '好的',
        cancelButtonColor: '#155BBB',
        confirmButtonColor: '#999',
      })
        .then(() => {})
        .catch(() => {
          // on cancel
          router.push({
            path: '/apply_vip',
          });
        });
    } else {
      router.push({ path: '/expert_registration' }).catch((err) => err);
    }
  }
  // 培训 直播
  function goToLive() {
    router.push({ path: '/live' }).catch((err) => err);
  }
  return {
    goToZuo,
    goToCeTu,
    goToRegistration,
    goToLive,
  };
}
