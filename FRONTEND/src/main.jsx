import React from "react";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import App from "./App";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Stores/Store";
import Routes from "../Routes/Routes";

// if (window.__REDUX_DEVTOOLS_EXTENSION__)
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__.disconnect();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <Provider store={Store}>
      <RouterProvider router={Routes}>
        <App />
      </RouterProvider>
    </Provider>
  </React.Fragment>
);
