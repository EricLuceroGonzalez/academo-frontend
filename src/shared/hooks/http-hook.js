import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //   useRef store the information as reference, that, not change or be initialize on each render:
  const activeHttpRequest = useRef([]);

  //   the REQUEST logic in here (useCallback to prevent inneficient or infinite loops):
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      //   to abort DOM request & cancel the ongoing http request
      const httpAbortCtrll = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrll);
      // make the fetch() REQUEST and handle response:
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal,
        });

        const responseData = await response.json();

        // Remove all the abort controllers we pushed
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );
        // Check if response on error is not for 400's or 500's
        if (!response.ok) {         
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        //   RETURN the response to the hook user:
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // Will render when hook mount/unmount - CLEAN UP
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  //   Return all the things user of the hook must use:
  return { isLoading, error, sendRequest, clearError };
};
