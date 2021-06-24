import { useState } from "react";
import "./Calendar.css";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "@material-ui/lab/DatePicker";
import { CalendarItem } from "./CalendarItem";
import { CalendarDialog } from "./CalendarDialog";
import IconButton from "@material-ui/core/IconButton";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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
        <IconButton
          onClick={() => {
            handleChangeDatePicker(
              new Date(
                selectedDate.getFullYear() - 1,
                selectedDate.getMonth(),
                1
              )
            );
          }}
          style={{ transform: "rotateZ(180deg)" }}
          size="large"
        >
          <DoubleArrowIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            handleChangeDatePicker(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() - 1,
                1
              )
            );
          }}
          size="large"
        >
          <ChevronLeftIcon />
        </IconButton>
        <DatePicker
          views={["year", "month"]}
          label="Jahr und Monat"
          minDate={new Date("2012-01-01")}
          maxDate={new Date("2023-12-31")}
          value={selectedDate}
          onChange={handleChangeDatePicker}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <IconButton
          onClick={() => {
            handleChangeDatePicker(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                1
              )
            );
          }}
          size="large"
        >
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            handleChangeDatePicker(
              new Date(
                selectedDate.getFullYear() + 1,
                selectedDate.getMonth(),
                1
              )
            );
          }}
          size="large"
        >
          <DoubleArrowIcon />
        </IconButton>
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
