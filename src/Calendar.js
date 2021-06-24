import { useState } from "react";
import "./Calendar.css";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";

export const Calendar = () => {
  const [month, setMonth] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const arr = new Array(new Date(2021, month + 1, 0).getDate()).fill("");
  return (
    <div className="App ">
      <div>
        <h1>Kalender</h1>
        <label>Wähle einen Monat:</label>
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
        <div className="Grid">
          {arr.map((_, i) => {
            const date = new Date(2021, month, i + 1);
            return (
              <CalendarItem
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                key={i}
                date={date}
              ></CalendarItem>
            );
          })}
        </div>
      </div>
      <CalendarDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      ></CalendarDialog>
    </div>
  );
};

const CalendarDialog = ({ setDialogOpen, dialogOpen }) => {
  const [text, setText] = useState("");
  const currentDate = useSelector((state) => state.currentDate);
  const dispatch = useDispatch();
  const handleBtnClick = () => {
    dispatch({
      type: "UPDATE_CALENDAR_DATA",
      payload: {
        id: currentDate.toLocaleDateString(),
        date: currentDate,
        text: text,
      },
    });
    setText("");
  };
  return (
    <Dialog
      onClose={() => {
        dispatch({
          type: "CHANGE_CURRENT_DATE",
          payload: { date: null },
        });
      }}
      open={currentDate !== null}
    >
      <DialogTitle style={{ textAlign: "center" }}>
        Termin für den {currentDate?.toLocaleDateString()}
      </DialogTitle>
      <div style={{ margin: 100 }}>
        <TextField
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          multiline
          label="Termin"
        />
      </div>
      <Button
        onClick={handleBtnClick}
        variant="contained"
        color="secondary"
        style={{ margin: 15 }}
      >
        Speichern
      </Button>
    </Dialog>
  );
};

const CalendarItem = ({ date, dialogOpen, setDialogOpen }) => {
  // const [virtKey, setVirtKey] = useState(
  //   window.localStorage.getItem(date.toLocaleDateString()) || null
  // );
  const textArr = useSelector(
    (state) => state.eventsByDate[date.toLocaleDateString()]?.text ?? []
  );
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch({
          type: "CHANGE_CURRENT_DATE",
          payload: { date },
        });
        // if (virtKey !== null) {
        //   setVirtKey(null);
        //   window.localStorage.removeItem(date.toLocaleDateString());
        // } else {
        //   setDialogOpen(true);
        //   // setVirtKey("Zahnarzt um 16:00");
        //   // window.localStorage.setItem(
        //   //   date.toLocaleDateString(),
        //   //   "Zahnarzt um 16:00"
        //   // );
        // }
      }}
      className="Calendar-Item"
    >
      {date.toLocaleDateString()}
      {textArr.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
};
