import { messageCol } from "@/services/firebase";
import useStreamCollection from "./useStreamCollection";
import { orderBy } from "firebase/firestore";

const useGetMessages = () => {
  const { data, loading, error } = useStreamCollection(
    messageCol,
    orderBy("sent_at", "asc")
  );

  return {
    data: data || [],
    loading,
    error,
  };
};

export default useGetMessages;
