import { useNavigation } from "src/features/navigation/navigationSlice"
import { Book } from "src/pages/Book";
import { IndexPage } from "src/pages/IndexPage"
import STYLES from "./Content.module.scss";

/** Динамический контент между хедером и футером */
export const Content = () => {
  const { status, currentPage } = useNavigation();
  
  let hiddenClassName = status === "FADE" || status === "REVEAL" ? " " + STYLES.hidden : "";

  return (
    <div className={`${STYLES.container}${hiddenClassName}`}>
      {(() => {
        switch (currentPage) {
          case "previews": {
            return <IndexPage />
          }

          case "book": {
            return <Book />
          }

          default: {
            return (
              <div className={STYLES.noPage}>
                Oops! You aren't supposed to see this, something had gone terribly wrong. Try refreshing the page.
              </div>
            )
          }
        }
      })()}
    </div>
  )
}