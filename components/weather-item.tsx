import { Cloud, ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
type WeatherItemProps = {
  day: any;
  index: number;
};

export default function WeatherItem(props: WeatherItemProps) {
  const { day, index } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const classes = useStyles();

  return (
    <>
      <List component="div" disablePadding className={classes.row}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Cloud />
          </ListItemIcon>
          <ListItemText>Day {index + 1}</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>Temperature: {day.main.temp}</Typography>
              <Typography>Humidity:{day.main.humidity}</Typography>{" "}
              <Typography>Temperature Max:{day.main.temp_max}</Typography>{" "}
              <Typography>Temperature Min:{day.main.temp_min}</Typography>
              <Typography>Pressure:{day.main.pressure}</Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
