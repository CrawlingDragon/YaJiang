// 根据star的数量，返回对应的文案
export function formatStar(num: number) {
  switch (num) {
    case 1:
      return '非常差';
      break;
    case 2:
      return '差';
      break;
    case 3:
      return '一般';
      break;
    case 4:
      return '好';
      break;
    case 5:
      return '很好';
      break;
  }
}
