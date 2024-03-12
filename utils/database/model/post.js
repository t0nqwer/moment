import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: { type: Array, default: [] },
  comments: { type: Array, default: [] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tag: Array,
});

const Post = models.Post || model("Post", postSchema);

export default Post;
