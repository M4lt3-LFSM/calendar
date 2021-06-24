import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export const CalendarItem = ({ date, dialogOpen, setDialogOpen }) => {
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
      }}
      className="Calendar-Item"
    >
      {date.toLocaleDateString()}
      {textArr.map((text, index) => (
        <>
          <p key={index}>
            {text}{" "}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: "DELETE_CALENDAR_DATA",
                  payload: { id: date.toLocaleDateString(), text },
                });
              }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </p>
        </>
      ))}
    </div>
  );
};
