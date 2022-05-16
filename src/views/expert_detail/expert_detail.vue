<template>
  <div class="expert_detail-container">
    <Header :indexHeader="false"></Header>
    <div class="avator-box" v-if="person.name || person.avatar">
      <van-image class="avator" :src="person.avatar" fit="cover"></van-image>
      <p class="p1 f30">{{ person.name }}</p>
    </div>
    <ul class="info-ul" v-if="person.identity == 1">
      <li v-if="person.skill">
        <div class="left f22">擅长</div>
        <div class="right f22">{{ person.skill }}</div>
      </li>
      <li v-if="person.residecity">
        <div class="left f22 left2">所在地</div>
        <div class="right f22">{{ person.residecity }}</div>
      </li>
      <li v-if="person.company">
        <div class="left f22">单位</div>
        <div class="right f22">{{ person.company }}</div>
      </li>
      <li v-if="person.position != ''">
        <div class="left f22">职称</div>
        <div class="right f22">{{ person.position }}</div>
      </li>
      <li v-if="person.introduce != ''">
        <div class="left f22">简介</div>
        <div class="right f22">{{ person.introduce }}</div>
      </li>
    </ul>
    <ul class="info-ul" v-if="person.identity != 1">
      <li>
        <div class="left">种植作物</div>
        <div class="right">{{ person.forum }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import Header from '@/components/header/header';

import { useTitles } from '../../common/js/useTitles';

export default {
  setup() {
    useTitles('个人简介');
  },
  name: 'expertDetail',
  components: { Header },
  props: {},
  data() {
    return {
      id: this.$route.query.id,
      uId: this.$route.query.uId,
      person: '',
    };
  },

  mounted() {
    this.getPersonDetail();
  },
  methods: {
    getPersonDetail() {
      this.$axios
        .fetchPost('Mobile/user/homepage', { id: this.id, uId: this.uId })
        .then((res) => {
          if (res.data.code == 0) {
            this.person = res.data.data;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .expert_detail-container {
    .info-ul {
      margin-top: 16px;
      li {
        display: flex;
        .left {
          width: 95px;
        }
        .left,
        .right {
          font-size: 22px;
          line-height: 1.2;
        }
      }
    }
  }
}
.expert_detail-container {
  .avator-box {
    margin-top: 10px;
    height: 150px;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    background: #fff;
    .avator {
      width: 65px;
      height: 65px;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 18px;
    }
    .p1 {
      font-size: 20px;
      color: #333333;
    }
  }
  .info-ul {
    margin-top: 10px;
    padding-left: 12px;
    background: #fff;
    li {
      padding: 16px 0;
      padding-right: 12px;
      border-bottom: 1px solid #e5e5e5;
      min-height: 50px;
      display: flex;
      &:last-child {
        border: none;
      }
      .left {
        width: 66px;
        color: #363a44;
        font-size: 15px;
        padding-left: 3px;
      }
      .right {
        flex: 1;
        color: #000000;
        font-size: 15px;
        line-height: 22px;
      }
    }
  }
}
</style>
