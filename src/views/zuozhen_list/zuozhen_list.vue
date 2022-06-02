<template>
  <div class="zuozhen_list-container">
    <Header header="indexHeader" navHeader="坐诊巡诊" :mid="mid"></Header>
    <ul>
      <li v-for="item in list" :key="item.id" @click="goToDetail(item.id)">
        <p class="p1 f20">{{ item.title }}</p>
        <p class="p2 f18">{{ item.showtime }}</p>
      </li>
    </ul>
    <van-empty description="暂无医院就诊记录" v-if="noData"></van-empty>
  </div>
</template>
<script>
import Header from '@/components/hospital_header/hospital_header';
import { mapState } from 'vuex';
import { useTitles } from '@/common/js/useTitles';

export default {
  setup() {
    useTitles('坐诊巡诊');
  },
  name: 'zuozhenList',
  components: { Header },

  props: {},
  data() {
    return {
      list: [],
      noData: false,
    };
  },
  computed: {
    ...mapState(['mid', 'hospitalName']),
  },
  created() {},
  watch: {},
  mounted() {
    this.getOnlineList();
  },
  methods: {
    getOnlineList() {
      this.noData = false;
      this.$axios
        .fetchPost('/Mobile/Treatment/getWenzhen', { mId: this.mid })
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
        path: 'zuozhen_detail',
        query: { id: id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.zuozhen_list-container {
  ul {
    margin-top: 10px;
    padding-left: 12px;
    background: #fff;
    li {
      min-height: 75px;
      padding: 15px 12px;
      padding-left: 0;
      background: #fff;
      border-bottom: 1px solid $border-color;
      &:last-child {
        border: none;
      }
      .p1 {
        color: $f-color;
        font-size: 15px;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .p2 {
        color: $f-color-second;
        font-size: 12px;
      }
    }
  }
}
</style>
