import LocalStorage from 'ciel-localstorage';

import Permission from '@/store/permission';

export const auth = {
  bind: (el, binding) => {
    console.log('binding', binding);
    console.log('binding.value', binding.value);
    console.log('LocalStorage.get(role)', LocalStorage.get('role'));
    const authList = binding.value;
    const role = LocalStorage.get('role') || 'visitor';
    if (!Permission.checkAuth(authList, role)) {
      el.parentNode.removeChild(el);
    }
  },
};

export const auth2 = {
  bind: (el, binding) => {
    console.log('binding', binding);
    console.log('binding.value', binding.value);
    console.log('LocalStorage.get(role)', LocalStorage.get('role'));
    const authList = binding.value;
    const role = LocalStorage.get('role') || 'visitor';
    if (!Permission.checkAuth(authList, role)) {
      el.parentNode.removeChild(el);
    }
  },
};