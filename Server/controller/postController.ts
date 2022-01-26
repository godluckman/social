import { Request, Response } from 'express';
import PostModel from '../model/postModel';

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
      }).populate('user likes', 'avatar username fullName followers');

      // const features = new APIfeatures(Posts.find({
      //   user: [...req.user.following, req.user._id]
      // }), req.query).paginating()
      // const posts = await features.query
      //   .sort('-createdAt')
      //   .populate('user likes', 'avatar username fullName followers')
      //   .populate({
      //     path: 'comments',
      //     populate: {
      //       path: 'user likes',
      //       select: '-password',
      //     },
      //   });
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
};

export default postController;
