import { baseBookUrl } from "src/_CONSTANTS/general";
export function getFetchFullVolumeResponse(id: string): Promise<Response> {
  const requestUrl = `${baseBookUrl}${id}`;
  return fetch(requestUrl);
}