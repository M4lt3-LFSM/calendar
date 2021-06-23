import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App2";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

const store = createStore(
  combineReducers({
    eventsByDate: (state = {}, action) => {
      switch (action.type) {
        case "UPDATE_CALENDAR_DATA":
          return { ...state, [action.payload.id]: action.payload };
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
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
