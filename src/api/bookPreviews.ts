import { CategoryName } from "src/types/Category";
import { OrderByName } from "src/types/OrderByName";
import { basePreviewsUrl, DEFAULT_MAX_RESULTS } from "src/_CONSTANTS/general";
import { LOCAL_ORDER_NAMES_TO_API_MAP } from "src/_CONSTANTS/searchOptions";

interface Options_getBookVolumesResponse {
  query: string;
  category: CategoryName;
  order: OrderByName;
  startIndex?: number;
  maxResults?: number;
}

export function getBookVolumesResponse({query, category, order, startIndex, maxResults}: Options_getBookVolumesResponse): Promise<Response> {
  let normalizedQuery: string = query.trim().replace(/\s+/g, " ").split(" ").join("+");
  
  //Можно не указывать в запросе категорию, если хотим книги из всех категорий
  if (category !== "All") {
    normalizedQuery += "+subject:" + category.toLowerCase();
  }

  const queryParams: string[] = [
    "startIndex=" + (startIndex ? startIndex : "0"),

    "maxResults=" + (maxResults ? maxResults : DEFAULT_MAX_RESULTS),

    "orderBy=" + LOCAL_ORDER_NAMES_TO_API_MAP[order],
  ]

  const paramsString: string = queryParams.reduce<string>((result: string, paramStr: string, i: number) => result + "&" + paramStr, "" as string)

  const finalRequestUrl = `${basePreviewsUrl}volumes?q=${normalizedQuery}${paramsString}`;

  return fetch(finalRequestUrl);
}