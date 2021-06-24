import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Calendar } from "./calendar/Calendar";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import { Navigation } from "./Navigation";

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

const initialEventsByDate =
  JSON.parse(window.localStorage.getItem("eventsByDate")) || {};

const store = createStore(
  combineReducers({
    eventsByDate: (state = initialEventsByDate, action) => {
      switch (action.type) {
        case "UPDATE_CALENDAR_DATA":
          if (state[action.payload.id]?.text.includes(action.payload.text))
            return state;
          const updatedState = {
            ...state,
            [action.payload.id]: {
              ...action.payload,
              text: [
                ...(state[action.payload.id]?.text ?? []),
                action.payload.text,
              ],
            },
          };
          window.localStorage.setItem(
            "eventsByDate",
            JSON.stringify(updatedState)
          );
          return updatedState;
        case "DELETE_CALENDAR_DATA":
          const deletedState = { ...state };
          deletedState[action.payload.id].text = deletedState[
            action.payload.id
          ].text.filter((x) => x !== action.payload.text);
          window.localStorage.setItem(
            "eventsByDate",
            JSON.stringify(deletedState)
          );
          return deletedState;
        default:
          return state;
      }
    },
    selectedDate: (state = new Date(), action) => {
      switch (action.type) {
        case "CHANGE_SELECTED_DATE":
          return action.payload.date;
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
          <Navigation></Navigation>
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
