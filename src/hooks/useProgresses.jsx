import { progressesFetcher } from "src/firebase/fetcher";
import useSWRImmutable from "swr/immutable";

export const useProgresses = () => {
  const { data, error } = useSWRImmutable("progresses", progressesFetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
