import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import "./styles/main.scss";
import "./styles/fonts/fontello.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);