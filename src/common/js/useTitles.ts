import { onActivated, Ref } from 'vue';
import { useTitle } from '@vueuse/core';
const title = useTitle();
export function useTitles(propTitle: string): Ref {
  title.value = propTitle;
  onActivated(() => {
    title.value = propTitle;
  });
  return title;
}
