import { useRouter } from 'vue-router';
export function useCustomRouter() {
  const router = useRouter();
  // 对数据发送的导航，进行二次加工
  function goPage(url: string) {
    // 需要处理的 路由 数组
    const needManageRouterArr = ['/expert', '/live'];
    const result = needManageRouterArr.includes(url);
    if (result) {
      switch (url) {
        // 如果是ai专家路由
        case '/expert':
          router.push({ path: url, query: { from: 'ai' } });
          break;
        // 如果是直播路由
        case '/live':
          router.push({ path: url, query: { from: 'index' } });
          break;
      }
    } else {
      router.push({ path: url });
    }
  }
  return {
    goPage,
  };
}
