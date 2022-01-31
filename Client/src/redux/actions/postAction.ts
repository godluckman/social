import { IUser } from './profileAction';
import { allTypes } from './allTypes';
import { imageUpload } from '../utils/imageUpload';
import {
  deleteDataApi,
  getDataApi,
  patchDataApi,
  postDataApi,
} from '../utils/fetchData';

export const postTypes = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  GET_POST: 'GET_POST',
  DELETE_POST: 'DELETE_POST',
};

interface ICreatePost {
  content: string;
  images: File[];
  auth: { token: string; user: IUser };
}

interface IUpdatePost extends ICreatePost {
  status: any;
}

export const createPost =
  ({ content, images, auth }: ICreatePost) =>
  async (dispatch: CallableFunction) => {
    const image = images[0];
    let media = [];
    try {
      dispatch({ type: allTypes.ALERT, payload: { loading: true } });
      if (image) media = await imageUpload(image);
      const imgName = media.img.split('\\');
      const imgGet = `http://localhost:3100/images/${imgName[4]}`;
      const res = await postDataApi(
        'posts',
        { content, auth, image: imgGet },
        auth.token
      );

      dispatch({
        type: postTypes.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });

      dispatch({ type: allTypes.ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts =
  (token: string) => async (dispatch: CallableFunction) => {
    try {
      dispatch({ type: postTypes.LOADING_POST, payload: true });
      const res = await getDataApi('posts', token);

      dispatch({
        type: postTypes.GET_POSTS,
        payload: { ...res.data, page: 2 },
      });

      dispatch({ type: postTypes.LOADING_POST, payload: false });
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updatePost =
  ({ content, images, auth, status }: IUpdatePost) =>
  async (dispatch: CallableFunction) => {
    let media = [];
    const image: string | File = images[0];
    let imgGet: string | File = image;
    try {
      dispatch({ type: allTypes.ALERT, payload: { loading: true } });
      if (image.name) {
        media = await imageUpload(image);
        const imgName = media.img.split('\\');
        imgGet = `http://localhost:3100/images/${imgName[4]}`;
      }
      const res = await patchDataApi(
        `post/${status._id}`,
        {
          content,
          image: imgGet,
        },
        auth.token
      );
      dispatch({
        type: postTypes.UPDATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });
      dispatch({ type: allTypes.ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likePost =
  ({ post, auth }: any) =>
  async (dispatch: CallableFunction) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

    try {
      await patchDataApi(`post/${post._id}/like`, null, auth.token);
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikePost =
  ({ post, auth }: any) =>
  async (dispatch: CallableFunction) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like: any) => like._id !== auth.user._id),
    };
    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });
    try {
      await patchDataApi(`post/${post._id}/unlike`, null, auth.token);
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPost =
  ({ detailPost, id, auth }: any) =>
  async (dispatch: CallableFunction) => {
    if (detailPost.every((post: any) => post._id !== id)) {
      try {
        const res = await getDataApi(`post/${id}`, auth.token);
        dispatch({ type: postTypes.GET_POST, payload: res.data.post });
      } catch (err: any) {
        dispatch({
          type: allTypes.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const deletePost =
  ({ post, auth }: any) =>
  async (dispatch: CallableFunction) => {
    console.log({ post, auth });
    dispatch({ type: postTypes.DELETE_POST, payload: post });
    const imgName = post.image.split('/')[4];
    try {
      const res = await deleteDataApi(`post/${post._id}`, auth.token);

      await deleteDataApi(`delete/${imgName}`, auth.token);
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
