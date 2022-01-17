import axios, { AxiosResponse } from 'axios';

export const getDataApi = async (url: string, token: string) => {
  const res: AxiosResponse = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataApi = async (url: string, post: string, token: string) => {
  const res: AxiosResponse = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataApi = async (url: string, post: string, token: string) => {
  const res: AxiosResponse = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataApi = async (
  url: string,
  post: string,
  token: string
) => {
  const res: AxiosResponse = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataApi = async (url: string, token: string) => {
  const res: AxiosResponse = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
