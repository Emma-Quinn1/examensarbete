import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { blogCol } from "@/services/firebase";
import { v4 as uuidv4 } from "uuid";
import useAuth from "./useAuth";
import useUploadImage from "./useUploadImage";
import { NewPost, Post } from "@/types/blog.types";

const useBlog = () => {
  const { currentUser } = useAuth();
  const { upload } = useUploadImage();

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
        author: currentUser.displayName ?? currentUser.email!,
        created_at: serverTimestamp(),
      };

      await setDoc(doc(blogCol, blogId), newPost);

      return newPost;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred.";
      throw new Error(`Failed to create post: ${errorMessage}`);
    }
  };

  return {
    addPost,
  };
};

export default useBlog;
