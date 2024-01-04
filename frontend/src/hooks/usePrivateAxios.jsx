/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import customAxios from "../api/axios";
import { useUserContext } from "../context/UserContext";
import { returnNewAccessToken } from "../utils/returnNewAccessToken";

const usePrivateAxios = () => {
  const { user, setUserToken } = useUserContext();

  useEffect(() => {
    const requestInterceptor = customAxios.interceptors.request.use(
      (config) => {
        if (!config.headers.authorization) {
          config.headers.authorization = user.token
            ? `Bearer ${user.token}`
            : undefined;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = customAxios.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevReq = err?.config;
        try {
          if (err?.response?.status === 403 && !prevReq?.sent) {
            prevReq.sent = true;
            const newAccessToken = await returnNewAccessToken();
            setUserToken(newAccessToken);
            prevReq.headers.authorization = `Bearer ${newAccessToken}`;
            return customAxios(prevReq);
          }
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
      }
    );

    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return { customAxios };
};

export default usePrivateAxios;
