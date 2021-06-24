import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const CalendarItem = ({ date, dialogOpen, setDialogOpen }) => {
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
        <>
          <p key={index}>
            {text}{" "}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: "DELETE_CALENDAR_DATA",
                  payload: { id: date.toLocaleDateString(), text },
                });
              }}
            >
              X
            </button>
          </p>
        </>
      ))}
    </div>
  );
};
