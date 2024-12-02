import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadsCol, storage } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import useAuth from "./useAuth";

const useUploadImage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isUploading, setIsUploading] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const { currentUser } = useAuth();
  if (!currentUser) {
    throw new Error("Only authenticated users may upload using this hook");
  }

  const upload = async (image: File) => {
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsUploading(null);
    setProgress(null);

    try {
      const uuid = uuidv4();
      const ext = image.name.substring(image.name.lastIndexOf(".") + 1);

      const storageFilename = `${image.name}_${uuid}.${ext}`;

      const storageRef = ref(
        storage,
        `pets/${currentUser.uid}/${storageFilename}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, resolve);
      });

      const url = await getDownloadURL(storageRef);
      const docRef = doc(uploadsCol);

      await setDoc(docRef, {
        _id: docRef.id,
        name: image.name,
        path: storageRef.fullPath,
        size: image.size,
        type: image.type,
        uid: currentUser.uid,
        url,
      });

      setIsError(false);
      setIsSuccess(true);
      setProgress(null);

      if (!url) {
        throw new Error("Failed to get download URL for uploaded file.");
      }

      return url;
    } catch (err) {
      setIsError(true);
      setIsSuccess(false);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("unknown");
      }
    }
    setIsUploading(false);
  };
  return {
    upload,
    error,
    isError,
    isSuccess,
    isUploading,
    progress,
  };
};

export default useUploadImage;
