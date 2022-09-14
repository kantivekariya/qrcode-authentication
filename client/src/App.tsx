import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RootRoutes from "./routes";
import { Provider } from "react-redux";
import { store } from "./reduce/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <RootRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
