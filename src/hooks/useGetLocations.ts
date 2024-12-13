import useStreamCollection from "./useStreamCollection";
import { locationsCol } from "@/services/firebase";
import { orderBy } from "firebase/firestore";

const useGetLocations = () => {
  const { data, loading, error } = useStreamCollection(
    locationsCol,
    orderBy("name")
  );

  return {
    data: data || [],
    loading,
    error,
  };
};

export default useGetLocations;
