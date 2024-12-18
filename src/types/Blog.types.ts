import { FieldValue, Timestamp } from "firebase/firestore";

export type Post = {
  _id: string;
  title: string;
  text: string;
  imageUrls: string[];
  author: string;
  created_at: Timestamp | FieldValue;
  path: string;
};

export type NewPost = Omit<Post, "_id" | "imageUrls" | "path">;
