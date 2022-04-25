import { createContext, useState } from "react";
import { Comic } from "../../Types/Comics";
import axios, { AxiosRequestConfig } from 'axios';
import { ComicContext } from "./ComicContext";
import { Md5 } from "ts-md5";

export function ComicProvider({ children }: { children: JSX.Element }) {

  const APIKEY = import.meta.env.VITE_API_PUBLIC_KEY
  const APIPRIVATEKEY = import.meta.env.VITE_API_KEY
  const TS = Math.floor(Date.now() / 1000);
  const HASH = Md5.hashStr(TS + APIPRIVATEKEY + APIKEY);
  const API_URL = import.meta.env.VITE_API;

  const [comics, setComics] = useState<Comic[] | null>(null)
  const [comicId, setComicId] = useState<Comic | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null);

  const getComics = async (limit: number, offset: number) => {
    await axios.get(API_URL, {
      params: {
        orderBy: "title",
        limit: limit,
        offset: offset,
        ts: TS,
        apikey: APIKEY,
        hash: HASH
      }
    })
      .then(response => {
        if (!comics) {
          setComics(response.data.data.results);
        } else {
          let data: Comic[] = comics;
          const res: Comic[] = response.data.data.results;
          res.forEach(function (item, i) {
            data.push(item)
          })
          setComics(data);
        }
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false);
      });

  }

  const getById = async (id: number) => {
    await axios.get(`${API_URL}/id`, {
      params: {
        ts: TS,
        apikey: APIKEY,
        hash: HASH
      }
    })
      .then(response => {
        setComicId(response.data);
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const getTitle = async (limit: number, offset: number, title: string) => {
    await axios.get(API_URL, {
      params: {
        title: title,
        orderBy: "title",
        limit: limit,
        offset: offset,
        ts: TS,
        apikey: APIKEY,
        hash: HASH
      }
    })
      .then(response => {
        setComics(response.data.data.results);
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false);
      });

  }

  return (
    <ComicContext.Provider value={{ comics, comicId, getTitle, getComics, getById, isLoading, error }}>
      {children}
    </ComicContext.Provider>
  )
}