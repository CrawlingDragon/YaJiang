<template>
  <div class="switch-old" @click="switchOldFn">
    切换<br />{{ old ? '普通版' : '适老板' }}
  </div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const old = computed<boolean>(() => store.state.old);
function switchOldFn() {
  store.commit('switchOld', !old.value);
}
</script>
<style lang="scss">
.switch-old {
  background: #fff;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 14px;
  position: fixed;
  right: 10px;
  top: 50%;
  text-align: center;
  border-radius: 100%;
  z-index: 9999999;
  border: 1px solid $border-color;
}
</style>
