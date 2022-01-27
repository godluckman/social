import React from 'react';
import { DefaultRootState, useSelector } from 'react-redux';

export interface IThemeState extends DefaultRootState {
  theme: boolean;
}

export const LikeButton = ({ isLike, handleLike, handleUnLike }: any) => {
  const { theme } = useSelector((state: IThemeState) => state);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLike ? (
        <i
          className='fas fa-heart text-danger'
          onClick={handleUnLike}
          onKeyUp={handleUnLike}
          style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
        />
      ) : (
        <i className='far fa-heart' onClick={handleLike} onKeyUp={handleLike} />
      )}
    </>
  );
};
