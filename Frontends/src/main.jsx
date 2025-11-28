import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.jsx";
import { Provider } from "react-redux";
import { persistor } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store} >
  <PersistGate persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
  </Provider>
);
