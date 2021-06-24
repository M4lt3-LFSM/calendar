import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";

export const CalendarDialog = ({ setDialogOpen, dialogOpen }) => {
  const [text, setText] = useState("");
  const currentDate = useSelector((state) => state.currentDate);
  const dispatch = useDispatch();
  const handleBtnClick = () => {
    if (text === "") return;
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
