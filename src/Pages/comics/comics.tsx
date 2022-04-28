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
  const [typeLoad, setTypeLoad] = useState<boolean>(false)

  const [updatePaginate, setUpdatePaginate] = useState<boolean>(false);

  /*   useEffect(() => {
      getComics(limit, offset);
      setOffset((page + 1) * limit);
      setPage(page + 1);
    }, []); */

  useEffect(() => {
    if (searchText != '' && searchText != null) {
      if (typeLoad) {
        setOffset((page + 1) * limit);
        setPage(page + 1);
        getTitle(limit, (((page + 1) + 1) * limit), searchText);
      } else {
        setTypeLoad(true);
        setOffset(0);
        setPage(0);
        getTitle(limit, 0, searchText);
      }

    } else {
      if (typeLoad) {

        setTypeLoad(false);
        setOffset(0);
        setPage(0);
        getComics(limit, 0);
      } else {
        setOffset((page + 1) * limit);
        setPage(page + 1);
        getComics(limit, (((page + 1) + 1) * limit));
      }
    }
  }, [searchText]);



  const updatePageOffset = (action: boolean) => {
    if (action) {
      setOffset((page + 1) * limit);
      setPage(page + 1);
    } else {
      setOffset(0);
      setPage(0);
    }

  }




  const loadMore = async () => {
    if (typeLoad) {
      setOffset((page + 1) * limit);
      setPage(page + 1);
      await getTitle(limit, (((page + 1) + 1) * limit), searchText);
    } else {
      setOffset((page + 1) * limit);
      setPage(page + 1);
      await getComics(limit, (((page + 1) + 1) * limit));
    }
    //setOffset((page + 1) * limit);
    //setPage(page + 1);
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