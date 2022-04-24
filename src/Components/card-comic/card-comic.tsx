import { Comics } from "../../Pages/comics/comics"
import './card-comic.scss'
import { Button, Card, Col } from 'antd';
export function CardComic(props: { comic: any }) {

  const comic = props.comic;
  const { Meta } = Card;
  const showDetails = (idComic: number) => {
    console.log(idComic)
  }

  return (
    <Col span={8}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={comic.thumbnail.path + "." + comic.thumbnail.extension} />}
      >
        <Meta title={comic.title} description="www.instagram.com" />
      </Card>
    </Col>
  )
}