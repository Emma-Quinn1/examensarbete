import { orderBy } from "firebase/firestore";
import useStreamCollection from "./useStreamCollection";
import { breedsCol } from "@/services/firebase";

const useGetBreed = () => {
  const { data, loading, error } = useStreamCollection(
    breedsCol,
    orderBy("name")
  );

  return {
    data: data || [],
    loading,
    error,
  };
};

export default useGetBreed;
