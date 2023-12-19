import { useQuery } from "@tanstack/react-query";

export const useFetchQuery = (
  service: Function,
  key: string,
  enabled = true
) => {
  return useQuery({
    queryKey: [key],
    enabled: Boolean(enabled),
    queryFn: async () => {
      return await service();
    },
  });
};
