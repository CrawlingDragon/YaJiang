<template>
  <div class="nav-box" :class="{ threeLine: routerItem.length % 3 === 0 }">
    <template v-for="item in routerItem" :key="item.path">
      <router-link :to="item.path" class="item">
        <!-- <div class="icon" :class="item.icon"></div> -->
        <van-image class="icon" fit="cover" src="item.icon"></van-image>
        <p class="f20">{{ item.title }}</p>
      </router-link>
    </template>
  </div>
</template>
<script lang="ts" setup>
interface PropsItem {
  path: string;
  icon: string;
  title: string;
}

const props = defineProps<{ routerItem: PropsItem[] }>();
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
