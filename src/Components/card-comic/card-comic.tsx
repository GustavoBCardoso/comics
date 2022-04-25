import { Comics } from "../../Pages/comics/comics"
import './card-comic.scss'
import { Button, Card, Col, Modal } from 'antd';
import { useState } from "react";

export function CardComic(props: { comic: any }) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const comic = props.comic;
  const { Meta } = Card;
  const showDetails = (idComic: number) => {
    console.log(idComic)
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

  return (<>
    <Col xs={16} xl={8} lg={12}>
      <Card
        style={{ width: 300, marginBottom: 60 }}
        cover={<img className="imgCard" alt="example" src={comic.thumbnail.path + "/portrait_uncanny." + comic.thumbnail.extension} />}
        actions={[
          <a className="btDetails cta-btn cta-btn--red cta-btn--solid" onClick={showModal}>
            <div className="innerFill">
              Detalhes
            </div>
          </a>
        ]}
      >
        <Meta title={comic.title} />
      </Card>
    </Col>

    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
    </Modal>
  </>)
}