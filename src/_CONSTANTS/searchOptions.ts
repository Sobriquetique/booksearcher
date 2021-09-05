import { SelectOption } from "src/components/SelectInput";
import { CategoryName } from "src/types/Category";
import { APIOrderByName, OrderByName } from "src/types/OrderByName";

//const CATEGORY_NAMES: CategoryName[] = ["All", "Art", "Biography", "Computers", "History", "Medical", "Poetry"];
export const CATEGORY_OPTIONS: SelectOption<CategoryName>[] = [
  {
    value: "All", iconClass: "icon-th"
  },
  {
    value: "Art", iconClass: "icon-brush"
  },
  {
    value: "Biography", iconClass: "icon-adult"
  },
  {
    value: "Computers", iconClass: "icon-desktop"
  },
  {
    value: "History", iconClass: "icon-history"
  },
  {
    value: "Medical", iconClass: "icon-medkit"
  },
  {
    value: "Poetry", iconClass: "icon-feather"
  }
];

export const ORDER_OPTIONS: SelectOption<OrderByName>[] = [
  {
    value: "Relevant", iconClass: "icon-ok-squared"
  },
  {
    value: "New", iconClass: "icon-clock"
  }
];

export const LOCAL_ORDER_NAMES_TO_API_MAP: Record<OrderByName, APIOrderByName> = {
  "New": "newest",
  "Relevant": "relevance"
}