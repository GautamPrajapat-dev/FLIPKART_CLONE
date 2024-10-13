import React from "react";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import Store from "./Stores/Store";
import OfflineStatus from "./Components/Offline-Status";
import App from "./App";
// if (window.__REDUX_DEVTOOLS_EXTENSION__)
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__.disconnect();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    {/* {!window.navigator.onLine && <OfflineStatus />} */}
    <Provider store={Store}>
      <App />
    </Provider>
  </React.Fragment>
);
