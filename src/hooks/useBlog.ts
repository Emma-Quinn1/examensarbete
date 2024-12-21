import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { blogCol } from "@/services/firebase";
import { v4 as uuidv4 } from "uuid";
import useAuth from "./useAuth";
import useUploadImage from "./useUploadImage";
import { NewPost, Post } from "@/types/Blog.types";
import { useState } from "react";

const useBlog = () => {
  const { currentUser } = useAuth();
  const { upload } = useUploadImage();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const addPost = async (blogData: NewPost, imageFiles: File[]) => {
    if (!currentUser) {
      throw new Error("No user is logged in, can't create post.");
    }

    const blogId = uuidv4();
    const imageUrls: string[] = [];

    try {
      const uploadPromises = imageFiles.map(async (file) => {
        const url = await upload(file);
        if (typeof url === "string") {
          imageUrls.push(url);
        }
      });

      await Promise.all(uploadPromises);

      const newPost: Post = {
        ...blogData,
        _id: blogId,
        imageUrls,
        path: `posts/${currentUser.uid}/`,
        author: {
          uid: currentUser.uid,
          displayName: currentUser.displayName || "",
        },
        created_at: serverTimestamp(),
      };

      await setDoc(doc(blogCol, blogId), newPost);
      setGeneralError(null);

      return newPost;
    } catch {
      setGeneralError("Kunde inte skapa inlägg");
    }
  };

  return {
    addPost,
    generalError,
  };
};

export default useBlog;
