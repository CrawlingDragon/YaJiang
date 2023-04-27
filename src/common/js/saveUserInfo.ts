import storage from 'good-storage';

interface User {
  username?: string;
  uid: string;
  avatar?: string;
  status?: number;
  resideprovince?: string;
  residecity?: string;
  residedist?: string;

  realname: string;
}
export function saveUid(user: User) {
  const { uid } = user;
  storage.session.set('uId', uid);
  const item = storage.session.get('uId');
  return item;
}
export function saveUserInfo(user: User) {
  const {
    username,
    uid,
    avatar,
    status,
    resideprovince,
    residecity,
    residedist,

    realname,
  } = user;
  const location =
    resideprovince + (residecity ? ',' + residecity : '') + (residedist ? ',' + residedist : '');
  return { username, uid, avatar, status, location, realname };
}
