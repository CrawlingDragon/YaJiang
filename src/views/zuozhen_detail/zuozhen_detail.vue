<template>
  <div class="zuozhen_detail-container">
    <Header header="logoHeader"></Header>
    <ul class="top-ul">
      <li class="title1 f22">{{ zuozhen.title }}</li>
      <li>
        <div class="left">送样人</div>
        <div class="right">{{ zuozhen.username }}</div>
      </li>
      <li>
        <div class="left">种植作物</div>
        <div class="right">{{ zuozhen.fname }}</div>
      </li>
      <li>
        <div class="left">日期</div>
        <div class="right">{{ zuozhen.addtime }}</div>
      </li>
      <li>
        <div class="left">病情描述</div>
        <div class="right">{{ zuozhen.content }}</div>
      </li>
      <div class="img-ul" v-if="zuozhen.pic_urls_tiny && zuozhen.pic_urls_tiny.length != 0">
        <div class="t1">病情图片</div>
        <div class="item">
          <van-image
            class="img"
            v-for="(item, index) in zuozhen.pic_urls_tiny"
            :key="item"
            :src="item"
            @click="preverImg(index)"
          ></van-image>
        </div>
      </div>
    </ul>
    <div class="bottom">
      <div class="title f22">{{ getDefaultMenuName.chufangName }}信息</div>
      <div class="list">
        <div class="left">{{ getDefaultMenuName.chufangName }}专家</div>
        <div class="right">{{ zuozhen.chufang_expert }}</div>
      </div>
      <div class="list">
        <div class="left">结果</div>
        <div class="right">{{ zuozhen.result }}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="title f22">用药信息</div>
      <div class="list">
        <div class="left">结果</div>
        <div class="right">{{ zuozhen.result }}</div>
      </div>
    </div>
    <ul class="bottom" v-show="products.length != 0">
      <li class="title f22">处方药({{ products.length }})</li>
      <li class="chufang-li" v-for="item in zuozhen.products" :key="item.id">
        <van-image fit="cover" :src="item.thumb_pic" class="chufang-img"></van-image>
        <div class="mid">
          <p class="p1">{{ item.name }}</p>
          <p class="p2">规格:{{ item.spec }} 单价:¥{{ item.price }}</p>
        </div>
        <div class="number">x{{ item.quantity }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import Header from '@/components/hospital_header/hospital_header';
import { ImagePreview } from 'vant';
import { useTitles } from '../../common/js/useTitles';
import { mapGetters } from 'vuex';

export default {
  name: 'zuozhenDetail',
  components: { Header, [ImagePreview.Component.name]: ImagePreview.Component },
  setup() {
    const title = useTitles('坐诊巡诊详情');
    return { title };
  },
  data() {
    return {
      zuozhen: '我的-坐诊巡诊详情',
      products: [],
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    ...mapGetters(['getDefaultMenuName']),
  },
  watch: {
    $route() {
      this.getZuoDetail(this.id);
    },
  },
  mounted() {
    this.getZuoDetail(this.id);
  },
  methods: {
    getZuoDetail(id) {
      this.$axios.fetchPost('/Mobile/Treatment/wenzhenDetail', { id: id }).then((res) => {
        if (res.data.code == 0) {
          this.zuozhen = res.data.data;
          this.products = res.data.data.products;
          this.type = res.data.data.type;
          this.title = res.data.data.type + '详情';
        }
      });
    },
    preverImg(index) {
      //网诊的图片预览
      ImagePreview({
        images: this.zuozhen.pic_urls,
        startPosition: index,
        closeable: true,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .zuozhen_detail-container {
    .left,
    .right {
      font-size: 17px !important;
    }
  }
}
.zuozhen_detail-container {
  .top-ul {
    margin-top: 10px;
    background: #fff;
    padding-left: 12px;
    .title1 {
      color: $theme-color;
      font-size: 17px;
    }
    li {
      min-height: 50px;
      padding: 20px 15px;
      padding-left: 0;
      display: flex;
      border-bottom: 1px solid $border-color;
      &:last-child {
        border: none;
      }
      .left {
        width: 100px;
        color: #363a44;
        font-size: 15px;
      }
      .right {
        flex: 1;
        color: #333;
      }
    }
    .img-ul {
      padding: 15px 12px;
      padding-right: 5px;
      .t1 {
        color: #363a44;
        font-size: 15px;
        margin-bottom: 10px;
      }
      .img {
        display: inline-block;
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
    }
  }
  .bottom {
    margin-top: 10px;
    background: #fff;
    padding-left: 12px;
    .title {
      font-size: 17px;
      color: $theme-color;
      padding: 15px 12px 15px 0;
      border-bottom: 1px solid $border-color;
    }
    .list {
      display: flex;
      min-height: 50px;
      padding: 20px 15px;
      padding-left: 0;
      display: flex;
      border-bottom: 1px solid $border-color;
      &:last-child {
        border: none;
      }
      .left {
        width: 100px;
        color: #363a44;
        font-size: 15px;
      }
      .right {
        flex: 1;
        color: #333;
        font-size: 15px;
      }
    }
  }
  .chufang-li {
    display: flex;
    padding: 15px 12px;
    .chufang-img {
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
    .mid {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 0;
      .p2 {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>
