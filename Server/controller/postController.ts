import { Request, Response } from 'express';
import PostModel from '../model/postModel';
import CommentModel from '../model/commentModel';

const postController = {
  createPost: async (req: Request, res: Response) => {
    try {
      const { content, auth, image } = req.body;

      if (!image)
        return res.status(400).json({ msg: 'Please add your photo.' });

      const newPost = new PostModel({
        content,
        image,
        user: auth.user._id,
      });
      await newPost.save();

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
      const posts = await PostModel.find({
        user: [...req.user.following, req.user._id],
      })
        .sort('-createdAt')
        .populate('user likes', 'avatar username fullName followers')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });

      // const features = new APIfeatures(Posts.find({
      //   user: [...req.user.following, req.user._id]
      // }), req.query).paginating()
      // const posts = await features.query
      //   .sort('-createdAt')
      //   .populate('user likes', 'avatar username fullName followers')

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
      const post = await PostModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          image,
        }
      )
        .populate('user likes', 'avatar username fullName')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });

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
      const post = await PostModel.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (post.length > 0)
        return res.status(400).json({ msg: 'You liked this post.' });

      const like = await PostModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );
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
      const like = await PostModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

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
      const posts = await PostModel.find({ user: req.params.id }).sort(
        '-createdAt'
      );
      // const features = new APIfeatures(Posts.find({user: req.params.id}), req.query)
      //   .paginating()
      // const posts = await features.query.sort("-createdAt")
      //
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
      const post = await PostModel.findById(req.params.id)
        .populate('user likes', 'avatar username fullName followers')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });

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
      const post = await PostModel.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      await CommentModel.deleteMany({ _id: { $in: post.comments } });

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
