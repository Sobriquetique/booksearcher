export interface BookFull {
  id: string;
  imgSrc: string;
  title: string;
  authors: string[];
  categories: string[];
  mainCategory?: string;
  description?: string;
}