import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import Header from "../common/Header";
import Nav from "../common/Navigation";
import ThePannel from "./TabPannel";
import WysiwygCustom from "./Wysiwyg/WysiwygCustom";

import styled from "styled-components";

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
  //クラスの適用
  const classes = useStyle();

  //タブの設定
  const a11yProps = (index) => {
    return {
      id: `sample-tab-${index}`,
      "aria-controls": `sample-tabpanel-${index}`,
    };
  };

  //input value
  const [value, setValue] = useState(0);

  //タブの切り替え
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Name
  const Name = ["araiPage", "maeharaPage", "sakadumePage"];

  return (
    <Container>
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
        <WysiwygCustom Name={Name[0]} />
      </ThePannel>
      <ThePannel value={value} index={1}>
        <WysiwygCustom Name={Name[1]} />
      </ThePannel>
      <ThePannel value={value} index={2}>
        <WysiwygCustom Name={Name[2]} />
      </ThePannel>
      <Nav />
    </Container>
  );
};

export default Recommend;

const Container = styled.div`
  background-image: url("https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_1280.jpg");
`;
