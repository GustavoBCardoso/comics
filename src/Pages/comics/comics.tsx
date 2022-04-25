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

  const [updatePaginate, setUpdatePaginate] = useState<boolean>(false);

  useEffect(() => {
    getComics(limit, offset);
    setOffset((page + 1) * limit);
    setPage(page + 1);
  }, []);

  useEffect(() => {
    //searchTitle();
    setOffset(0);
    setPage(0);
    if (searchText != '' && searchText != null) {
      getTitle(limit, offset, searchText);
    } else {

      getComics(limit, offset);
    }
    setOffset((page + 1) * limit);
    setPage(page + 1);
  }, [searchText]);

  /* useEffect(() => {
    loadMore();
  }, [offset]); */

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
    setOffset(0);
    setPage(0);
    if (searchText != '' && searchText != null) {
      getTitle(limit, offset, searchText);
    } else {
      getComics(limit, offset);
    }
  }

  const setValue = (value: string) => {
    setSearchText(value);
  }

  const sendEmail = () => {

  }


  return (<>

    <div className="container site-card-wrapper" id="container">
      <Row justify='center'>
        <div className="search">
          <Search
            placeholder="Buscar pelo titulo"
            className="search-field"
            allowClear
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
            Carregar Mais
          </div>
        </a>
      </Row>

      {/* <Row justify='center'>
        <a className="btDetails cta-btn cta-btn--red cta-btn--solid" onClick={() => sendEmail()}>
          <div className="innerFill">
            Enviar Email
          </div>
        </a>
      </Row> */}
    </div>
  </>)
}