import PostModel from '../model/postModel';

const postController = {
  createPost: async (req: any, res: any) => {
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
          user: req.user,
        },
      });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
};

export default postController;
