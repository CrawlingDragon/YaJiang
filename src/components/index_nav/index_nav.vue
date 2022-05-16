<template>
  <template v-for="item in routerItem" :key="item.path">
    <router-link :to="item.path" class="item">
      <div class="icon" :class="item.icon"></div>
      <p class="f20">{{ item.title }}</p>
    </router-link>
  </template>
</template>
<script lang="ts" setup>
const props = defineProps({
  routerItem: {
    type: Array,
    default: () => {
      return [
        {
          path: '/index_online',
          icon: 'i1',
          title: '找答案',
        },
        {
          path: '/look_expert',
          icon: 'i2',
          title: '找专家',
        },
        {
          path: '/video_list',
          icon: 'i3',
          title: '看视频',
        },
      ];
    },
  },
});
</script>
<style lang="scss">
.old {
  .nav-box .item .icon {
    width: 54px;
    height: 54px;
  }
}
.item {
  flex: 1;
  text-align: center;
  .icon {
    width: 40px;
    height: 40px;
    color: #343434;
    font-size: 14px;
    margin: 0 auto;
    margin-bottom: 10px;
    &.i1 {
      background: url('./1.png') no-repeat center;
      background-size: cover;
    }
    &.i2 {
      background: url('./2.png') no-repeat center;
      background-size: cover;
    }
    &.i3 {
      background: url('./3.png') no-repeat center;
      background-size: cover;
    }
    &.i4 {
      background: url('./4.png') no-repeat center;
      background-size: cover;
    }
    &.i5 {
      background: url('./5.png') no-repeat center;
      background-size: cover;
    }
  }
  p {
    color: #333333;
  }
}
</style>
