import { useBookPreviews } from "src/features/bookPreviews/bookPreviewsSlice";
import { BookPreview } from "src/types/BookPreview";
import { BookPreviewComponent } from "../BookPreviewComponent/BookPreviewComponent";
import STYLES from "./Content.module.scss";

export const Content = () => {
  const { status, error, 
    items: {
      foundCount,
      list
    }
  } = useBookPreviews();

  return (
    <div className={STYLES.container}>
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
  )
}