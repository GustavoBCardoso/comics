export type MarvelComicsResponse = {
  attributionHTML: string;
  attributionText: string;
  code: number;
  copyright: string;
  data: MarvelComicsResponsData[]
  etag: string;
  status: string;
}

export type MarvelComicsResponsData = {
  count: number;
  limit: number;
  offset: number;
  results: any[];
  total: number;
}

export type Comic = {
  id: number;
  thumbnail: any[];
}