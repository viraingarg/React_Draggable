import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import Login from "./Login";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Route exact path="/" component={Login} />
    <Route path="/Home" component={App} />
  </Router>,
  document.getElementById("root")
);
