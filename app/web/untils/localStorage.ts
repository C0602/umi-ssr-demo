export const localStorageSet = (key: string, value: any) => {
  if (typeof value === 'object') value = JSON.stringify(value);
  window.localStorage.setItem(key, value);
};

export const localStorageGet: any = (key: string) => {
  return window.localStorage.getItem(key);
};

export const localStorageRemove = (key: string) => {
  window.localStorage.removeItem(key);
};
