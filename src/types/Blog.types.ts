import { FieldValue, Timestamp } from "firebase/firestore";

export type Post = {
  _id: string;
  title: string;
  text: string;
  imageUrls: string[];
  author: {
    uid: string;
    displayName: string;
    email?: string;
  };
  created_at: Timestamp | FieldValue;
  path: string;
};

export type NewPost = Omit<Post, "_id" | "imageUrls" | "path">;
