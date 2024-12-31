import React from "react";
import ReactDOM from "react-dom/client"; // Use react-dom/client for React 18 and above
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store/store"; // Ensure correct path to your store file
import "./index.css";

// Create the root element for React 18 and above
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement // TypeScript type assertion to avoid null error
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
