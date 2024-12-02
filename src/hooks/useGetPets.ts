import { orderBy } from "firebase/firestore";
import { petsCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetPets = () => {
  return useStreamCollection(petsCol, orderBy("name"));
};

export default useGetPets;
