import { orderBy } from "firebase/firestore";
import { petsCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetPets = () => {
  const { data, loading, error } = useStreamCollection(
    petsCol,
    orderBy("name")
  );
  return {
    data: data || [],
    loading,
    error,
  };
};

export default useGetPets;
