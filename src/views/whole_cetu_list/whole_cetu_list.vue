<template>
  <div class="cetu_list-container">
    <Header :indexHeader="false"></Header>
    <!-- <HeaderHospital :header="headerKind" navHeader="测土配方" v-else></HeaderHospital> -->
    <ul class="cetu_ul">
      <li v-for="item in list" :key="item.id" @click="goToDetail(item.id)">
        <div class="top">
          <div class="title f22">
            {{ item.title }}
          </div>
          <div class="time f18">{{ item.showtime }}</div>
        </div>
        <div class="hospital">{{ item.mpublic }}</div>
      </li>
    </ul>
    <van-empty description="暂无土壤检测报告" v-show="noData"></van-empty>
  </div>
</template>
<script>
import Header from '@/components/header/header';
// import HeaderHospital from "@/components/hospital_header/hospital_header";
import { mapState, mapGetters } from 'vuex';
import { useTitles } from '@/common/js/useTitles';

export default {
  setup() {
    useTitles('土壤检测');
  },
  name: 'wholeCeTuList',
  components: { Header },
  props: {},

  created() {},
  data() {
    return {
      list: [],
      noData: false,
    };
  },
  computed: {
    ...mapState(['mid', 'uId']),
    // ...mapGetters(['initMid']),
  },
  watch: {},
  mounted() {
    // this.getMeList();
    this.getList();
  },
  methods: {
    getList() {
      // 获取测土配方列表 医院
      this.noData = false;
      this.$axios
        .fetchPost('Mobile/Treatment/getTestingsoil', {
          uId: this.uId,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = res.data.data;
          } else if (res.data.code == 201) {
            this.noData = true;
          }
        });
    },
    getMeList() {
      // 获取测土配方列表  个人
      this.$axios.fetchPost('/Mobile/Treatment/getTestingsoil', { uId: this.uId }).then((res) => {
        if (res.data.code == 0) {
          this.list = res.data.data;
        }
      });
    },
    goToDetail(id) {
      this.$router.push({
        path: '/soil_detail',
        query: { id: id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .cetu_list-container {
    .cetu_ul {
      li {
        padding: 14px 12px 12px 0;
        min-height: 50px;
        .hospital {
          display: none;
        }
        .top {
          .time {
            width: auto;
          }
        }
      }
    }
  }
}
.cetu_list-container {
  .cetu_ul {
    padding-left: 12px;
    background: #fff;
    margin-top: 10px;
    li {
      border-bottom: 1px solid $border-color;
      padding: 14px 0 12px;
      min-height: 50px;
      &:last-child {
        border: none;
      }
      .top {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        .title {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 15px;
          color: #000;
        }
        .time {
          width: 100px;
          margin-left: 15px;
          font-size: 12px;
          color: #999;
        }
      }
      .hospital {
        width: 100%;
        color: #363a44;
        font-size: 12px;
        line-height: 22px;
      }
    }
  }
}
</style>
