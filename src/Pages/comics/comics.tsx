import axios from 'axios';
import { useEffect, useState } from 'react';
import { Md5 } from 'ts-md5';
import { CardComic } from '../../Components/card-comic/card-comic';
import { Card, Col, Row } from 'antd';
import './comics.scss'

export function Comics() {

  const [comics, setComics] = useState<any[]>([])

  const apikey = import.meta.env.VITE_API_PUBLIC_KEY
  const privateKey = import.meta.env.VITE_API_KEY
  const timestamp = Math.floor(Date.now() / 1000);
  const hash = Md5.hashStr(timestamp + privateKey + apikey);

  useEffect(() => {
    getComics();
  }, []);

  const getComics = () => {
    const response = axios.get(
      import.meta.env.VITE_API,
      {
        params: {
          ts: timestamp,
          apikey: import.meta.env.VITE_API_PUBLIC_KEY,
          hash: Md5.hashStr(timestamp + import.meta.env.VITE_API_KEY + import.meta.env.VITE_API_PUBLIC_KEY)
        }
      }
    )
      .then(response => setComics(response.data.data.results))
      .catch(err => console.log(err));
    //setComics();
  }


  return (


    <Row gutter={16}>
      {
        comics?.map(comic => {
          return (
            <CardComic key={comic.id} comic={comic} />
          )
        })
      }
    </Row>

  )
}