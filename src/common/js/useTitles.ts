import { onActivated, Ref } from 'vue';
import { useTitle } from '@vueuse/core';
const title = useTitle();
export function useTitles(propTitle: string): any {
  title.value = propTitle;
  onActivated(() => {
    title.value = propTitle;
  });
  return title;
}
