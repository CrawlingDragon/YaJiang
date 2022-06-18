<template>
  <div class="nav-box" :class="{ threeLine: routerItem.length % 3 === 0 }">
    <template v-for="item in routerItem" :key="item.url">
      <router-link
        :to="item.url === '/live' ? 'live?from=index' : item.url"
        class="item"
        v-if="item.type === 'inside'"
      >
        <!-- <div class="icon" :class="item.icon"></div> -->
        <van-image class="icon" fit="cover" :src="item.image"></van-image>
        <p class="f20">{{ item.name }}</p>
      </router-link>
      <a :href="item.url" class="item" target="_blank" v-if="item.type === 'outside'">
        <van-image class="icon" fit="cover" :src="item.image"></van-image>
        <p class="f20">{{ item.name }}</p>
      </a>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
interface PropsItem {
  url: string;
  image: string;
  name: string;
  type: string;
}
const routerItem = computed<PropsItem[]>(() => store.getters.getterIndexMenu.topMenu);
</script>
<style lang="scss">
.old {
  .nav-box .item .icon {
    width: 54px;
    height: 54px;
  }
}
.nav-box {
  display: flex;
  // align-items: center;
  // flex-direction: column;
  // justify-content: flex-start;
  background: #ffffff;
  margin-bottom: 10px;
  flex-wrap: wrap;
  padding: 18px 0 20px;
  &.threeLine {
    .item {
      width: 33.33%;
    }
  }
  .item {
    width: 25%;
    text-align: center;
    .icon {
      width: 36px;
      height: 36px;
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
}
</style>
