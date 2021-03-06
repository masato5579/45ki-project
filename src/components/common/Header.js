import React from "react";

//material-ui ボトムナビゲーションをインポート
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import firebase from "../../Firebase/firebase";

//material-ui iconをインポート
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    firebase.auth().signOut();
  };
  const handleClosePlofile = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <ul>
        <li>45期卒業APP</li>
        <li>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AccountCircleIcon fontSize="large" />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClosePlofile}>
              <Link to="/UpLoad">ProfileEdit</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </li>
      </ul>
    </header>
  );
}
