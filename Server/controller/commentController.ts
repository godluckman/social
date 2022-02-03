import { Request, Response } from 'express';
import PostService from '../services/postService';
import CommentService from '../services/commentService';

const commentController = {
  addComment: async (req: Request, res: Response) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;
      const authId = res.getHeader('x-userid')!.toString();
      const post = await PostService.getPost(postId);
      if (!post)
        return res.status(400).json({ msg: 'This post does not exist.' });
      if (reply) {
        const comment = await CommentService.getComment(reply);
        if (!comment)
          return res.status(400).json({ msg: 'This comment does not exist.' });
      }
      const newComment = await CommentService.addComment(
        authId,
        postId,
        reply,
        content,
        tag,
        postUserId
      );
      res.json({ newComment });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  updateComment: async (req: Request, res: Response) => {
    try {
      const authId = res.getHeader('x-userid')!.toString();
      const { content } = req.body;
      await CommentService.updateComment(req.params.id, authId, content);
      res.json({ msg: 'Update Success!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  likeComment: async (req: Request, res: Response) => {
    try {
      const authId = res.getHeader('x-userid')!.toString();
      const comment = await CommentService.checkLike(req.params.id, authId);
      if (comment.length > 0)
        return res.status(400).json({ msg: 'Already liked!' });
      await CommentService.likeComment(req.params.id, authId);
      res.json({ msg: 'Liked Comment!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  unLikeComment: async (req: Request, res: Response) => {
    try {
      const authId = res.getHeader('x-userid')!.toString();
      await CommentService.unLikeComment(req.params.id, authId);
      res.json({ msg: 'UnLiked Comment!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  deleteComment: async (req: Request, res: Response) => {
    try {
      const authId = res.getHeader('x-userid')!.toString();
      await CommentService.deleteComment(req.params.id, authId);
      res.json({ msg: 'Deleted!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
};

export default commentController;
