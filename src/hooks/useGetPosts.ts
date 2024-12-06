import { orderBy } from "firebase/firestore";
import { blogCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetPost = () => {
  const { data, loading, error } = useStreamCollection(
    blogCol,
    orderBy("created_at", "desc")
  );

  return {
    data: data || [],
    loading,
    error,
  };
};

export default useGetPost;
