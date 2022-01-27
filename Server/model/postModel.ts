import pkg from 'mongoose';

const { Schema, model, Types } = pkg;

const postSchema = new Schema(
  {
    content: String,
    image: String,
    likes: [{ type: Types.ObjectId, ref: 'user' }],
    comments: [{ type: Types.ObjectId, ref: 'comment' }],
    user: { type: Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
  }
);

export default model('post', postSchema, 'post');
