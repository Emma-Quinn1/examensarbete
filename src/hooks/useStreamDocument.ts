import { CollectionReference, doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

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

      const data = {
        ...docSnapshot.data(),
        _id: docSnapshot.id,
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
