const checkImage = (file: File) => {
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
export default checkImage;
