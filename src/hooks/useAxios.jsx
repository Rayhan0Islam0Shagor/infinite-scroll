import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    setResponse([]);
  }, [requestConfig.pageNumber]);

  useEffect(() => {
    //let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setError("");
        setLoading(true);
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });

        setResponse((prev) => {
          return [...new Set([...prev, ...res.data.map((b) => b.title)])];
        });

        setHasMore(res.data.length > 0);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // call the function
    fetchData();

    // useEffect cleanup function
    return () => controller.abort();

    // eslint-disable-next-line
  }, [reload, requestConfig.params._page, requestConfig.params.q]);

  return [response, error, loading, refetch, hasMore];
};

export default useAxios;
