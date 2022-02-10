import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./components/Root";
import store from './store'
import { Provider } from "react-redux"
// import history from './history'

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <Root />
    </Router>
  </Provider>,
  document.getElementById("main")
);
