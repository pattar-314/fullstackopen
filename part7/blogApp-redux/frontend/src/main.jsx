import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router";
import App from "./App";
import store from "./services/store";
import { useEffect } from 'react';


const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {


  root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
};

renderApp();

store.subscribe(renderApp);
