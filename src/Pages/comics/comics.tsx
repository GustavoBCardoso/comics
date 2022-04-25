import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Md5 } from 'ts-md5';
import { CardComic } from '../../Components/card-comic/card-comic';
import { Card, Col, Row, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import './comics.scss'
import { Comic } from '../../Types/Comics';
import { ComicContext } from '../../Context/Comic/ComicContext';

const { Search } = Input;

export function Comics() {
  const { comics, getComics, getTitle, isLoading } = useContext(ComicContext)
  const [limit, setLimit] = useState<number>(3);
  const [page, setPage] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    getComics(limit, offset);
    setOffset((page + 1) * limit);
    setPage(page + 1);
  }, []);

  /* const getComics = () => {
    axios.get(
      import.meta.env.VITE_API,
      {
        params: {
          orderBy: "title",
          limit: limit,
          offset: offset,
          ts: timestamp,
          apikey: import.meta.env.VITE_API_PUBLIC_KEY,
          hash: Md5.hashStr(timestamp + import.meta.env.VITE_API_KEY + import.meta.env.VITE_API_PUBLIC_KEY)
        }
      }
    )
      .then(response => {
        console.log(response.data);
        //var comics: Comic[] = comics;
        var data: Comic[] = comics;
        data.push(...response.data.data.results)
        //data.push(response.data.data.results);

        //setComics({ ...comics, data });

        setComics(data);
      })
      .catch(err => console.log(err));
    //setComics();
  } */

  const loadMore = async () => {
    if (searchText != '' && searchText != null) {
      await getTitle(limit, offset, searchText);
    } else {
      await getComics(limit, offset);
    }
    setOffset((page + 1) * limit);
    setPage(page + 1);
  }

  const searchTitle = () => {
    console.log(searchText)
    /* setOffset(3);
    setPage(0);
    if (searchText != '' && searchText != null) {
      getTitle(limit, offset, searchText);
    } else {
      getComics(limit, offset);
    } */
  }




  return (<>

    <div className="container site-card-wrapper" id="container">
      <Row justify='center'>
        <div className="search">


          <Search
            placeholder="Buscar pelo titulo"
            className="search-field"
            allowClear
            onChange={() => searchTitle()}
            onSearch={setSearchText}
            enterButton
          />
        </div>
      </Row>
      <Row className="row-cards">
        {
          comics?.map((comic, index) => {
            return (
              <CardComic key={index} comic={comic} />
            )
          })
        }
      </Row>
      <Row justify='center'>
        <a className="btDetails cta-btn cta-btn--red cta-btn--solid" onClick={() => loadMore()}>
          <div className="innerFill">
            Carregar Mais {page}
          </div>
        </a>
      </Row>
    </div>


  </>)
}