import { createContext } from 'react';
import { Comic } from '../../Types/Comics'

export type ComicContextType = {
  comics: Comic[] | null;
  comicId: Comic | null;
  listSelected: number[] | null;
  getComics: (limit: number, offset: number) => void;
  getTitle: (limit: number, offset: number, title: string) => void;
  getDetails: (id: number) => void;
  handleSelect: (id: number) => void;
  isLoading: boolean;
  error: Error | null;
}

export const ComicContext = createContext<ComicContextType>(null!);
