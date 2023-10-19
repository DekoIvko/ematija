import { useQuery } from "@tanstack/react-query";

export const useFetchQuery = (service: any, key: string) => {
  const { data, isSuccess, isError, error, isLoading, isFetching } = useQuery({
    queryKey: [key],
    queryFn: service,
    select(data: any) {
      return data?.data;
    },
  });

  return { data, isSuccess, isError, error, isLoading, isFetching };
};
