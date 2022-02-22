import storage from 'good-storage';

export function saveUid(user) {
  const { uid } = user;
  storage.set('uId', uid);
  const item = storage.get('uId');
  return item;
}
export function saveUserInfo(user) {
  const { username, uid, avatar, status, resideprovince, residecity, residedist } = user;
  const location =
    resideprovince +
    (residecity ? ',' + residecity : '') +
    (residedist ? ',' + residedist : '');
  return { username, uid, avatar, status, location };
}
