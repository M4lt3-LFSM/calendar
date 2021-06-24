import { useState } from "react";
import "./Calendar.css";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "@material-ui/lab/DatePicker";
import { CalendarItem } from "./CalendarItem";
import { CalendarDialog } from "./CalendarDialog";

export const Calendar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.selectedDate);

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const arr = new Array(daysInMonth).fill("");
  const handleChangeDatePicker = (date) => {
    dispatch({
      type: "CHANGE_SELECTED_DATE",
      payload: { date },
    });
  };
  return (
    <div className="App ">
      <div>
        <h1>Kalender</h1>
        <DatePicker
          views={["year", "month"]}
          label="Jahr und Monat"
          minDate={new Date("2012-01-01")}
          maxDate={new Date("2023-12-31")}
          value={selectedDate}
          onChange={handleChangeDatePicker}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <div className="Grid">
          {arr.map((_, i) => {
            const date = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              i + 1
            );
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
