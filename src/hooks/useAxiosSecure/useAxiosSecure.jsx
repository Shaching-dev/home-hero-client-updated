import axios from "axios";
import { useEffect } from "react";
import useAuth from "../useAuth/useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const reqInteceptors = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      return config;
    });

    const resInteceptors = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInteceptors);
      axiosSecure.interceptors.response.eject(resInteceptors);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
