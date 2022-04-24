import { Comics } from "../../Pages/comics/comics"
import './card-comic.scss'
export function CardComic(props: { comic: any }) {

  const comic = props.comic;
  const showDetails = (idComic: number) => {
    console.log(idComic)
  }

  return (
    <div className="card-comic">
      <img id="i1" className="card-img-top img-thumbnail" src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{comic.title}</h5>
        <a href="#" onClick={(e) => showDetails(comic.id)} className="">Stories</a>
      </div>
    </div>
  )
}