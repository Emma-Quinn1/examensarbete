import useStreamCollection from "./useStreamCollection";
import { animalTypeCol } from "@/services/firebase";

const useGetType = () => {
  const { data, loading, error } = useStreamCollection(animalTypeCol);
  return {
    data: data || [],
    loading,
    error,
  };
};

export default useGetType;
