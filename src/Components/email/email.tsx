import { useContext } from "react";
import { ComicContext } from "../../Context/Comic/ComicContext";
import { Comic } from "../../Types/Comics";
import './card-comic.scss'

export function Email() {
  const { listSelected, comics } = useContext(ComicContext)
}