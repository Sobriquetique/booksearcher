import { FunctionComponent } from "react";
import STYLES from "./Footer.module.scss";

const poweredByItems: {name: string, href: string}[] = [
  {
    name: "React",
    href: "https://reactjs.org/"
  },
  {
    name: "Redux Toolkit",
    href: "https://redux-toolkit.js.org/"
  },
  {
    name: "Typescript",
    href: "https://www.typescriptlang.org/"
  },
  {
    name: "Nginx",
    href: "https://nginx.org/ru/"
  },
  {
    name: "Docker",
    href: "https://www.docker.com/"
  },
  {
    name: "Fontello",
    href: "https://fontello.com/"
  }
]

export const Footer: FunctionComponent = () => {
  return (
    <div className={STYLES.container}>
      <div className={STYLES.author}>
        <h4>Денис Сагитов</h4>
        <a 
          className={STYLES.contact}
          href={"https://github.com/Sobriquetique"}
          target="_blank"
          rel="noreferrer"
        >GitHub</a>
      </div>

      <div className={STYLES.poweredBy}>
        <h4>Powered by</h4>
        {
          poweredByItems.map((item, i) => (
            <a 
              className={STYLES.poweredByItem}
              key={i}
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >{item.name}</a>
          ))
        }
      </div>
    </div>
  );
};