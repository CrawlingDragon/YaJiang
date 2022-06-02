<!-- 评分弹窗 -->
<template>
  <van-popup
    v-model:show="showRote"
    position="bottom"
    :style="{ height: '234px' }"
    class="rotes"
  >
    <div class="sub subText f18" :class="{ content: roteValue !== 0 }" @click="subRemark">
      发表
    </div>
    <div class="title f18">评价 {{ author }}</div>
    <van-rate v-model="roteValue" icon="star" void-icon="star-o" />
    <span class="rote-text f18">{{ formatStar(roteValue) }}</span>
    <van-field
      v-model="messageRote"
      autosize
      rows="3"
      type="textarea"
      maxlength="200"
      :placeholder="'请评价' + author"
      show-word-limit
      class="message"
    />
  </van-popup>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { formatStar } from '@/common/js/formatStar';
// import { Toast } from 'vant';
// 给谁评价的props
const props = defineProps<{ author: string }>();

// 点击发表的emit，在父组件触发，是因为发送的请求可能不一致
const emits = defineEmits<{
  (
    e: 'emitSub',
    subObj: {
      roteValue: number;
      roteMessage: string;
    }
  ): void;
}>();

// 弹窗是否显示 ref
const showRote = ref<boolean>(false);
// 填写评价的 ref
const messageRote = ref<string>('');
// 评分值的ref
const roteValue = ref<number>(0);

// 弹出弹窗方法
const open = () => {
  showRote.value = true;
};

// open方法暴露出去，让父组件控制打开弹窗
defineExpose({ open });
function subRemark(err: any) {
  //发表评价
  // 表单验证， 必须评星
  if (roteValue.value === 0) {
    // Toast('评价内容不能为空');
    return;
  }
  showRote.value = false;
  emits('emitSub', {
    roteMessage: messageRote.value.trim(),
    roteValue: roteValue.value,
  });
}
</script>
<style lang="scss">
.rotes {
  padding: 14px 12px;
  .sub {
    position: absolute;
    right: 0;
    top: 0;
    color: $f-color-three;
    font-size: 12px;
    padding: 16px 12px;
    &.content {
      color: $theme-color;
    }
  }

  .title {
    color: #343a45;
    font-size: 15px;
    margin-bottom: 15px;
    font-weight: 400;
  }
  .rote-text {
    color: #666666;
    font-size: 13px;
    vertical-align: middle;
    line-height: 27px;
    display: inline-block;
    vertical-align: top;
    margin-top: 3px;
    margin-left: 20px;
  }
  .message {
    // height: 100px;
    border: 1px solid $border-color;
    margin-top: 10px;
    // :deep().van-field__word-limit {
    //   margin-top: 0;
    // }
  }
  .van-icon-star {
    // 66,63
    // 55,53
    width: 27px;
    height: 26px;
    background: url(./41.png) no-repeat;
    background-size: contain;
    &:before {
      display: none;
    }
  }
  .van-icon-star-o {
    width: 27px;
    height: 26px;
    background: url(./42.png) no-repeat;
    background-size: contain;
    &:before {
      display: none;
    }
  }
}
.old {
  .van-icon-star {
    width: 33px;
    height: 31px;
    background: url(./41.png) no-repeat;
    background-size: contain;
  }
  .van-icon-star-o {
    width: 33px;
    height: 31px;
    background: url(./42.png) no-repeat;
    background-size: contain;
    &:before {
      display: none;
    }
  }
}
</style>
