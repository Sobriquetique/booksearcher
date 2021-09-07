import { apiKey } from "src/_CONSTANTS/general";

const baseApiUrl = "https://www.googleapis.com/books/v1/volumes/";

export function getFetchFullVolumeResponse(id: string): Promise<Response> {
  const requestUrl = `${baseApiUrl}${id}?key=${apiKey}`;
  return fetch(requestUrl);
}