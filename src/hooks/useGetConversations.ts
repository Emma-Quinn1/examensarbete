import { useState, useEffect, useCallback } from "react";
import { getDocs, limit, query, where } from "firebase/firestore";
import { conversationCol, usersCol } from "@/services/firebase";
import useStreamCollection from "@/hooks/useStreamCollection";
import useAuth from "@/hooks/useAuth";

const useConversations = () => {
  const [users, setUsers] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;

  const { data: conversations, loading: loadingConversations } =
    useStreamCollection(conversationCol);

  const fetchUserName = useCallback(
    async (userId: string) => {
      try {
        if (users[userId]) return users[userId];
        setGeneralError(null);
        const userQuery = query(usersCol, where("uid", "==", userId), limit(1));
        const userDocs = await getDocs(userQuery);

        if (!userDocs.empty) {
          const userData = userDocs.docs[0].data();
          const displayName = userData.name || userData.email || "Okänt namn";
          setUsers((prev) => ({ ...prev, [userId]: displayName }));
          return displayName;
        }
        return "Okänt namn";
      } catch {
        setGeneralError("Ett fel uppstod, försök igen");
      }
    },
    [users]
  );

  useEffect(() => {
    if (!conversations || !currentUserId) return;

    const userConversations = conversations.filter((conversation) =>
      conversation.participants.includes(currentUserId)
    );

    userConversations.forEach((conversation) => {
      const recipientId = conversation.participants.find(
        (id) => id !== currentUserId
      );

      if (recipientId && !users[recipientId]) {
        fetchUserName(recipientId);
      }
    });
  }, [conversations, currentUserId, fetchUserName, users]);

  return { conversations, loadingConversations, users, generalError };
};

export default useConversations;
