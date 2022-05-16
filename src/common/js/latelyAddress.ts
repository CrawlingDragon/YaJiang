import storage from 'good-storage';
export default function saveLatelyAddress(key: string, address: string) {
  // let storageArr = storage.get("latelyAddressArray", []);
  let storageArr = storage.get(key, []);
  if (!storageArr.includes(address)) {
    // 没有地址的情况下，添加地址
    storageArr.unshift(address);
    if (storageArr.length >= 6) {
      // 最多保存五个地址
      storageArr.pop(storageArr[storageArr.length - 1]);
    }
  } else {
    let index = storageArr.indexOf(address);
    storageArr.splice(index, 1);
    storageArr.unshift(address);
  }
  return storageArr;
}

export function setStorageAddress(key: string, address: string) {
  let result = saveLatelyAddress(key, address);
  storage.set(key, result);
}
