import { Comics } from "../../Pages/comics/comics"
import './card-comic.scss'
import { Button, Card, Col, Modal, Badge } from 'antd';
import { useContext, useEffect, useState } from "react";
import { ComicContext } from "../../Context/Comic/ComicContext";
import { Comic } from "../../Types/Comics";

export function CardComic(props: { comic: Comic }) {
  const { handleSelect, listSelected, getDetails, comicId } = useContext(ComicContext)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [updateSelect, setUpdateSelect] = useState<boolean>(false);
  const [updateSelectId, setUpdateSelectId] = useState<number | null>(null);

  const comic = props.comic;
  const { Meta } = Card;

  useEffect(() => {
    if (updateSelectId) {
      handleSelect(updateSelectId)
      setUpdateSelectId(null);
    }
  }, [updateSelectId]);

  const showDetails = () => {
    const urls = comic.urls
    console.log(comic)
    //getDetails(urlDetails)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectComic = (id: number) => {
    setUpdateSelectId(id)
    //handleSelect(id)
  }

  const findSelect = (id: number): boolean => {
    if (listSelected) {
      return listSelected.includes(comic.id)
    }
    return false;
  }

  return (<>
    <Col xs={16} xl={8} lg={12} style={{ marginBottom: 60 }}>
      <Card
        onClick={() => selectComic(comic.id)}
        style={{ width: 300 }}
        cover={
          findSelect(comic.id) ? (
            <Badge.Ribbon color="green" text="Selecionado">
              <img className="imgCard" alt="example" src={comic.thumbnail.path + "/portrait_uncanny." + comic.thumbnail.extension} />
            </Badge.Ribbon>)
            : (
              <img className="imgCard" alt="example" src={comic.thumbnail.path + "/portrait_uncanny." + comic.thumbnail.extension} />
            )
        }
      >
        <Meta title={comic.title} />
      </Card>
      <div className="cardDetails" style={{ marginTop: 10 }}>
        <a className="btDetails cta-btn cta-btn--red cta-btn--solid" onClick={showModal}>
          <div className="innerFill">
            Detalhes
          </div>
        </a>
      </div>
    </Col>

    <Modal
      title={comic.title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Fechar
        </Button>
      ]}
    >
      <div className="featured-item-info-wrap">
        <div className="featured-item-info">
          <img className="imgCard" alt="example" src={comic.thumbnail.path + "/portrait_uncanny." + comic.thumbnail.extension} />
        </div>
        <div className="featured-item-text">
          <div className="featured-item-desc">
            {comic.description}
          </div>
        </div>
      </div>

    </Modal>
  </>)
}