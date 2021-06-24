import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

const LinkTab = (props) => {
  return <Tab component={Link} {...props} />;
};

export const Navigation = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Tabs
      variant="fullWidth"
      value={value}
      onChange={handleChange}
      aria-label="nav tabs example"
    >
      <LinkTab label="Home" to="/" />
      <LinkTab label="Kalender" to="/calendar" />
    </Tabs>
  );
};
