import { Request, Response } from 'express';
import PostService from '../services/postService';

const postController = {
  createPost: async (req: Request, res: Response) => {
    try {
      const { content, auth, image } = req.body;
      if (!image)
        return res.status(400).json({ msg: 'Please add your photo.' });
      const newPost = await PostService.addPost(content, image, auth.user._id);
      res.json({
        msg: 'Created Post!',
        newPost: {
          ...newPost._doc,
          user: auth.user,
        },
      });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
  getPosts: async (req: any, res: Response) => {
    try {
      const posts = await PostService.getPosts(
        req.user.following,
        req.user._id
      );
      res.json({
        msg: 'Success!',
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  updatePost: async (req: any, res: Response) => {
    try {
      const { content, image } = req.body;
      const post = await PostService.updatePost(req.params.id, content, image);
      res.json({
        msg: 'Updated Post!',
        newPost: {
          ...post._doc,
          content,
          image,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  likePost: async (req: any, res: Response) => {
    try {
      const { post, like } = await PostService.likePost(
        req.params.id,
        req.user._id
      );
      if (post.length > 0)
        return res.status(400).json({ msg: 'You liked this post.' });
      if (!like)
        return res.status(400).json({ msg: 'This post does not exist.' });
      res.json({ msg: 'Liked Post!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  unLikePost: async (req: any, res: Response) => {
    try {
      const like = await PostService.unLikePost(req.params.id, req.user._id);
      if (!like)
        return res.status(400).json({ msg: 'This post does not exist.' });
      res.json({ msg: 'UnLiked Post!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  getUserPosts: async (req: any, res: Response) => {
    try {
      const posts = await PostService.getUserPosts(req.params.id);
      res.json({
        posts,
        result: posts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  getPost: async (req: any, res: Response) => {
    try {
      const post = await PostService.getPost(req.params.id);
      if (!post)
        return res.status(400).json({ msg: 'This post does not exist.' });
      res.json({
        post,
      });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  deletePost: async (req: any, res: Response) => {
    try {
      const post = await PostService.deletePost(req.params.id, req.user._id);
      res.json({
        msg: 'Deleted Post!',
        newPost: {
          ...post,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
};

export default postController;
