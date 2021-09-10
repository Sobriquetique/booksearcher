import { useDispatch } from "react-redux";
import { useCurrentBook } from "src/features/currentBook/currentBookSlice";
import { smoothNavigate } from "src/features/navigation/smoothNavigate";
import { BookFull } from "src/types/BookFull";
import { reduceWithCommas } from "src/utils/reduceString";
import STYLES from "./Book.module.scss";

const renderBook = (book: BookFull): JSX.Element => {
  const { authors, categories, imgSrc, title, 
    description = "Empty description",
    mainCategory
  } = book;
  
  const authorsString = authors.length === 0 ? "Author unknown" : reduceWithCommas(authors);
  
  let resultCategories = mainCategory ? [mainCategory, ...categories] : [...categories];
  if (resultCategories.length === 0) {
    resultCategories.push("No category");
  }

  const alt = authorsString + " - " + title;
  return (
    <article className={STYLES.bookContainer}>
      <figure className={STYLES.imgFit}>
        <img
          src={imgSrc}
          alt={alt}
        />
      </figure>
      <div className={STYLES.body}>
        <div className={STYLES.categories}>
          {
            resultCategories.map((cat: string, i: number) => (
              <div key={i}>{cat}</div>
            ))
          }
        </div>
        <h3 className={STYLES.title}>
          {title}
        </h3>
        <span className={STYLES.authors}>
          {authorsString}
        </span>
        <div className={STYLES.description}>
          {description}
        </div>
      </div>
    </article>
    
  )
}

export const Book = () => {
  const { currentBook, error, status } = useCurrentBook();
  const dispatch = useDispatch(); 

  const finalRender = (): JSX.Element => {
    if (status === "loading") {
      return (
        <div className={STYLES.loading}>
          <i className={"icon-arrows-cw spin"} style={{display: "block"}}/>
          <span>Loading...</span>
        </div>
      )
    }
    
    if (error) {
      return (
        <div className={STYLES.error}>
          <span>{`Couldn't load the book`}</span>
          <span>{`Reason: ${error}`}</span>
        </div>
      )
    }

    if (!currentBook) {
      return (
        <div className={STYLES.error}>
          <span>Something has gone terribly wrong, current book was null.</span>
        </div>
      )
    }

    return renderBook(currentBook);
  }

  return (
    <div className={STYLES.container}>
      <button 
        className={STYLES.goBackNav}
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          dispatch(smoothNavigate("previews"));
        }}
      >
        <i className="icon-history" />
        <span>Go back</span>
      </button>

      {finalRender()};

    </div>
  )
};