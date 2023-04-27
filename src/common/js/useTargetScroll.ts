import { onMounted, onActivated, onDeactivated, ref } from 'vue';

// 保存在上一次组件的位置，重新进入的时候，回到上一次的位置
export function useTargetScroll() {
  const scrollTop = ref(0);
  function scrollHandler() {
    scrollTop.value =
      document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    // console.log('scrolling :>> ', scrollTop.value);
  }
  onMounted(() => {
    window.addEventListener('scroll', scrollHandler);
    // console.log('onMounted :>> ', scrollTop.value);
  });

  onActivated(() => {
    // console.log('onActivated :>> ', scrollTop.value);
    if (scrollTop.value >= 0) {
      // debugger;
      window.scrollTo(0, scrollTop.value);
      scrollTop.value = 0;
      window.addEventListener('scroll', scrollHandler);
    }
  });
  onDeactivated(() => {
    window.removeEventListener('scroll', scrollHandler);
    // console.log('onDeactivated', scrollTop.value);
  });
  return { scrollTop };
}
