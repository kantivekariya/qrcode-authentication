import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import RootRoutes from "./routes";
import { persistStoreData, store } from "./reduce/store";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistStoreData}>
        <Provider store={store}>
          <RootRoutes />
        </Provider>
      </PersistGate>
    </BrowserRouter>
  );
}

export default App;
