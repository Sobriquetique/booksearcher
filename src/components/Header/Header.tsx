import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { CategoryName } from "src/types/Category";
import { OrderByName } from "src/types/OrderByName";
import { CATEGORY_OPTIONS, ORDER_OPTIONS } from "src/_CONSTANTS/searchOptions";
import { SelectInput } from "../SelectInput";
import { TextInput } from "../TextInput";

import STYLES from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { fetchFreshBookPreviews } from "src/features/bookPreviews/fetchFreshBookPreviews";
import { smoothNavigate } from "src/features/navigation/smoothNavigate";
import { useNavigation } from "src/features/navigation/navigationSlice";

export const Header: FunctionComponent = () => {

  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<CategoryName>("All");
  const [orderBy, setOrderBy] = useState<OrderByName>("Relevant");

  const { currentPage } = useNavigation();

  const dispatch = useDispatch();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const doSearch = () => {
    dispatch(fetchFreshBookPreviews({
      query: searchValue,
      category,
      order: orderBy
    }));
    if (currentPage !== "previews") {
      dispatch(smoothNavigate("previews"));
    }
  };

  return (
    <div className={STYLES.container}>
      <form className={STYLES.searchBlock}>

        <TextInput 
          onChange={onChange}
          onButtonClick={doSearch}
          value={searchValue}
        ></TextInput>
        <div className={STYLES.selects}>
          <SelectInput 
            options={CATEGORY_OPTIONS}
            labelText="Categories"
            value={category}
            setValue={(value: CategoryName) => {
              setCategory(value);
            }}
          />

          <SelectInput 
            options={ORDER_OPTIONS}
            labelText="Order by"
            value={orderBy}
            setValue={(value: OrderByName) => {
              setOrderBy(value);
            }}
          />
        </div>
      </form>
    </div>
  );
};