import useStreamCollection from "./useStreamCollection";
import { breedsCol } from "@/services/firebase";

const useGetBreed = () => {
  return useStreamCollection(breedsCol);
};

export default useGetBreed;
