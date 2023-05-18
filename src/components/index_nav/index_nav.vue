<template>
  <div class="nav-box" :class="{ threeLine: routerItem.length % 3 === 0 }">
    <template v-for="item in routerItem" :key="item.url">
      <div @click="goIsLogin(item)" class="item">
        <van-image class="icon" fit="cover" :src="item.image"></van-image>
        <p class="f20">{{ item.name }}</p>
      </div>
      <!-- <router-link :to="item.url === '/live' ? 'live?from=index' : item.url" class="item"
        v-if="item.type === 'inside'">
        <van-image class="icon" fit="cover" :src="item.image"></van-image>
        <p class="f20">{{ item.name }}</p>
      </router-link>
      <a :href="item.url" class="item" target="_blank" v-if="item.type === 'outside' || item.type === 'app'">
        <van-image class="icon" fit="cover" :src="item.image"></van-image>
        <p class="f20">{{ item.name }}</p>
      </a> -->
    </template>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import stores from '@/store';
import { login } from '@/common/js/getToken';
import { useRouter } from 'vue-router'
const router = useRouter();
const store = useStore();
interface PropsItem {
  url: string;
  image: string;
  name: string;
  type: string;
}
const routerItem = computed<PropsItem[]>(() => store.getters.getterIndexMenu.topMenu);
let uId = stores.state.uId;
// let fullPath = ''
// router.beforeEach(async (to) => {
//   fullPath = to.fullPath
// })
const goIsLogin = (item: any) => {
  // 判断是否需要登录1要登录，0不需要登录
  if (item.is_login == 0) {
    if (item.type === 'inside') {
      if (item.url === '/live') {
        router.push({
          path: '/live',
          query: {
            from: 'index'
          }
        })
      } else {
        router.push({
          path: item.url
        })
      }
    }
    if (item.type === 'outside' || item.type === 'app') {
      window.open(item.url, "_blank")
    }
  } else {
    if (uId == '') {
      // const url = encodeURIComponent(
      //   window.location.origin +
      //   (import.meta.env.MODE === 'development' ? '' : '/app') +
      //   decodeURIComponent(fullPath)
      // );
      login();
    } else {
      if (item.type === 'inside') {
        if (item.url === '/live') {
          router.push({
            path: '/live',
            query: {
              from: 'index'
            }
          })
        } else {
          router.push({
            path: item.url
          })
        }
      }
      if (item.type === 'outside' || item.type === 'app') {
        window.open(item.url, "_blank")
      }
    }
  }
}
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
  padding: 18px 0 0;

  &.threeLine {
    .item {
      width: 33.33%;
    }
  }

  .item {
    width: 25%;
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;

    .icon {
      width: 36px;
      height: 36px;
      color: #343434;
      font-size: 14px;
      margin: 0 auto;
      margin-bottom: 5px;

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
      line-height: 1.2;
    }
  }
}
</style>
