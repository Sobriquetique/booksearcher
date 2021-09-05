import useIsMobileWidth from "src/utils/useIsMobileWidth";
import { ResizeProvider } from "src/store/ResizeContext";
import { Header } from "src/components/Header";
import { Footer } from "src/components/Footer";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { Content } from "../Content";


export const App = (): JSX.Element => {
  const isMobileWidth = useIsMobileWidth();

  return (
    <ResizeProvider isMobile={isMobileWidth}>
      <Provider store={store}>
        <div className="appContainer">
          <Header />
          <main>
            <Content />
          </main>
          <Footer />
        </div>
      </Provider>
    </ResizeProvider>
  );
};