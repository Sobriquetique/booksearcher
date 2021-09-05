import { CategoryName } from "src/types/Category";
import { OrderByName } from "src/types/OrderByName";
import { LOCAL_ORDER_NAMES_TO_API_MAP } from "src/_CONSTANTS/searchOptions";

export const endpoint = "https://www.googleapis.com/books/v1/volumes";
export const apiKey = "AIzaSyAGf2BYSuVZJKguW5B_sEUBK3HGkDjqqNs";

export function getBookVolumesResponse(query: string, category: CategoryName, order: OrderByName): Promise<Response> {
  console.log("fetch attempt");
  const normalizedQuery = query.trim().replace(/\s+/g, " ").split(" ").join("+");
  
  //Можно не указывать в запросе категорию, если хотим книги из всех категорий
  let categoryString = "";
  if (category !== "All") {
    categoryString = "+subject:" + category.toLowerCase();
  }
  
  const apiOrderString = "&orderBy=" + LOCAL_ORDER_NAMES_TO_API_MAP[order];


  return fetch(`${endpoint}?q=${normalizedQuery}${categoryString}${apiOrderString}&key=${apiKey}`);
}