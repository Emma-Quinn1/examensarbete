import useStreamCollection from "./useStreamCollection";
import { animalTypeCol } from "@/services/firebase";

const useGetType = () => {
  return useStreamCollection(animalTypeCol);
};

export default useGetType;
