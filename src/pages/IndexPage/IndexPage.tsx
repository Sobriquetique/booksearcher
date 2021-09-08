import { useDispatch } from "react-redux";
import { useBookPreviews } from "src/features/bookPreviews/bookPreviewsSlice";
import { fetchLoadMoreBooks } from "src/features/bookPreviews/fetchLoadMoreBooks";
import { BookPreview } from "src/types/BookPreview";
import { AsyncButton } from "src/components/AsyncButton";
import { BookPreviewComponent } from "src/components/BookPreviewComponent";

import STYLES from "./IndexPage.module.scss";

export const IndexPage = () => {
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

  const renderFoundInfo = (): JSX.Element => {
    
    if (status === "loading") {
      return <div className={STYLES.foundLoading}>
        <i className="icon-arrows-cw spin" />
        <span>Loading...</span>
      </div>
    }
    
    if (error) {
      return <h3 className={`${STYLES.foundInfo} ${STYLES.foundError}`}>
        {`Failed to fetch. Reason: ${error}`}
      </h3>
    }

    if (currentQuery === "") {
      return <h3 className={STYLES.foundInfo}>Waiting for you to search</h3>;
    }

    const foundString = `Found ${foundCount} books in category "${currentCategory}", ordered by: ${currentOrder}`;
    const queryString = currentQuery.length < 33 
      ? currentQuery
      : currentQuery.slice(0, 32).replace(/\s+$/, "") + "..."
    ;
    const showingString = `Showing ${list.length}`;
    return (
      <div className={STYLES.foundInfoContainer}>
        <h3 className={STYLES.foundInfo}>
          {foundString}
        </h3>
        <span className={STYLES.query}>{`On request: "${queryString}"`}</span>
        <span className={STYLES.showing}>{showingString}</span>
      </div>
    )
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
      {
        renderFoundInfo()
      }
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