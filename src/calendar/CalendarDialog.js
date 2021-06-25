import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import StaticTimePicker from "@material-ui/lab/StaticTimePicker";

export const CalendarDialog = ({ setDialogOpen, dialogOpen }) => {
  const [text, setText] = useState("");
  const currentUnix = useSelector((state) => state.currentUnix);
  const currentDate = new Date(currentUnix);
  const [currentTime, setCurrentTime] = useState(currentDate);
  const dispatch = useDispatch();
  const handleBtnClick = () => {
    if (text === "") return;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes()
    );
    dispatch({
      type: "UPDATE_CALENDAR_DATA",
      payload: {
        id: date.getTime(),
        date,
        text,
      },
    });

    handleClose();
  };
  const handleClose = () => {
    dispatch({
      type: "CHANGE_CURRENT_DATE",
      payload: { unix: null },
    });
    setText("");
    setCurrentTime(new Date());
  };
  return (
    <Dialog fullWidth onClose={handleClose} open={currentUnix !== null}>
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
      <StaticTimePicker
        displayStaticWrapperAs="mobile"
        ampm={false}
        value={currentTime}
        onChange={(time) => {
          setCurrentTime(time);
        }}
        renderInput={(params) => <TextField {...params} />}
      />

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
