import { useDispatch } from "react-redux";
import { useBookPreviews } from "src/features/bookPreviews/bookPreviewsSlice";
import { fetchLoadMoreBooks } from "src/features/bookPreviews/fetchLoadMoreBooks";
import { BookPreview } from "src/types/BookPreview";
import { AsyncButton } from "../AsyncButton";
import { BookPreviewComponent } from "../BookPreviewComponent";

import STYLES from "./PreviewsScreen.module.scss";

export const PreviewsScreen = () => {
  const dispatch = useDispatch();
  const { status, error, maxResults,
    items: {
      foundCount,
      list,
      currentCategory,
      currentOrder,
      currentQuery
    }
  } = useBookPreviews();

  const loadMore = () => {
    dispatch(fetchLoadMoreBooks({
      "category": currentCategory,
      "order": currentOrder,
      "query": currentQuery,
      "startIndex": list.length,
      "maxResults": maxResults
    }));
  }

  const renderLoadMoreButton = (): JSX.Element | undefined => {
    if (list.length === 0 || list.length === foundCount) {
      return;
    }

    return (
      <AsyncButton 
        isLoading={status === "loading"}
        error={!!error}
        className={STYLES.loadMoreButton}
        iconClass={{
          loading: "icon-arrows-cw spin",
          idle: "icon-down-open"
        }}
        text={{
          idle: "Load more",
          loading: "Loading...",
          error: "Try again?"
        }}
        onClick={loadMore}
      />
    )
  }

  return (
    <div className={STYLES.container}>
      <h3 className={STYLES.foundInfo}>{`Found ${foundCount} books`}</h3>
      <div className={STYLES.previews}>
        {
          list.map((bookPreviewData: BookPreview, i: number) => {
            return (
              <BookPreviewComponent 
                key={i}
                bookPreviewData={bookPreviewData}
              />
            ); 
          })
        }     
      </div>
      {
        renderLoadMoreButton()
      }
    </div>
  )
}