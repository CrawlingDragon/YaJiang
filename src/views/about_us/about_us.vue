<template>
  <div class="about-us">
    <Header :indexHeader="false"></Header>
    <div class="content">
      <p class="p1 f17">
        天目雷笋为农服务平台通过数字化手段实现对天目雷笋产业生产环节的指导和服务，实现让手机成为新农具，促进天目雷笋健康、有序、高质高效发展。
      </p>
      <p class="p1 f17">
        平台所包含的服务内容通过介入雷笋生产环节中的投入品施用和农技服务，推进肥药两制双专和科学施用肥药，同时引导笋农及时正确作业，让笋农可以实现适宜的时间做合理的农事，提高雷笋农事作业及时性和标准化，为雷笋品质溯源提供了真实可靠的服务过程数据。平台还提供人工智能辅助诊疗在内的多种农技服务渠道途径，通过生产标准化指导和农技精准化服务以解决在传统种植模式下笋农因个人技术差异导致雷笋品质参差不齐的问题，为雷笋溯源、雷笋分析决策提供数据支撑。
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useTitles } from '@/common/js/useTitles';
useTitles('关于我们');
</script>
<style lang="scss" scoped>
.about-us {
  background: #fff;
  margin-top: 15px;
  overflow-y: auto;
  .content {
    padding: 20px 12px 15px;
    .p1 {
      color: $f-color;
      font-size: 14px;
      line-height: 1.2;
      margin-bottom: 30px;
      text-indent: 2em;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
