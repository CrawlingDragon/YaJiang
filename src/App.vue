<template>
  <div :class="{ old: old }" class="app-box">
    <router-view v-slot="{ Component }">
      <keep-alive
        exclude="Login,mLogin,findPassword,sign,lookExpert,messageDetail,hospitalFastNav"
        include="searchOnline,applyVip,index,area,intoHospital,indexOnline,live"
      >
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <SwitchOld v-if="false"></SwitchOld>
    <GoTop />
  </div>
</template>
<script setup lang="ts">
import { computed, provide, onMounted, watch, reactive } from 'vue';
import { useStore } from 'vuex';
import GoTop from '@/components/goTop/goTop.vue';
import SwitchOld from '@/components/switchOld/switchOld.vue';
import { getIndexSettingMenu, getHeadFastNav, getDefaultSet } from '@/service/base';
import { getHospitalFastNav } from '@/service/base';

const store = useStore();
const old = computed(() => store.state.old);
const getterGlobalTitle = computed(() => store.getters.getterGlobalTitle);
const headerFastBar = reactive({
  bar: {},
});
// 适老板的图标的size
const sizeComputed = computed(() => {
  return old.value ? 33 : '';
});
provide('size', sizeComputed);
// console.log('import.meta.env :>> ', import.meta.env);
onMounted(async () => {
  // 获取初始的总院mid，获取ai的id
  const data = await getDefaultSet();
  store.commit('setDefaultSetting', data);
  // 获取首页的配置项
  const result = await getIndexSettingMenu();
  store.commit('setSettingMenu', result);

  // 获取医院的快速导航配置
  const hospitalNav = await getHospitalFastNav();
  store.commit('setHospitalSettingNav', hospitalNav);

  // 获取头部快速导航的栏目
  headerFastBar.bar = await getHeadFastNav();
});
provide('headerFastBar', headerFastBar);

watch(getterGlobalTitle, (newVal) => {
  //根据接口请求，设置网站.ico
  let icon: any = document.querySelector('link[rel="icon"]');
  icon.href = newVal.icon;
});
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  background: #f6f7f8;
  min-height: 100%;
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  .app-box {
    padding-top: 40px;
  }
  .old {
    &.app-box {
      padding-top: 55px;
    }
  }
}
</style>
