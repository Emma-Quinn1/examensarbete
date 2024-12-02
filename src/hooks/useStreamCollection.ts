import {
  CollectionReference,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = <T>(
  colRef: CollectionReference<T>,
  ...queryConstraints: QueryConstraint[]
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[] | null>(null);

  useEffect(() => {
    const queryRef = query(colRef, ...queryConstraints);

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          _id: doc.id,
        };
      });

      setData(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [colRef, queryConstraints]);

  return {
    data,
    loading,
  };
};

export default useStreamCollection;
