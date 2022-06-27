<template>
  <div class="vip-container">
    <Header :indexHeader="false"></Header>
    <div class="content">
      <div class="icon"></div>
      <p class="h1 f30">{{ vipReactive.title }}</p>
      <p class="p2 f20">{{ vipReactive.subtitle }}</p>
      <ul>
        <li v-for="item in vipReactive.equityLists" :key="item.name">
          <div class="left">{{ item.name }}</div>
          <div class="right">{{ item.desc }}</div>
        </li>
      </ul>
      <div class="btn f20" @click="goToIntoHospital">
        选择{{ getDefaultMenuName.hospitalName }}加入会员
        <div class="free f14">免费</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useRouter } from 'vue-router';
import { reactive, onMounted, computed } from 'vue';
import { getVip } from '@/service/getVip';
import { useTitles } from '@/common/js/useTitles';
import { useStore } from 'vuex';
// 设置title
useTitles('会员权益');
//vuex
const store = useStore();
const getDefaultMenuName = computed(() => store.getters.getDefaultMenuName);

interface VipReactive {
  title: string;
  subtitle: string;
  equityLists: { name: string; desc: string }[];
}
// 获取权益的列表内容（定制）
let vipReactive: VipReactive = reactive({
  title: '',
  subtitle: '',
  equityLists: [],
});
onMounted(async () => {
  const { title, subtitle, equityLists } = await getVip();
  vipReactive.title = title;
  vipReactive.subtitle = subtitle;
  vipReactive.equityLists = equityLists;
});
const router = useRouter();
// 路由：进院
function goToIntoHospital() {
  router.push({
    path: '/into_hospital',
  });
}
</script>
<style lang="scss" scoped>
.old {
  .vip-container {
    top: 56px;
    .content {
      ul {
        li {
          height: auto;

          line-height: 1.2;
          .left {
            font-size: 18px;
            height: 100%;
            line-height: 1.2;
            text-align: left;

            padding: 16px 12px;
          }
          .right {
            font-size: 17px;
            height: auto;
            padding: 16px 12px;
          }
        }
      }
    }
  }
}
.vip-container {
  background: url('./80.png') no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  height: 100vh;
  width: 100%;
  .content {
    overflow: auto;
    height: 100%;
    position: relative;
    .icon {
      width: 100px;
      height: 70px;
      background: url('./81.png') no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      margin: 10px auto 0;
    }
    .h1 {
      font-size: 23px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(
        78deg,
        rgba(226, 167, 106, 1) 0%,
        rgba(246, 214, 156, 1) 53.7353515625%,
        rgba(226, 167, 106, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .p2 {
      font-size: 16px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(
        78deg,
        rgba(226, 167, 106, 1) 0%,
        rgba(246, 214, 156, 1) 53.7353515625%,
        rgba(226, 167, 106, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    ul {
      border: 1px solid rgba(254, 211, 160, 0.3);
      border-radius: 10px;
      margin: 15px 12px;
      li {
        display: flex;
        align-items: center;
        height: 30px;
        color: #ffeece;
        font-size: 12px;
        border-bottom: 1px solid rgba(254, 211, 160, 0.3);
        .left {
          width: 30%;
          border-right: 1px solid rgba(254, 211, 160, 0.3);
          text-align: center;
          height: 30px;
          line-height: 30px;
        }
        .right {
          width: 70%;
          padding-left: 20px;
        }
      }
    }
    .btn {
      position: relative;
      margin: 35px 12px 0;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      color: #fff;
      background: $theme-three-color;
      border-radius: 4px;
      .free {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #fff;
        font-size: 12px;
        line-height: 12px;
      }
    }
  }
}
</style>
