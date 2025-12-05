import { useState, useEffect } from "react";
const useFetch = (apiMethod, data) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [serverError, setServerError] = useState("");
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await apiMethod(data);
      setApiData(result);
      setIsLoading(false);
    } catch (error) {
      setServerError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, apiData, serverError };
};

export default useFetch;
