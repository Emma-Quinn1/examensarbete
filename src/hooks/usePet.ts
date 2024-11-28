import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { petsCol, storage } from "@/services/firebase";
import { NewPet, Pet } from "@/types/pet.types";
import { v4 as uuidv4 } from "uuid";
import useAuth from "./useAuth";

const usePet = () => {
  const { currentUser } = useAuth();
  const addPet = async (petData: NewPet, imageFile: File) => {
    if (!currentUser) {
      throw new Error("No user is logged in, can´t add pet");
    }

    try {
      const petId = uuidv4();
      const storageRef = ref(
        storage,
        `pets/${currentUser.uid}/${petId}_${imageFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      await uploadTask;
      const imageUrl = await getDownloadURL(storageRef);

      const newPet: Pet = {
        ...petData,
        _id: petId,
        uid: currentUser.uid,
        imageUrl,
        path: storageRef.fullPath,
      };
      await setDoc(doc(petsCol, petId), newPet);
      return newPet;
    } catch (error) {
      throw error;
    }
  };

  return {
    addPet,
  };
};

export default usePet;
