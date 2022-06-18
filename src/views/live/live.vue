<template>
  <div class="live-container">
    <Header :indexHeader="false" v-if="from == 'index'"></Header>
    <HospitalHeader indexHeader="indexHeader" navHeader="培训" v-else></HospitalHeader>
    <!-- <div class="program" @click="goLive" v-if="menum == 1">直播节目单</div> -->
    <ul class="live-ul">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <li v-for="item in list" :key="item.id" @click.stop="liveHref(item.tId)">
          <van-image class="live-img" :src="item.image" fit="cover" radius="10px">
            <div class="status">
              <LiveStatus :trainStatus="item.trainStatus" />
            </div>
          </van-image>
          <div class="bottom">
            <div class="left">{{ item.title }}</div>
            <div class="right">{{ item.startTime }}</div>
          </div>
          <div
            class="hospital"
            @click.stop="goToHospital(item.mid)"
            v-if="from == 'index' && item.hospitalName != ''"
          >
            <span class="address">
              {{ item.trainAddress }}
            </span>
            <span>
              {{ item.hospitalName }}
            </span>
          </div>
        </li>
      </van-list>
    </ul>
    <van-empty
      :description="from == 'index' ? '暂无直播,敬请期待' : '本院暂无直播'"
      v-show="noData"
    />
    <div class="lookOther" @click="goToWholeLive" v-show="noData && from != 'index'">
      查看其他直播
    </div>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import HospitalHeader from '@/components/hospital_header/hospital_header';
import LiveStatus from '@/components/live_status/live_status';
import { mapState, mapMutations, mapGetters, useStore } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
import { getTrainList } from '@/service/getTrainList';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  name: 'live',
  components: { Header, HospitalHeader, LiveStatus },
  setup() {
    useTitles('培训');
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const from = computed(() => route.query.from);
    const initMid = computed(() => store.getters.initMid);
    const mid = computed(() => store.state.mid);

    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const noData = ref(false);
    const page = ref(1);

    //加载更多函数
    const onLoad = () => {
      getList();
    };

    // 加载数据函数
    async function getList() {
      //根据from == index，全局就使用全局mid，否则使用医院mid
      let afterMid = from.value !== 'index' && mid.value != '' ? mid.value : initMid.value;
      loading.value = true;
      // 请求到具体数据
      const data = await getTrainList(afterMid, page.value);

      //code === 201，说明没有更多数据
      if (data.code === 201) {
        finished.value = true;
        loading.value = false;
        return;
      }
      setTimeout(() => {
        loading.value = false;
        page.value++;
        list.value = list.value.concat(data);
        // 请求过一次数据后，list仍未空，说明数据为空
        if (list.value.length === 0) {
          noData.value = true;
          finished.value = true;
        }
      }, 1000);
    }

    // 点击医院名称，去具体的医院
    function goToHospital(mid) {
      store.commit('setMid', mid);
      router.push({
        path: '/hospital',
      });
    }
    // 路由 -》 培训视频详情
    function liveHref(tId) {
      router.push({ path: `/live_detail/${tId}` });
    }
    function goToWholeLive() {
      router.push({
        path: '/live',
        query: {
          from: 'index',
        },
      });
    }
    return {
      list,
      loading,
      finished,
      noData,
      page,
      onLoad,
      from,
      liveHref,
      goToWholeLive,
      goToHospital,
      getList,
    };
  },

  watch: {
    from(newVal) {
      if (newVal === undefined) {
        return;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name !== 'live_detail') {
      next((vm) => {
        console.log('from :>> ', from);
        vm.page = 1;
        vm.loading = false;
        vm.list = [];
        vm.finished = false;
        vm.noData = false;
        vm.getList();
      });
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
.live-container {
  .program {
    width: 80%;
    margin: 10px auto;
    height: 45px;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    background: linear-gradient(90deg, rgba(1, 181, 255, 1), rgba(0, 130, 254, 1));
    border-radius: 8px;
  }
  .live-ul {
    background: #fff;
    li {
      padding: 15px 12px 20px;
      border-bottom: 1px solid $border-color;
      position: relative;
      &:last-child {
        border-bottom: none;
      }
    }
    .live-img {
      width: 100%;
      height: 150px;
      position: relative;
      .status {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: end;
      min-height: 30px;
      align-items: center;
    }
    .left {
      color: $f-color;
      font-size: 16px;
      flex: 1;
      min-width: 0;
      padding-right: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .right {
      color: $f-color-second;
      font-size: 12px;
      width: auto;
    }

    .hospital {
      display: flex;
      justify-content: space-between;
      align-items: end;
      color: $theme-color;
      min-height: 22px;
      .address {
        color: $f-color-second;
        font-size: 14px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        padding-right: 10px;
      }
    }
  }
  .lookOther {
    line-height: 40px;
    font-size: 18px;
    color: $theme-color;
    text-align: center;
  }
}
</style>
