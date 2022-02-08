import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { allTypes } from '../../redux/actions/allTypes';

const useOutsideClick = (ref: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch({
          type: allTypes.STATUS,
          payload: false,
        });
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, ref]);
};

export default useOutsideClick;
