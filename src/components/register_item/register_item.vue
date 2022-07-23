<template>
  <!-- 挂号记录item -->
  <div class="register_item">
    <div class="top">
      <div class="left f16">{{ list.subtime }} {{ list.apm }} 第{{ list.position }}号</div>
      <div class="right f16" :class="{ waitLook: list.status == '待就诊' }">
        {{ list.status }}
      </div>
    </div>
    <div class="mid">
      <van-image class="img" fit="cover" radius="5px" :src="list.logo"></van-image>
      <div class="p2">
        <div class="name f20">{{ list.name }}</div>
        <div class="expert f16">{{ list.expertname }}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="left f15">{{ settingRegistrationName }}时间: {{ list.addtime }}</div>
      <div class="right f15">NO:{{ list.order_number }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const settingRegistrationName = computed(() => store.getters.getDefaultMenuName.guahaoName);

const props = defineProps({
  list: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
</script>
<script lang="ts">
export default {
  name: 'Register_item',
};
</script>
<style lang="scss" scoped>
.register_item {
  .top {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      font-size: 12px;
      color: $f-color-three;
    }
    .right {
      color: #999;
      font-size: 12px;
    }
    .waitLook {
      color: $theme-color;
    }
  }
}
.mid {
  padding: 15px 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  .img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  .p2 {
    .name {
      font-size: 15px;
      color: #333;
      margin-bottom: 5px;
    }
    .expert {
      font-size: 12px;
      color: #333;
    }
  }
}
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  color: $f-color-three;
  font-size: 12px;
  padding-right: 13px;
  .left,
  .right {
    max-width: 65%;
    word-break: break-all;
    padding: 5px 0;
  }
  .right {
    padding: 2px;
    max-width: 40%;
    word-break: break-all;
  }
}
</style>
