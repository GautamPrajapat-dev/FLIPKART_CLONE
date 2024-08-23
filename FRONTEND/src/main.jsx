import React from "react";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Stores/Store";
import Routes from "../Routes/Routes";
import OfflineStatus from "./Components/Offline-Status";

// if (window.__REDUX_DEVTOOLS_EXTENSION__)
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__.disconnect();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    {!window.navigator.onLine && <OfflineStatus />}
    <Provider store={Store}>
      <RouterProvider router={Routes} />
    </Provider>
  </React.Fragment>
);
