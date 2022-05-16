import { onActivated, Ref } from 'vue';
import { useTitle } from '@vueuse/core';
export function useTitles(propTitle: string): Ref {
  const title = useTitle();
  title.value = propTitle;
  onActivated(() => {
    title.value = propTitle;
  });
  return title;
}
