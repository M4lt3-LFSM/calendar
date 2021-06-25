import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { useSelector } from "react-redux";

export const Home = () => {
  const eventsByDate = useSelector((state) => state.eventsByDate);
  console.log(Object.values(eventsByDate));
  const currentUnix = new Date().getTime();
  return (
    <div style={{ marginTop: "20px", marginLeft: "20%", marginRight: "20%" }}>
      {Object.values(eventsByDate).length > 0 ? (
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Object.values(eventsByDate)
            .filter((item) => {
              return item.id > currentUnix;
            })
            .sort((a, b) => {
              return a.id - b.id;
            })
            .map((item, index) => {
              //   return <div key={index}>{item.text}</div>;
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.text}
                    secondary={new Date(item.id).toLocaleString()}
                  />
                </ListItem>
              );
            })}
        </List>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Keine Termine!</h1>
        </div>
      )}
    </div>
  );
};
