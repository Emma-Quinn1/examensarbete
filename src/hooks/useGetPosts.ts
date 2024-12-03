import { orderBy } from "firebase/firestore";
import { blogCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetPets = () => {
  return useStreamCollection(blogCol, orderBy("created_at", "desc"));
};

export default useGetPets;
