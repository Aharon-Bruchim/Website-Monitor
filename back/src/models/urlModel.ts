import mongoose, { ObjectId, Schema } from "mongoose";

export interface IUrl extends mongoose.Document {
  _id: ObjectId;
  url: string;
  name: string;
  isAlive?: boolean;
  last_checked?: string;
  created_at: string;
  check_interval?: number;
}

export const UrlSchema = new Schema<IUrl>({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isAlive: {
    type: Boolean,
    required: false,
  },
  last_checked: {
    type: String,
  },
  created_at: {
    type: String,
    required: true,
  },
  check_interval: {
    type: Number,
    required: false,
  },
});

export default mongoose.model<IUrl>("Url", UrlSchema);
