import LocalStorage from 'ciel-localstorage';

import Permission from '@/store/permission';

export function hasAuth(authList) {
  // console.log('hasAuth', authList);
  // console.log('LocalStorage.get(role)', LocalStorage.get('role'));
  const role = LocalStorage.get('role') || 'visitor';
  // console.log(Permission.checkAuth(authList, role));
  return Permission.checkAuth(authList, role);
}