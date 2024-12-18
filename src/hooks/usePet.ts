import { doc, setDoc } from "firebase/firestore";
import { petsCol } from "@/services/firebase";
import { NewPet, Pet } from "@/types/Pet.types";
import { v4 as uuidv4 } from "uuid";
import useAuth from "./useAuth";
import useUploadImage from "./useUploadImage";
import { useState } from "react";

const usePet = () => {
  const { currentUser } = useAuth();
  const { upload } = useUploadImage();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const addPet = async (petData: NewPet, imageFiles: File[]) => {
    if (!currentUser) {
      throw new Error("No user is logged in, can't add pet.");
    }

    const petId = uuidv4();
    const imageUrls: string[] = [];

    try {
      const uploadPromises = imageFiles.map(async (file) => {
        const url = await upload(file);
        if (typeof url === "string") {
          imageUrls.push(url);
        }
      });

      await Promise.all(uploadPromises);

      if (imageUrls.length === 0) {
        throw new Error(
          "You must upload at least one image before adding a pet."
        );
      }

      const newPet: Pet = {
        ...petData,
        _id: petId,
        uid: currentUser.uid,
        imageUrls,
        path: `pets/${currentUser.uid}/`,
        author: {
          uid: currentUser.uid,
          displayName: currentUser.displayName || "",
          email: currentUser.email!,
        },
      };

      await setDoc(doc(petsCol, petId), newPet);
      setGeneralError(null);
      return newPet;
    } catch {
      setGeneralError("Ett fel uppstod, försök igen");
    }
  };

  return {
    addPet,
    generalError,
  };
};

export default usePet;
