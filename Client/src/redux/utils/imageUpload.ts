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

export const imageUpload = async (image: string | File) => {
  const formData = new FormData();
  formData.append('image', image);
  const res = await axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

// export const imagesUpload = async (images: File[]) => {
//   const imgArr = [];
//   // eslint-disable-next-line no-restricted-syntax
//   for (const item of images) {
//     const formData = new FormData();
//     formData.append('image', item);
//     // eslint-disable-next-line no-await-in-loop
//     const res = await axios.post('/api/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     // eslint-disable-next-line no-await-in-loop
//     // const data = await res.json();
//     imgArr.push({ public_id: data.public_id, url: data.secure_url });
//   }
//   return imgArr;
// };
