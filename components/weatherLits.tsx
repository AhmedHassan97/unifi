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
import WeatherItem from "./weather-item";

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
type WeatherListProps = {
  weather: Array<{}>;
};

export default function WeatherList(props: WeatherListProps) {
  const { weather } = props;

  const classes = useStyles();

  return (
    <Box>
      <List
        sx={{ width: "40%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Weather:
          </ListSubheader>
        }
      >
        {weather.map((day, index) => (
          <div key={JSON.stringify(day)}>
            <WeatherItem day={day} index={index} />
          </div>
        ))}
      </List>
    </Box>
  );
}
