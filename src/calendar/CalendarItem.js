import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllEventsByDate } from "..";

export const CalendarItem = ({ unix, dialogOpen, setDialogOpen }) => {
  const eventDataArr = useSelector(getAllEventsByDate(unix));
  const dispatch = useDispatch();
  const handleCalenderItemClick = () => {
    dispatch({
      type: "CHANGE_CURRENT_DATE",
      payload: { unix },
    });
  };
  const handleDeleteEvent = (e, eventData) => {
    e.stopPropagation();
    dispatch({
      type: "DELETE_CALENDAR_DATA",
      payload: { id: eventData.id },
    });
  };
  return (
    <div onClick={handleCalenderItemClick} className="Calendar-Item">
      {new Date(unix).toLocaleDateString()}
      {eventDataArr
        .sort((a, b) => {
          return a.id - b.id;
        })
        .map((eventData, index) => (
          <p key={index}>
            {eventData.text}{" "}
            {new Date(eventData.id)
              .toLocaleTimeString()
              .replace(/:\d\d$/, " Uhr")}
            <IconButton
              onClick={(e) => handleDeleteEvent(e, eventData)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </p>
        ))}
    </div>
  );
};
