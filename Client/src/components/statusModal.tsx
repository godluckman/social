import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allTypes } from '../redux/actions/allTypes';
import { IState } from './profile/Following';
import { createPost, updatePost } from '../redux/actions/postAction';

interface IStatusState extends IState {
  theme: boolean;
  status: any;
}

const StatusModal = () => {
  const { auth, theme, status } = useSelector((state: IStatusState) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({
        type: allTypes.ALERT,
        payload: { error: 'Please add your photo.' },
      });

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth }));
    }

    setContent('');
    setImages([]);
    return null;
  };

  const handleChangeImages = (e: any) => {
    const files = [...e.target.files];
    let err = '';
    const newImages: File[] = [];
    files.forEach((file) => {
      if (!file) {
        err = 'File does not exist.';
        return err;
      }

      if (file.size > 1024 * 1024 * 5) {
        err = 'The  largest image is 5mb.';
        return err;
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: allTypes.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index: number) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  return (
    <div className='status_modal'>
      <form onSubmit={handleSubmit}>
        <div className='status_header'>
          <h5 className='m-0'>Create Post</h5>
          <span
            onClick={() =>
              dispatch({
                type: allTypes.STATUS,
                payload: false,
              })
            }
            onKeyUp={() =>
              dispatch({
                type: allTypes.STATUS,
                payload: false,
              })
            }
          >
            &times;
          </span>
        </div>
        <div className='status_body'>
          <textarea
            name='content'
            value={content}
            placeholder={`${auth.user.userName}, what do you you think?`}
            onChange={(e) => setContent(e.target.value)}
            style={{
              filter: theme ? 'invert(1)' : 'invert(0)',
              color: theme ? 'white' : '#111',
              background: theme ? 'rgba(0,0,0,.03)' : '',
            }}
          />
          <div className='show_images'>
            {images.map((img, index) => (
              <div key={img.name} id='file_img'>
                <img
                  src={URL.createObjectURL(img)}
                  alt='images'
                  className='img-thumbnail'
                  style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                />
                <span
                  onClick={() => deleteImages(index)}
                  onKeyUp={() => deleteImages(index)}
                >
                  &times;
                </span>
              </div>
            ))}
          </div>
          <div className='input_images'>
            <div className='file_upload'>
              <i className='fas fa-image' />
              <input
                type='file'
                name='file'
                id='file'
                multiple
                accept='image/*,video/*'
                onChange={handleChangeImages}
              />
            </div>
          </div>
        </div>
        <div className='status_footer'>
          <button className='btn btn-secondary w-100' type='submit'>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
