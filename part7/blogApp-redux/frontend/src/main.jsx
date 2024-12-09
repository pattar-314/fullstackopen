import ReactDOM from "react-dom/client";
// import store from './services/store'
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./reducers/blogReducer";
import notificationSlice from "./reducers/notificationReducer";
import userSlice from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blogs: blogSlice,
    notification: notificationSlice,
    user: userSlice,
  },
});

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
