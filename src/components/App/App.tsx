import { Header } from "src/components/Header";
import { Footer } from "src/components/Footer";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { Content } from "../Content";


export const App = (): JSX.Element => {

  return (
    <Provider store={store}>
      <div className="appContainer">
        <Header />
        <main>
          <Content />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};