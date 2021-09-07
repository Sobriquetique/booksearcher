import { BookPreview } from "src/types/BookPreview";
import { GoogleAPI_Volume, GoogleAPI_VolumeFull } from "src/types/GoogleAPI";
import defaultBookImage from "src/default-book-image.jpg";
import { BookFull } from "src/types/BookFull";

/** Мапит тип, пришедший из google books API, в локальный BookPreview */
function volumeToBookPreview(volume: GoogleAPI_Volume): BookPreview {
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

export function mapAPIPreviewsToLocal(volumes: GoogleAPI_Volume[]): BookPreview[] {
  return volumes.map(volume => volumeToBookPreview(volume));
}

export function mapAPIVolumeToLocal(volume: GoogleAPI_VolumeFull): BookFull {
  const {id, volumeInfo} = volume;
  const {title, authors, mainCategory, categories, imageLinks, description} = volumeInfo;
  return {
    id,
    title,
    authors: authors || [],
    categories: categories || [],
    mainCategory,
    description,
    imgSrc: imageLinks.large
  }
}