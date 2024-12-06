import { orderBy, where } from "firebase/firestore";
import { messageCol } from "@/services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetMessages = (conversationId: string) => {
  return useStreamCollection(
    messageCol,
    where("conversationId", "==", conversationId),
    orderBy("sent_at", "asc")
  );
};

export default useGetMessages;
