import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useCurrentBook } from "src/features/currentBook/currentBookSlice";
import { fetchBookOrGetCached } from "src/features/currentBook/fetchBookOrGetCached";
import { smoothNavigate } from "src/features/navigation/smoothNavigate";
import { BookPreview } from "src/types/BookPreview";
import STYLES from "./BookPreviewComponent.module.scss";

interface Props_BookPreviewComponent {
  bookPreviewData: BookPreview;
  children?: never;
}

export const BookPreviewComponent: FunctionComponent<Props_BookPreviewComponent> = ({bookPreviewData}: Props_BookPreviewComponent) => {
  const {id, authors, title, imgSrc, category} = bookPreviewData;
  const { cachedBooks } = useCurrentBook();

  const authorsCombined = authors.reduce<string>((result: string, nextAuthor: string, i: number) => {
    const commaExceptAfterLast = i === authors.length - 1 ? "" : ", ";
    return result + nextAuthor + commaExceptAfterLast;
  }, "" as string);
  const alt = authorsCombined + " - " + title;

  const dispatch = useDispatch();

  return (
    <div 
      className={STYLES.container}
      onClick={() => {
        dispatch(fetchBookOrGetCached({
          idToFetch: id,
          cachedBooks
        }));
        dispatch(smoothNavigate("book"));
      }}
    >
      <figure className={STYLES.imgFit}>
        <img
          alt={alt}
          src={imgSrc}
        />
      </figure>

      <div className={STYLES.body}>
        <span className={STYLES.category}>{category}</span>
        <h3 className={STYLES.title}>{title}</h3>
        <span className={STYLES.authors}>{authors}</span>
      </div>
    </div>
  )
}