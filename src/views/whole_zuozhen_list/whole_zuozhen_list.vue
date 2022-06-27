<template>
  <div class="zuozhen_list-container">
    <Header :indexHeader="false"></Header>
    <ul v-if="!noData">
      <li v-for="item in list" :key="item.id" @click="goToDetail(item.id)">
        <p class="p1 f20">{{ item.title }}</p>
        <p class="p2 f18">
          {{ item.showtime }}<span class="hospital">{{ item.mpublic }}</span>
        </p>
      </li>
    </ul>
    <van-empty
      :description="'暂无' + getDefaultMenuName.hospitalName + '就诊记录'"
      v-if="noData"
    ></van-empty>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import { mapState, mapGetters } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
export default {
  setup() {
    useTitles('我的坐诊巡诊');
  },
  name: 'wholeZuoZhenList',

  components: { Header },
  props: {},
  data() {
    return {
      list: [],
      noData: false,
    };
  },
  computed: {
    ...mapState(['uId']),
    ...mapGetters(['initMid', 'getDefaultMenuName']),
  },
  watch: {},
  created() {},
  mounted() {
    this.getOnlineList();
  },
  methods: {
    getOnlineList() {
      this.noData = false;
      this.$axios
        .fetchPost('/Mobile/Treatment/getWenzhen', {
          uId: this.uId,
          mId: this.initMid,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = res.data.data;
          } else if (res.data.code == 201) {
            this.noData = true;
          }
        });
    },
    goToDetail(id) {
      this.$router.push({
        path: '/zuozhen_detail',
        query: { id: id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .zuozhen_list-container {
    ul {
      li {
        .hospital {
          display: none;
        }
      }
    }
  }
}

.zuozhen_list-container {
  ul {
    margin-top: 10px;
    padding-left: 12px;
    background: #fff;
    li {
      min-height: 75px;
      padding: 17px 12px;
      padding-left: 0;
      background: #fff;
      border-bottom: 1px solid $border-color;
      &:last-child {
        border: none;
      }
      .p1 {
        color: #000000;
        font-size: 15px;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .p2 {
        color: #363a44;
        font-size: 12px;
        span {
          float: right;
        }
      }
    }
  }
}
</style>
