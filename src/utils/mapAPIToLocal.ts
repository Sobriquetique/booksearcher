import { BookPreview } from "src/types/BookPreview";
import { Volume } from "src/types/GoogleAPI";
import defaultBookImage from "src/default-book-image.jpg";

/** Мапит тип, пришедший из google books API, в локальный BookPreview */
export function mapAPIToLocal(volume: Volume): BookPreview {
  const {id, volumeInfo} = volume;
  const {authors, categories, imageLinks, title} = volumeInfo;

  return {
    id,
    title: title ? title : "No title",
    category: categories && categories.length > 0 ? categories[0] : "",
    authors: authors ? authors : [],
    imgSrc: imageLinks.thumbnail ? imageLinks.thumbnail : defaultBookImage
  }
}