import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core/";
import React from "react";

const TabPannel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpannel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-lebelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPannel;
