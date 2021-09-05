import { FunctionComponent } from "react";
import { BookPreview } from "src/types/BookPreview";
import STYLES from "./BookPreviewComponent.module.scss";

interface Props_BookPreviewComponent {
  bookPreviewData: BookPreview;
  children?: never;
}

export const BookPreviewComponent: FunctionComponent<Props_BookPreviewComponent> = ({bookPreviewData}: Props_BookPreviewComponent) => {
  const {id, authors, title, imgSrc, category} = bookPreviewData;

  const authorsCombined = authors.reduce<string>((result: string, nextAuthor: string, i: number) => {
    const commaExceptAfterLast = i === authors.length - 1 ? "" : ", ";
    return result + nextAuthor + commaExceptAfterLast;
  }, "" as string);
  const alt = authorsCombined + " - " + title;
  
  return (
    <div className={STYLES.container}>
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