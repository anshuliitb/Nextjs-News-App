import mongoose, { Schema } from "mongoose";

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model("News", NewsSchema);
