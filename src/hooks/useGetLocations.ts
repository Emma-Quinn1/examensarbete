import useStreamCollection from "./useStreamCollection";
import { locationsCol } from "@/services/firebase";

const useGetBreed = () => {
  return useStreamCollection(locationsCol);
};

export default useGetBreed;
