<template>
  <div :class="{ old: old }" class="app-box">
    <router-view v-slot="{ Component }">
      <keep-alive
        exclude="Login,mLogin,findPassword,sign,lookExpert,live,messageDetail"
        include="searchOnline,applyVip,index,area,intoHospital,indexOnline"
      >
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <SwitchOld></SwitchOld>
    <GoTop />
  </div>
</template>
<script setup lang="ts">
import { computed, provide, onMounted } from 'vue';
import { useStore } from 'vuex';
import GoTop from '@/components/goTop/goTop.vue';
import SwitchOld from '@/components/switchOld/switchOld.vue';
import { getAi } from '@/service/getAi';
import { getInitMid } from '@/service/getInitMid';
const store = useStore();
const old = computed(() => store.state.old);

// 适老板的图标的size
provide('size', old.value ? 33 : '');

onMounted(async () => {
  // 获取ai的id
  const data = await getAi();
  store.commit('setAiExpertId', data);
  const { mid: initMid } = await getInitMid();
  store.commit('setInitMid', initMid);
});
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  background: #ebebeb;
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
