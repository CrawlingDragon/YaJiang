<template>
  <Header :indexHeader="false"></Header>
  <ul class="invite-ul">
    <li
      v-for="item in list"
      :key="item"
      :class="{ 'agree-li': item.passed == 1, 'refuse-li': item.passed == 2 }"
    >
      <div class="time">{{ item.addtime }}</div>
      <div class="mid">
        <van-image
          class="img"
          fit="contain"
          @click="goToCenter(item)"
          :src="item.logo"
        ></van-image>
        <div class="name" @click="goToCenter(item)">
          <div class="center-name">
            {{ item.name }}
          </div>
          <div class="small-title">邀请您成为新型庄稼医院专家</div>
        </div>
      </div>
      <div class="btns van-hairline--top" v-if="item.passed == 0">
        <div class="btn agree" @click="agree(item.id, 1, item.name)">同意</div>
        <div class="btn refuse" @click="agree(item.id, 2, item.name)">拒绝</div>
      </div>
      <div class="btns van-hairline--top" v-else>
        <div class="btn agree" v-if="item.passed == 1">已同意</div>
        <div class="btn refuse disbaled" v-if="item.passed == 2">已拒绝</div>
      </div>
    </li>
  </ul>
  <van-empty description="暂无数据" v-if="noData"></van-empty>
</template>

<script setup>
import Header from '@/components/header/header';
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { Toast, Dialog } from 'vant';
import { useTitles } from '@/common/js/useTitles';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const list = ref([]);
const noData = ref(false);
const store = useStore();
const router = useRouter();
const currentInstance = getCurrentInstance();
const global = currentInstance.appContext.config.globalProperties;

useTitles('邀请专家');
const uId = computed(() => store.state.uId);

function getDataList() {
  global.$axios.fetchPost('Mobile/User/getMyInvite', { uId: uId.value }).then((res) => {
    if (res.data.code === 0) {
      list.value = res.data.data;
    } else {
      noData.value = true;
    }
  });
}
onMounted(() => {
  getDataList();
});
function agree(id, passed, name) {
  Dialog.confirm({
    message: `确定${passed == 1 ? '同意' : '拒绝'}${name}的专家邀请吗`,
    confirmButtonText: '取消',
    cancelButtonText: '确定',
  })
    .then(() => {
      // on confirm
    })
    .catch(() => {
      // on cancel
      passedAxiosFn(id, passed);
      // Toast("已同意");
    });
}
// function refuse(id, passed, name) {
//   Dialog.confirm({
//     message: `确定拒绝${name}的专家邀请吗`,
//     confirmButtonText: "取消",
//     cancelButtonText: "确定"
//   })
//     .then(() => {
//       // on confirm
//     })
//     .catch(() => {
//       // on cancel
//       passedAxiosFn(id, passed);
//     });
// }
function passedAxiosFn(id, passed) {
  global.$axios
    .fetchPost('Mobile/User/doMyInvite', { uId: uId.value, id, passed })
    .then((res) => {
      if (res.data.code === 0) {
        getDataList();
        let msg = passed == 1 ? '已同意' : '已拒绝';
        Toast(msg);
      } else {
        Toast(res.data.message);
      }
    });
}
function goToCenter(item) {
  //去到对应的医院

  store.commit('setMid', item.mid);
  store.commit('setHospitalName', item.name);
  store.commit('setHospitalIsStore', item.isstore);
  setTimeout(() => {
    router.push({
      path: '/hospital',
    });
  }, 100);
}
</script>

<style lang="scss" scoped>
.invite-ul {
  margin-top: 10px;
  & > li {
    padding: 0 12px;
    background: #fff;
    margin-bottom: 10px;
    &.agree-li,
    &.refuse-li {
      .name {
        color: #363a44 !important;
      }
      .agree {
        background: $theme-secondary-color !important;
      }
      .refuse {
        color: #fff !important;
        background: #b8b8b8 !important;
        border: none !important;
      }
      .disabled {
        color: red;
      }
    }
    .time {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #363a44;
    }
    .mid {
      display: flex;
      padding-bottom: 15px;
      .img {
        width: 60px;
        height: 60px;
        background: #e5e5e5;
        border-radius: 10px;
        margin-right: 10px;
      }
      .name {
        display: flex;
        justify-content: space-around;
        color: #333333;
        flex-direction: column;
        flex: 1;
        min-width: 0;
        .center-name {
          font-size: 19px;
        }
        .small-title {
          font-size: 14px;
        }
      }
    }
    .btns {
      text-align: right;
      height: 50px;
      line-height: 50px;
      .btn {
        display: inline-block;
        width: 80px;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        text-align: center;
        border-radius: 4px;
        &.agree {
          background: $theme-color;
          color: #fff;
        }
        &.refuse {
          color: #ff6600;
          margin-left: 15px;
          border: 1px solid #ff6600;
          background: #fff;
        }
      }
    }
  }
}
</style>
