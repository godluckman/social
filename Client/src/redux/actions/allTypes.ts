export const allTypes = {
  AUTH: 'AUTH',
  ALERT: 'ALERT',
  NOTIFY: 'NOTIFY',
  THEME: 'THEME',
  STATUS: 'STATUS',
};

export const editData = (data: any[], id: string, post: any) =>
  data.map((item: any) => (item._id === id ? post : item));

export const deleteData = (data: any[], id: string) =>
  data.filter((item: any) => item._id !== id);
