import React from "react";
import { createRoot } from "react-dom/client";
import App from "App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo";
import { store } from "redux/store";
import "./index.scss";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <App tab="home" />
        </Router>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
