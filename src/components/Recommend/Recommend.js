import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import Header from "../common/Header";
import Nav from "../common/Navigation";
import ThePannel from "./TabPannel";
import PannelContent from "./PannelContent";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    paddingTop: "80px",
    background: "#eee",
    width: "100%",
  },
}));
const Recommend = () => {
  const classes = useStyle();

  const a11yProps = (index) => {
    return {
      id: `sample-tab-${index}`,
      "aria-controls": `sample-tabpanel-${index}`,
    };
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Header />
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.appbar}
          indicatorColor="primary"
          textColor="primary"
          aria-label="simple tabs example"
        >
          <Tab label="荒井さん" {...a11yProps(0)} />
          <Tab label="前原さん" {...a11yProps(1)} />
          <Tab label="坂爪さん" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <ThePannel value={value} index={0}>
        <PannelContent />
      </ThePannel>
      <ThePannel value={value} index={1}>
        <PannelContent />
      </ThePannel>
      <ThePannel value={value} index={2}>
        <PannelContent />
      </ThePannel>
      <Nav />
    </>
  );
};

export default Recommend;
