import { useQuery } from "@tanstack/react-query";

export const useFetchQuery = (service: Function, key: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      return await service();
    },
  });
};
