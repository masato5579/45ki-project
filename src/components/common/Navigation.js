import React from "react";

//material-ui ボトムナビゲーションをインポート
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

//material-ui iconをインポート
import ChatIcon from "@material-ui/icons/Chat";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Chat"
        icon={<ChatIcon />}
        component={Link}
        to="/Chat"
      />
      <BottomNavigationAction label="Todo" icon={<FormatListBulletedIcon />} />
      <BottomNavigationAction label="Album" icon={<ImportContactsIcon />} />
      <BottomNavigationAction label="Recommend" icon={<ThumbUpAltIcon />} />
    </BottomNavigation>
  );
}
