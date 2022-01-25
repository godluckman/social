import { IUser } from './profileAction';

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

export const createPost =
  ({ content, images, auth }: ICreatePost) =>
  async (dispatch: CallableFunction) => {
    const media = [];
    console.log({ content, images, auth });
  };

export const updatePost =
  ({ content, images, auth, status }: any) =>
  async (dispatch: CallableFunction) => {
    console.log({ content, images, auth, status });
  };
