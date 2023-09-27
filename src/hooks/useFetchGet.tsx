import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchGet = (url: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<Error>();
  const [apiData, setApiData] = useState<any>();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { status, data } = await axios.get(url);
        if (status === 200) {
          setApiData(data);
        } else {
          setApiError(data?.message);
        }
      } catch (error: any) {
        setApiError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { loading, apiData, apiError };
};

// this is for exercise propers HOC
