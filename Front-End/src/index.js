import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo";
import { store } from "redux/store";
import "./index.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Suspense fallback={<span>FallBack Text</span>}>
            <Router>
              <App />
            </Router>
          </Suspense>
        </MuiPickersUtilsProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
