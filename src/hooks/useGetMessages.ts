import { messageCol } from "@/services/firebase";
import useStreamCollection from "./useStreamCollection";
import { orderBy } from "firebase/firestore";

const useGetMessages = () => {
  return useStreamCollection(messageCol, orderBy("sent_at", "asc"));
};

export default useGetMessages;
