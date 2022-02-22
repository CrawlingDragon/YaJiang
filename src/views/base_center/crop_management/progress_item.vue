<template>
  <div class="progress-item">
    <div class="left">{{ item.classname }}</div>
    <div class="mid">
      <van-progress
        :percentage="item.percent"
        color="#155BBB"
        :show-pivot="false"
        stroke-width="8"
      />
    </div>
    <div class="right"><slot></slot>{{ item.percent }}%</div>
  </div>
</template>
<script>
export default {
  name: "progress_item",
  components: {},
  props: {
    item: {
      type: Object,
      default: function() {
        return { classname: "", percent: 0, id: "" };
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  unmounted() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.progress-item
  display flex
  align-items center
  min-height 21px
  margin-bottom 10px
  .left
    width 150px
    font-size 14px
    color #333
    padding 0 10px 0 10px
  .mid
    flex 1
    min-width 0
  .right
    width 70px
    text-align center
    padding-left 15px
    color #155BBB
    font-size 14px
    padding-right 12px
</style>
