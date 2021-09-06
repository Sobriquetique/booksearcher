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
        className={{
          "idle": STYLES.loadMoreButton,
          "error": `${STYLES.loadMoreButton} ${STYLES.error}`,
          "loading": `${STYLES.loadMoreButton} ${STYLES.loading}`,
          "success": `${STYLES.loadMoreButton} ${STYLES.success}`,
        }}
        iconClass={{
          idle: "icon-down-open",
          error: "icon-cw",
          loading: "icon-arrows-cw spin",
          success: "icon-ok"
        }}
        text={{
          idle: "Load more",
          error: "Try again?",
          loading: "Loading...",
          success: "Loaded"
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