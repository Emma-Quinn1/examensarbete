import { useState, useEffect } from "react";
import { getDocs, limit, query, where } from "firebase/firestore";
import { conversationCol, usersCol } from "@/services/firebase";
import useStreamCollection from "@/hooks/useStreamCollection";
import useAuth from "@/hooks/useAuth";

const useConversations = () => {
  const [users, setUsers] = useState<{ [key: string]: string }>({});
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;

  const { data: conversations, loading: loadingConversations } =
    useStreamCollection(conversationCol);

  const fetchUserName = async (userId: string) => {
    if (users[userId]) return users[userId];
    const userQuery = query(usersCol, where("uid", "==", userId), limit(1));
    const userDocs = await getDocs(userQuery);

    if (!userDocs.empty) {
      const userData = userDocs.docs[0].data();
      const displayName = userData.name || userData.email || "Okänt namn";
      setUsers((prev) => ({ ...prev, [userId]: displayName }));
      return displayName;
    }
    return "Okänt namn";
  };

  useEffect(() => {
    if (!conversations) return;

    conversations.forEach((conversation) => {
      const recipientId = conversation.participants.find(
        (id) => id !== currentUserId
      );

      if (recipientId && !users[recipientId]) {
        fetchUserName(recipientId);
      }
    });
  }, [conversations, currentUserId]);

  return { conversations, loadingConversations, users };
};

export default useConversations;
