import { post } from '@/http';
import { useStore } from 'vuex';
import { computed } from 'vue';

export function getIntoHospital() {
  const store = useStore();
  const uId = computed(() => store.state.uId);
  const initMid = computed(() => store.state.initMid);
  return post('Mobile/Entrance/index', { uId: uId.value, mid: initMid.value });
}
