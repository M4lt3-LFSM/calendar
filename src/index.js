import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Calendar } from "./Calendar";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createTheme({
  // components: {
  //   MuiPaper: { styleOverrides: { root: { backgroundColor: "#34495e" } } },
  //   MuiButton: { styleOverrides: { root: { backgroundColor: "#34495e" } } },
  // },

  palette: {
    text: { primary: "#00f7ff", disabled: "#00f7ff", secondary: "#00f7ff" },
    // common: { white: "#00f7ff" },
    // background: { default: "#34495e" },
    // primary: {
    //   main: "#00f7ff",
    // },
    // secondary: {
    //   main: green[500],
    // },
    // divider: "#00f7ff",
    // info: {
    //   main: "#00f7ff",
    // },
    mode: "dark",
  },
});

const store = createStore(
  combineReducers({
    eventsByDate: (state = {}, action) => {
      switch (action.type) {
        case "UPDATE_CALENDAR_DATA":
          return {
            ...state,
            [action.payload.id]: {
              ...action.payload,
              text: [
                ...(state[action.payload.id]?.text ?? []),
                action.payload.text,
              ],
            },
          };
        default:
          return state;
      }
    },
    currentDate: (state = null, action) => {
      switch (action.type) {
        case "CHANGE_CURRENT_DATE":
          return action.payload.date;
        default:
          return state;
      }
    },
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <Router>
          <nav>
            <ul>
              <li>
                <Link style={{ color: "inherit" }} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link style={{ color: "inherit" }} to="/calendar">
                  Zum Kalender
                </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/calendar">
              <Calendar />
            </Route>
            <Route path="/">Home</Route>
          </Switch>
        </Router>
      </Provider>
    </LocalizationProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
