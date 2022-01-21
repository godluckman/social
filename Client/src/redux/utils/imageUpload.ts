import axios from 'axios';

export const checkImage = (file: File) => {
  let err = '';
  if (!file) {
    err = 'File does not exist ';
    return err;
  }
  if (file.size > 1024 * 1024) {
    err = 'File must be less than 1mb';
    return err;
  }
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    err = 'Image format is incorrect';
    return err;
  }
  return err;
};

export const imageUpload = async (image: any) => {
  const formData = new FormData();
  formData.append('image', image);
  const res = await axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
