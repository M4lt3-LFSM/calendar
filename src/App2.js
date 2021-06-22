import { useState } from "react";
import "./App.css";

export const App = () => {
  const [month, setMonth] = useState(0);
  const [virtStorage, setVirtStorage] = useState({ ...window.localStorage });
  const arr = new Array(new Date(2021, month + 1, 0).getDate()).fill("");
  return (
    <div className="App ">
      <div>
        <h1>Kalender</h1>
        <label>Choose a month:</label>
        <p id="Dropdown">
          <select
            onChange={(e) => {
              setMonth(parseInt(e.target.value));
            }}
            value={month}
            name="month"
            id="month-select"
          >
            <option value={0}>Januar</option>
            <option value={1}>Februar</option>
            <option value={2}>März</option>
            <option value={3}>April</option>
            <option value={4}>Mai</option>
            <option value={5}>Juni</option>
            <option value={6}>Juli</option>
            <option value={7}>August</option>
            <option value={8}>September</option>
            <option value={9}>Oktober</option>
            <option value={10}>November</option>
            <option value={11}>Dezember</option>
          </select>
        </p>
        <div
          style={{
            margin: "auto",
            display: "flex",
            justifyItems: "center",
            flexWrap: "wrap",
            width: "950px",
          }}
        >
          {arr.map((_, i) => {
            const date = new Date(2021, month, i + 1);

            return (
              <div
                onClick={() => {
                  if (virtStorage[date.toLocaleDateString()]) {
                    setVirtStorage({
                      ...virtStorage,
                      [date.toLocaleDateString()]: "",
                    });
                    window.localStorage.setItem(date.toLocaleDateString(), "");
                  } else {
                    setVirtStorage({
                      ...virtStorage,
                      [date.toLocaleDateString()]: "Zahnarzt um 16:00",
                    });
                    window.localStorage.setItem(
                      date.toLocaleDateString(),
                      "Zahnarzt um 16:00"
                    );
                  }
                }}
                className="Calendar-Item"
                key={i}
              >
                {date.toLocaleDateString()}
                <br></br>
                {virtStorage[date.toLocaleDateString()]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
