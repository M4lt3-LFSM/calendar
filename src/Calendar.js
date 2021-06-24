import { useState } from "react";
import "./Calendar.css";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "@material-ui/lab/DatePicker";

export const Calendar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [monthAndYear, setMonthAndYear] = useState(new Date());

  const arr = new Array(
    new Date(2021, monthAndYear.getMonth() + 1, 0).getDate()
  ).fill("");
  return (
    <div className="App ">
      <div>
        <h1>Kalender</h1>
        <DatePicker
          views={["year", "month"]}
          label="Jahr und Monat"
          minDate={new Date("2012-03-01")}
          maxDate={new Date("2023-12-31")}
          value={monthAndYear}
          onChange={(date) => {
            setMonthAndYear(date);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <div className="Grid">
          {arr.map((_, i) => {
            const date = new Date(2021, monthAndYear.getMonth(), i + 1);
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
    handleClose();
  };
  const handleClose = () => {
    dispatch({
      type: "CHANGE_CURRENT_DATE",
      payload: { date: null },
    });
  };
  return (
    <Dialog fullWidth onClose={handleClose} open={currentDate !== null}>
      <DialogTitle style={{ textAlign: "center" }}>
        Termin für den {currentDate?.toLocaleDateString()}
      </DialogTitle>
      <div style={{ margin: 20 }}>
        <TextField
          style={{ width: "100%" }}
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBtnClick();
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
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
