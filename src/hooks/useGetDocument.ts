import {
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { usersCol } from "@/services/firebase";

const useGetDocument = <T>(
  colRef: CollectionReference<T>,
  documentId: string | undefined
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(
    async (documentId: string) => {
      setError(false);
      setLoading(true);
      setData(null);

      const docRef = doc(colRef, documentId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        setData(null);
        setError(true);
        setLoading(false);
        return;
      }

      const userQueryRef = query(
        usersCol,
        where("uid", "==", docSnapshot.get("author.uid"))
      );
      const userSnapshot = await getDocs(userQueryRef);

      const data = {
        ...docSnapshot.data(),
        _id: docSnapshot.id,
        author: {
          email: userSnapshot.docs[0].data().email,
        },
      };

      setData(data);
      setLoading(false);
    },
    [colRef]
  );

  useEffect(() => {
    if (!documentId) {
      return;
    }

    getData(documentId);
  }, [documentId, getData]);

  return {
    data,
    error,
    getData,
    loading,
  };
};

export default useGetDocument;
