import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { conversationCol, messageCol } from "@/services/firebase";
import { v4 as uuidv4 } from "uuid";
import useAuth from "./useAuth";
import { Message, NewMessage } from "@/types/message.types";

const useMessage = () => {
  const { currentUser } = useAuth();

  const generateConversationId = (id1: string, id2: string): string => {
    return [id1, id2].sort().join("_");
  };

  const addMessage = async (messageData: NewMessage) => {
    if (!currentUser) {
      throw new Error("No user is logged in, can't send message.");
    }

    if (!messageData.recipientId) {
      throw new Error("Recipient ID is required.");
    }

    if (currentUser.uid === messageData.recipientId) {
      throw new Error("You cannot send a message to yourself.");
    }

    const conversationId = generateConversationId(
      currentUser.uid,
      messageData.recipientId
    );

    const messageId = uuidv4();

    try {
      const newMessage: Message = {
        ...messageData,
        _id: messageId,
        senderId: currentUser.uid,
        sent_at: serverTimestamp(),
        conversationId,
      };

      await setDoc(doc(messageCol, messageId), newMessage);

      const conversationRef = doc(conversationCol, conversationId);
      const conversationDoc = await getDoc(conversationRef);

      if (conversationDoc.exists()) {
        await updateDoc(conversationRef, {
          lastMessage: messageData.message,
          updated_at: serverTimestamp(),
        });
      } else {
        await setDoc(conversationRef, {
          _id: conversationId,
          participants: [currentUser.uid, messageData.recipientId],
          lastMessage: messageData.message,
          updated_at: serverTimestamp(),
        });
      }

      return newMessage;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred.";
      throw new Error(`Failed to send message: ${errorMessage}`);
    }
  };

  return {
    addMessage,
    generateConversationId,
  };
};

export default useMessage;
