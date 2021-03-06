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
  title: string;
  thumbnail: Thumbnail;
  description: string;
  urls: Urls[];
  select: boolean | false;
}

export type Urls = {
  type: string;
  url: string;
}

export type Thumbnail = {
  path: string;
  extension: string;
}