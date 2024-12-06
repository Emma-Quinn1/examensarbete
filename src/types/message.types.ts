import { FieldValue, Timestamp } from "firebase/firestore";

export type Message = {
  id: string;
  senderId: string;
  recipientId: string;
  message: string;
  sent_at: Timestamp | FieldValue;
  conversationId: string;
};

export type NewMessage = Omit<Message, "id" | "sent_at" | "senderId">;

export type Conversation = {
  id: string;
  participants: string[];
  lastMessage: string;
  updated_at: Timestamp;
};
