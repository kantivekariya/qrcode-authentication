import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ReactGA4 from "react-ga4";
import { ToastContainer } from "react-toastify";

import RootRoutes from "./routes";
import { persistStoreData, store } from "./reduce/store";
import "./App.css";
import { onLocalLogin } from "./reduce/action/auth/AuthAction";

store.dispatch(onLocalLogin());
ReactGA4.send({ hitType: "pageview", page: window.location.pathname });
function App() {
  return (
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistStoreData}>
        <Provider store={store}>
          <RootRoutes />
        </Provider>
        <ToastContainer />
      </PersistGate>
    </BrowserRouter>
  );
}

export default App;
