import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Md5 } from "ts-md5";


const APIKEY = import.meta.env.VITE_API_PUBLIC_KEY
const APIPRIVATEKEY = import.meta.env.VITE_API_KEY
const TS = Math.floor(Date.now() / 1000);
const HASH = Md5.hashStr(TS + APIPRIVATEKEY + APIKEY);


const api = axios.create({
  baseURL: import.meta.env.VITE_API_PUBLIC_KEY
});

export function useApi<T = unknown>(options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    //console.log(URL_API2)
    api.get('', options)
      .then(response => {
        let data = response.data;
        setData(data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsFetching(false);
      })
  }, []);

  return { data, error, isFetching }

}