<template>
  <div class="me-container">
    <Header :indexHeader="false"></Header>
    <div class="user-box" @click="goToExpert()">
      <!-- info.uid -->
      <van-image class="avator" round fit="cover" :src="info.avatar"></van-image>
      <div class="mid">
        <p class="p1 f30">
          {{ info.realname }}<span class="f20">{{ info.grouptitle }}</span>
        </p>
        <p class="p2 f20">用户名:{{ info.username }}</p>
      </div>
      <div class="right f20" @click.stop="goToEdit">编辑 ></div>
    </div>
    <div class="my-ul">
      <van-cell :title="'加入的' + getDefaultMenuName.hospitalName" to="/me_hospital" is-link>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <!-- <div class="icon01"></div> -->
          <div class="icon01 icon"></div>
        </template>
      </van-cell>
      <van-cell
        :title="registration.name"
        to="/me_registration"
        is-link
        v-if="registration.state === 1"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <div class="icon02 icon" fit="scale-down"></div>
        </template>
      </van-cell>

      <van-cell
        :title="cetu.name"
        :to="{ path: '/whole_cetu_list' }"
        is-link
        v-if="cetu.state === 1"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <!-- <div class="icon04"></div> -->
          <div class="icon04 icon" fit="scale-down"></div>
        </template>
      </van-cell>
      <van-cell :title="zuozhen.name" to="/whole_zuozhen_list" is-link v-if="zuozhen.state === 1">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <div class="icon05 icon" fit="scale-down"></div>
        </template>
      </van-cell>
      <van-cell title="问答管理" to="/me_answer" is-link>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <div class="icon06 icon" fit="scale-down"></div>
        </template>
      </van-cell>
      <!-- <van-cell
        style="margin-top: 10px"
        title="农事管理"
        :to="{ path: '/cropRecord', query: { id: info.bid } }"
        is-link
      >
     :to="{ path: '/base_center', query: { id: info.bid } }" -->
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <!-- <template #icon>
          <div class="icon03"></div>
        </template>
      </van-cell> -->
      <!-- 配置外部导航 -->
      <template v-for="bar in outside">
        <van-cell :title="bar.name" :url="bar.url" is-link>
          <template #icon>
            <van-image fit="scale-down" :src="bar.icon" class="icon"></van-image>
          </template>
        </van-cell>
      </template>

      <van-cell
        :title="scheme.name"
        to="/preview_list"
        is-link
        style="margin-top: 10px"
        v-if="scheme.state === 1"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <div class="icon11 icon" fit="scale-down"></div>
        </template>
      </van-cell>
    </div>

    <van-cell
      title="个人主页"
      :to="{ path: '/my_homePage', query: { from: 'my', id: uId } }"
      is-link
      style="margin-top: 10px"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #icon>
        <div class="icon07 icon" fit="scale-down"></div>
      </template>
    </van-cell>
    <van-cell title="我的关注" to="/me_attention" is-link>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #icon>
        <div class="icon08 icon" fit="scale-down"></div>
      </template>
    </van-cell>
    <van-cell title="投诉与评价" is-link style="margin-top: 10px" @click="callPhone">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #icon>
        <div class="icon09 icon" fit="scale-down"></div>
        <a href="tel:4008596318" ref="tel"></a>
      </template>
    </van-cell>
    <Foot></Foot>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import { mapState, mapGetters } from 'vuex';
import Foot from '@/components/foot/foot';
import { useTitles } from '@/common/js/useTitles.ts';
import { getMeSetting } from '@/service/getMeSetting';
import { onMounted, reactive, toRefs } from 'vue';

export default {
  setup() {
    // 设置title
    useTitles('我的');
    const setting = reactive({
      registration: '', //挂号记录
      cetu: '', // 测土
      zuozhen: '', // 坐诊巡诊
      scheme: '', // 作物解决方案
      outside: '',
    });
    onMounted(async () => {
      const { inside, outside } = await getMeSetting();
      setting.registration = inside.subscribe;
      setting.cetu = inside.cetu;
      setting.zuozhen = inside.zuozhen;
      setting.scheme = inside.scheme;
      setting.outside = outside;
      // console.log('setting', setting);
    });
    return {
      ...toRefs(setting),
    };
  },
  name: 'me',
  components: { Header, Foot },
  props: {},
  data() {
    return {
      info: '',
      active: 4,
    };
  },

  computed: {
    ...mapState(['uId']),
    ...mapGetters(['initMid', 'getDefaultMenuName']),
  },
  watch: {
    uId(newVal) {
      if (newVal !== '') {
        this.getInfo();
      }
    },
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$axios
        .fetchPost('/Mobile/User/userCenter', {
          uId: this.uId,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.info = res.data.data;
          }
        });
    },
    goToEdit() {
      this.$router.push({
        path: '/me_edit',
      });
    },
    callPhone() {
      //路由： 投诉于评价
      this.$router.push({
        path: '/evaluate',
      });
    },
    goToExpert() {
      this.$router.push({
        path: '/expert',
        query: { id: this.uId, from: 'my' },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .me-container {
    padding-bottom: 100px;
    .user-box {
      .right {
        width: 100%;
        padding-left: 80px;
      }
    }
  }
}

.me-container {
  padding-bottom: 60px;
  .user-box {
    display: flex;
    padding: 20px 12px;
    align-items: center;
    background: #fff;
    margin-bottom: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
    .avator {
      width: 65px;
      height: 65px;
      margin-right: 15px;
    }
    .mid {
      flex: 1;
      padding-top: 10px;
      .p1 {
        color: #333333;
        font-size: 20px;
        line-height: 20px;
        margin-bottom: 5px;
        span {
          margin-left: 12px;
          font-size: 16px;
          color: #343a45;
        }
      }
    }
    .p2 {
      color: #999;
      font-size: 12px;
    }
    .right {
      color: $theme-color;
      font-size: 14px;
      padding: 0 12px 0 12px;
    }
  }
  .icon {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
  .van-cell {
    align-items: center;
    font-size: 16px;
    color: #343a45;
    .icon01 {
      width: 30px;
      height: 30px;
      background: url('./62.png') no-repeat; //
      background-size: 100%;
      background-position: center;
      margin-right: 10px;
    }
    .icon02 {
      width: 30px;
      height: 30px;
      background: url('./60.png') no-repeat;
      background-size: 100%;
      background-position: center;
      margin-right: 10px;
    }
    .icon04 {
      width: 24px;
      height: 30px;
      background: url('./63.png') no-repeat;
      background-size: 100%;
      background-position: center;
      margin-right: 10px;
    }
    .icon05 {
      width: 30px;
      height: 28px;
      background: url('./64.png') no-repeat;
      background-size: 100%;
      background-position: center;
      margin-right: 10px;
    }
    .icon03 {
      width: 30px;
      height: 28px;
      background: url('./61.png') no-repeat;
      background-size: 100%;
      background-position: center;
      margin-right: 10px;
    }
    .icon06 {
      width: 28px;
      height: 30px;
      background: url('./59.png') no-repeat;

      background-size: 100%;
      // / background-position: center;
      margin-right: 10px;
    }
    .icon07 {
      width: 30px;
      height: 30px;
      background: url('./65.png') no-repeat;
      background-size: 100%;
      background-position: center;
      margin-right: 10px;
    }

    .icon08 {
      width: 30px;
      height: 30px;

      background: url('./66.png') no-repeat;
      background-size: 100%;
      background-position: center;

      margin-right: 10px;
    }
    .icon09 {
      width: 30px;
      height: 27px;
      background: url('./67.png') no-repeat;
      background-size: 100%;
      background-position: center;
      margin-right: 10px;
    }

    .icon11 {
      width: 30px;
      height: 30px;
      background: url('./11.png') no-repeat;

      background-size: 100%;
      background-position: center;
      margin-right: 10px;
    }
  }
}
</style>
