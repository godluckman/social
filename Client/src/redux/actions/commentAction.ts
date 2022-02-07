import { allTypes, deleteData, editData } from './allTypes';
import { postTypes } from './postAction';
import { deleteDataApi, patchDataApi, postDataApi } from '../utils/fetch';
import { IUser } from './profileAction';

export interface IComment {
  tag: IUser;
  reply: any;
  content: string;
  createdAt: string;
  likes: any[];
  user: IUser;
  _id: string;
}

export interface IPost {
  comments: IComment[];
  content: string;
  createdAt: string;
  image: string;
  likes: any[];
  updatedAt: string;
  user: any;
  _id?: string;
}

export interface ICreateComment {
  post: IPost;
  newComment: any;
  auth: { token: string; user: IUser };
}

interface ILikeComment {
  post: IPost;
  comment: IComment;
  auth: { token: string; user: IUser };
}

interface IUpdateComment extends ILikeComment {
  content: string;
}

export const createComment =
  ({ post, newComment, auth }: ICreateComment) =>
  async (dispatch: CallableFunction) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postDataApi('comment', data, auth.token);
      const newData = { ...res.data.newComment, user: auth.user };
      // eslint-disable-next-line no-shadow
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch({ type: postTypes.UPDATE_POST, payload: newPost });
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updateComment =
  ({ comment, post, content, auth }: IUpdateComment) =>
  async (dispatch: CallableFunction) => {
    const newComments = editData(post.comments, comment._id, {
      ...comment,
      content,
    });
    const newPost = { ...post, comments: newComments };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });
    try {
      await patchDataApi(`comment/${comment._id}`, { content }, auth.token);
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likeComment =
  ({ comment, post, auth }: ILikeComment) =>
  async (dispatch: CallableFunction) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };

    const newComments = editData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

    try {
      await patchDataApi(`comment/${comment._id}/like`, null, auth.token);
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikeComment =
  ({ comment, post, auth }: ILikeComment) =>
  async (dispatch: CallableFunction) => {
    const newComment = {
      ...comment,
      likes: deleteData(comment.likes, auth.user._id),
    };

    const newComments = editData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

    try {
      await patchDataApi(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteComment =
  ({ post, comment, auth }: ILikeComment) =>
  async (dispatch: CallableFunction) => {
    const deleteArr = [
      ...post.comments.filter((cm) => cm.reply === comment._id),
      comment,
    ];

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (cm) => !deleteArr.find((da) => cm._id === da._id)
      ),
    };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

    try {
      deleteArr.forEach((item) => {
        deleteDataApi(`comment/${item._id}`, auth.token);
      });
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
